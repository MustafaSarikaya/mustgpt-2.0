'use client'


import { Stack, Text, Button, ScrollArea, Title, Box } from '@mantine/core';
import { api } from '@/trpc/react';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'motion/react';

export default function BlogNavbar() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const { data, fetchNextPage, hasNextPage, isFetching } = api.blog.getPosts.useInfiniteQuery(
        { limit: 6 },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    const posts = data?.pages.flatMap((page) => page.items) ?? [];

    return (
        <Stack gap="sm" mt="lg">
            <Box ta={isMobile ? 'center' : 'left'} w="100%">
                <Link href="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Title fw={500} size="lg">Blogs</Title>
                </Link>
            </Box>
            <ScrollArea.Autosize mah={500} type="scroll" offsetScrollbars>
                <Stack gap="md">
                    {posts.map((post) => (
                        <Box key={post.id} maw={250} mx="auto" w="100%">
                            <Link
                                href={`/blog/${post.slug}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <motion.div
                                    style={{
                                        width: '100%',
                                        padding: 'var(--mantine-spacing-xs)',
                                        borderRadius: 'var(--mantine-radius-lg)',
                                        backgroundColor: 'transparent',
                                    }}
                                    initial="initial"
                                    whileHover="hover"
                                    animate="initial"
                                    variants={{
                                        initial: {
                                            backgroundColor: 'transparent',
                                        },
                                        hover: {
                                            backgroundColor: 'var(--mantine-color-gray-3)',
                                        }
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: 'easeInOut'
                                    }}
                                >
                                    <Text size="sm" truncate>{post.title}</Text>
                                </motion.div>
                            </Link>
                        </Box>
                    ))}
                </Stack>
            </ScrollArea.Autosize>
            {hasNextPage && (
                <Button
                    variant="light"
                    size="xs"
                    onClick={() => fetchNextPage()}
                    loading={isFetching}
                >
                    Load more
                </Button>
            )}
        </Stack>
    );
}
