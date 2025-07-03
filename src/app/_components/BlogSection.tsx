'use client'

import { Box, Container, Space, SimpleGrid, Stack, Text, Title, Skeleton, Button } from '@mantine/core';
import { BlogCard } from './BlogCard';
import { api } from '@/trpc/react';

type BlogPost = {
  id: string | number;
  title: string;
  date: string;
  image: string;
  category: string;
  slug: string;
  author: {
    name: string;
    avatar: string;
  };
};


export function BlogSection() {
  const { data: blogPosts, isLoading, isFetching } = api.blog.getPosts.useQuery({ limit: 2 });
  const showSkeleton = isLoading || isFetching || !blogPosts;

  return (
    <Box pt={'10dvh'} pb={'15dvh'} bg="white">
      <Container size="lg" w={{ base: '90dvw', sm: '65dvw', md: '60dvw' }}>
        <Stack gap="xl" align='center'>
          <Title order={2} mt='xl' ta={'center'} ff="heading" >
            Products 📦  I work on and <br /> the things I find meaningful 🧠
          </Title>
          <Text ta={'center'} c={'accent'}>
            I try to keep a log of my projects, thoughts <br /> and involvements here
          </Text>
          <Space h='5dvh' />

          {/* Blog Posts Grid */}
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {showSkeleton ? (
              <>
                <Skeleton 
                    h={{ base: '50dvh', sm: '40dvh' }} 
                    w={{ base: '80dvw', sm: '25dvw' }} 
                    radius="lg" 
                  />
                <Skeleton 
                    h={{ base: '50dvh', sm: '40dvh' }} 
                    w={{ base: '80dvw', sm: '25dvw' }} 
                    radius="lg" 
                  />
              </>
            ) : (
              blogPosts?.items.map((post) => (
                <BlogCard
                  key={post.id}
                  article={{
                    id: post.id,
                    title: post.title,
                    date: new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }),
                    image: post.coverImage,
                    category: post.tags[0]?.name ?? 'Blog',
                    slug: post.slug,
                    author: {
                      name: 'Mustafa',
                      avatar: '/profile-pic.jpeg'
                    }
                  } satisfies BlogPost}
                />
              ))
            )}
          </SimpleGrid>
          <Space h="md" />
          <Button
            component="a"
            href="/blog"
            variant="filled"
            color="secondary"
            size="md"
            radius="md"
          >
            Explore More
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
