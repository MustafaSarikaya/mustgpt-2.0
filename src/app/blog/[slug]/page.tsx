'use client'

import { Box, Container, Stack, Title, Text } from '@mantine/core';
import { api } from '../../../trpc/react';
import { CallToActionSection } from '../../_components/CallToActionSection';
import Footer from '../../_components/Footer';
import { BlogCard } from '../../_components/BlogCard';
import { SimpleGrid } from '@mantine/core';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { data: post, isLoading } = api.blog.getPostBySlug.useQuery({ slug: params.slug });
  const { data: relatedPosts } = api.blog.getRelatedPosts.useQuery(
    { currentPostId: post?.id ?? '', limit: 2 },
    { enabled: !!post?.id }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        pt={'10dvh'} 
        pb={'5dvh'} 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${post.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        <Container size="lg" w={{ base: '90dvw', sm: '65dvw', md: '60dvw' }}>
          <Stack gap="md" align="center">
            <Title order={1} ta="center" ff="heading" c="white">
              {post.title}
            </Title>
            <Text c="gray.3">
              {new Date(post.publishedAt).toLocaleDateString()}
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Post Content */}
      <Container size="lg" w={{ base: '90dvw', sm: '65dvw', md: '60dvw' }} py="xl">
        <Box
          className="blog-content"
          style={{
            fontSize: '1.1rem',
            lineHeight: 1.7,
          }}
        >
          <style>
            {`
              .blog-content h1 { font-size: 2.5rem; margin: 2rem 0 1rem; }
              .blog-content h2 { font-size: 2rem; margin: 1.8rem 0 1rem; }
              .blog-content h3 { font-size: 1.5rem; margin: 1.5rem 0 1rem; }
              .blog-content p { margin: 1rem 0; }
              .blog-content ul, .blog-content ol { margin: 1rem 0; padding-left: 2rem; }
              .blog-content li { margin: 0.5rem 0; }
              .blog-content blockquote {
                border-left: 4px solid var(--mantine-color-primary-6);
                margin: 1.5rem 0;
                padding: 0.5rem 0 0.5rem 1.5rem;
                font-style: italic;
                background: var(--mantine-color-gray-0);
              }
              .blog-content pre {
                background: var(--mantine-color-dark-8);
                padding: 1rem;
                border-radius: 0.5rem;
                overflow-x: auto;
                margin: 1.5rem 0;
              }
              .blog-content code {
                font-family: monospace;
                background: var(--mantine-color-dark-8);
                padding: 0.2rem 0.4rem;
                border-radius: 0.25rem;
                font-size: 0.9em;
              }
              .blog-content pre code {
                background: none;
                padding: 0;
              }
              .blog-content img {
                max-width: 100%;
                height: auto;
                border-radius: 0.5rem;
                margin: 1.5rem 0;
              }
              .blog-content figure {
                margin: 2rem 0;
              }
              .blog-content figcaption {
                text-align: center;
                font-size: 0.9rem;
                color: var(--mantine-color-gray-6);
                margin-top: 0.5rem;
              }
              .blog-content hr {
                margin: 2rem 0;
                border: none;
                border-top: 1px solid var(--mantine-color-gray-3);
              }
            `}
          </style>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Box>
      </Container>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <Container size="lg" w={{ base: '90dvw', sm: '65dvw', md: '60dvw' }} py="xl">
          <Title order={2} ta="center" mb="xl" ff="heading">
            Related Posts
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {relatedPosts.map((relatedPost) => (
              <BlogCard
                key={relatedPost.id}
                article={{
                  id: relatedPost.id,
                  title: relatedPost.title,
                  category: relatedPost.tags[0]?.name ?? 'General',
                  image: relatedPost.coverImage,
                  date: new Date(relatedPost.publishedAt).toLocaleDateString(),


                  author: {
                    name: 'Mustafa Sarikaya',
                    avatar: '/profile-pic.jpeg'
                  }
                }}
              />
            ))}
          </SimpleGrid>
        </Container>
      )}

      {/* Call to Action and Footer */}
      <Box mt="10dvh">
        <CallToActionSection />
      </Box>
      <Footer />
    </Box>
  );
}
