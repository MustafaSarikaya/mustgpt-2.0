import { z } from "zod";
import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { createTRPCRouter, publicProcedure } from "@/src/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notionBlockToHtml } from "@/src/utils/notionToHtml";
import { slugify } from "@/src/utils/slugify";

type NotionPost = {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  tags: Array<{ name: string; color: string }>;
  publishedAt: string;
  url: string;
  slug: string;
};

const notion = new Client({
  auth: process.env.NOTION_API_KEY ?? '',
});

const databaseId = process.env.NOTION_DATABASE_ID ?? '';

export const blogRouter = createTRPCRouter({
  getPosts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(6),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { limit, cursor } = input;

      try {
        console.log('Querying Notion database with params:', { databaseId, limit, cursor });
        const response = await notion.databases.query({
          database_id: databaseId,
          page_size: limit,
          start_cursor: cursor ?? undefined,
          sorts: [
            {
              timestamp: "created_time",
              direction: "descending",
            },
          ],
        });
        console.log('Raw Notion API response:', JSON.stringify(response, null, 2));

        const items = await Promise.all(
          response.results.map(async (page) => {
            if (!('properties' in page)) {
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Invalid page object received from Notion",
              });
            }
            
            const typedPage = page as PageObjectResponse;

            // Extract cover image
            const coverImage = typedPage.cover?.type === 'external' 
              ? typedPage.cover.external.url
              : typedPage.cover?.type === 'file'
                ? typedPage.cover.file.url
                : '';

            // Extract title
            const title = typedPage.properties.Name?.type === 'title'
              ? typedPage.properties.Name.title[0]?.plain_text ?? 'Untitled'
              : 'Untitled';

            // Extract content
            const content = typedPage.properties['AI custom autofill']?.type === 'rich_text'
              ? typedPage.properties['AI custom autofill'].rich_text[0]?.plain_text ?? ''
              : '';

            // Extract tags
            const tags = typedPage.properties.Tags?.type === 'multi_select'
              ? typedPage.properties.Tags.multi_select.map(tag => ({
                  name: tag.name,
                  color: tag.color
                }))
              : [];

            // Extract published date
            const publishedAt = typedPage.properties.Published?.type === 'date'
              ? typedPage.properties.Published.date?.start ?? typedPage.created_time
              : typedPage.created_time;

            return {
              id: typedPage.id,
              title,
              content,
              coverImage,
              tags,
              publishedAt,
              url: typedPage.url,
              slug: slugify(title)
            } satisfies NotionPost;
          })
        );

        return {
          items,
          nextCursor: response.has_more ? response.next_cursor : undefined,
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch blog posts from Notion",
          cause: error,
        });
      }


    }),

  getPostBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        // First get all posts (we'll implement caching later)
        const response = await notion.databases.query({
          database_id: databaseId,
          page_size: 100, // Adjust based on your needs
        });

        // Find the post with matching slug
        const matchingPost = response.results.find(page => {
          if (!('properties' in page)) return false;
          const typedPage = page as PageObjectResponse;
          const title = typedPage.properties.Name?.type === 'title'
            ? typedPage.properties.Name.title[0]?.plain_text ?? 'Untitled'
            : 'Untitled';
          return slugify(title) === input.slug;
        });

        if (!matchingPost) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Blog post not found',
          });
        }

        const page = matchingPost as PageObjectResponse;
        
        if (!('properties' in page)) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Invalid page object received from Notion',
          });
        }

        // Extract page content using blocks API
        const blocks = await notion.blocks.children.list({
          block_id: page.id,
        });

        // Convert blocks to HTML using the utility function and handle lists
        const content = blocks.results
          .map(block => notionBlockToHtml(block as BlockObjectResponse))
          .join('\n')
          .replace(/(<li>.*?<\/li>\n)+/g, match => {
            // Check if the first list item is numbered
            return match.startsWith('<li>1.') || match.startsWith('<li>1 ')
              ? `<ol>${match}</ol>`
              : `<ul>${match}</ul>`;
          });

        const title = page.properties.Name?.type === 'title'
          ? page.properties.Name.title[0]?.plain_text ?? 'Untitled'
          : 'Untitled';

        const coverImage = page.cover?.type === 'external' 
          ? page.cover.external.url
          : page.cover?.type === 'file'
            ? page.cover.file.url
            : '';

        const tags = page.properties.Tags?.type === 'multi_select'
          ? page.properties.Tags.multi_select.map(tag => ({
              name: tag.name,
              color: tag.color
            }))
          : [];

        const publishedAt = page.properties.Published?.type === 'date'
          ? page.properties.Published.date?.start ?? page.created_time
          : page.created_time;

        return {
          id: page.id,
          title,
          content,
          coverImage,
          tags,
          publishedAt,
          url: page.url,
          slug: slugify(title)
        } satisfies NotionPost;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch blog post from Notion',
          cause: error,
        });
      }
    }),

  getRelatedPosts: publicProcedure
    .input(
      z.object({
        currentPostId: z.string(),
        limit: z.number().min(1).max(10).default(2),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await notion.databases.query({
          database_id: databaseId,
          page_size: input.limit + 1, // Fetch one extra to exclude current post
          filter: {
            and: [
              {
                property: 'ID',
                rich_text: {
                  does_not_equal: input.currentPostId
                }
              }
            ]
          },
          sorts: [
            {
              timestamp: 'created_time',
              direction: 'descending',
            },
          ],
        });

        const items = await Promise.all(
          response.results
            .filter(page => 'properties' in page)
            .slice(0, input.limit)
            .map(async (page) => {
              const typedPage = page as PageObjectResponse;
              
              const title = typedPage.properties.Name?.type === 'title'
                ? typedPage.properties.Name.title[0]?.plain_text ?? 'Untitled'
                : 'Untitled';

              const content = typedPage.properties['AI custom autofill']?.type === 'rich_text'
                ? typedPage.properties['AI custom autofill'].rich_text[0]?.plain_text ?? ''
                : '';

              const coverImage = typedPage.cover?.type === 'external' 
                ? typedPage.cover.external.url
                : typedPage.cover?.type === 'file'
                  ? typedPage.cover.file.url
                  : '';

              const tags = typedPage.properties.Tags?.type === 'multi_select'
                ? typedPage.properties.Tags.multi_select.map(tag => ({
                    name: tag.name,
                    color: tag.color
                  }))
                : [];

              const publishedAt = typedPage.properties.Published?.type === 'date'
                ? typedPage.properties.Published.date?.start ?? typedPage.created_time
                : typedPage.created_time;

              return {
                id: typedPage.id,
                title,
                content,
                coverImage,
                tags,
                publishedAt,
                url: typedPage.url,
                slug: slugify(title)
              } satisfies NotionPost;
            })
        );

        return items;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch related posts from Notion',
          cause: error,
        });
      }
    }),
});
