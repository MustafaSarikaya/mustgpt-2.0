'use client'

import { Box, Container, SimpleGrid, Stack, Text, Title, Button, Center, Skeleton } from '@mantine/core';
import { BlogCard, type BlogPost } from '../_components/BlogCard';

import { api } from '../../trpc/react';
import { CallToActionSection } from '../_components/CallToActionSection';
import Footer from '../_components/Footer';

export default function BlogPage() {
  const POSTS_PER_PAGE = 6;

  const { data: posts, isLoading, isFetching, fetchNextPage, hasNextPage } = 
    api.blog.getPosts.useInfiniteQuery(
      { limit: POSTS_PER_PAGE },
      { 
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined
      }
    );

  const showSkeleton = isLoading || isFetching || !posts;

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

  const allPosts = posts?.pages.flatMap((page: { items: NotionPost[] }) =>
    page.items.map(post => ({
      id: post.id,
      title: post.title,
      category: post.tags[0]?.name ?? 'General',
      image: post.coverImage,
      date: new Date(post.publishedAt).toLocaleDateString(),
      slug: post.slug,
      author: {
        name: 'Mustafa Sarikaya',
        avatar: '/profile-pic.jpeg'
      }
    } satisfies BlogPost))
  ) ?? [];

  return (
    <Box pt={'10dvh'} pb={'15dvh'} bg="white">
      <Container size="lg" w={{ base: '90dvw', sm: '65dvw', md: '60dvw' }}>
        <Stack gap="xl" align='center'>
          <Title order={2} mt='xl' ta={'center'} ff="heading">
            Blog Posts 📝
          </Title>
          <Text ta={'center'} c={'accent'}>
            Thoughts, tutorials, and tech insights
          </Text>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {showSkeleton ? (
              <>
                {Array(POSTS_PER_PAGE).fill(0).map((_, index) => (
                  <Skeleton 
                    key={index} 
                    h={{ base: '50dvh', sm: '40dvh' }} 
                    w={{ base: '80dvw', sm: '25dvw' }} 
                    radius="lg" 
                  />
                ))}
              </>
            ) : (
              allPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  article={post}
                />
              ))
            )}
          </SimpleGrid>

          {hasNextPage && (
            <Center mt="xl">
              <Button
                onClick={() => fetchNextPage()}
                loading={isLoading}
                variant="light"
                size="lg"
              >
                Load More
              </Button>
            </Center>
          )}
        </Stack>
      </Container>
      <Box mt="10dvh">
        <CallToActionSection />
      </Box>
      <Footer />
    </Box>
  );
}
