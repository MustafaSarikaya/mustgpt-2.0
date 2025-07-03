'use client'

import { Avatar, Card, Group, Image, Paper, Stack, Text, Space, Box } from '@mantine/core';
import { motion } from 'motion/react';

export type BlogPost = {
  id: number | string;
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

interface BlogCardProps {
  article: BlogPost;
}

export function BlogCard({ article }: BlogCardProps) {
  const handleClick = () => {
    window.location.href = `/blog/${article.slug}`;
  };
  return (
    <Card
      key={article.id}
      padding="3"
      radius="lg"
      bg={'primary.2'}
      component={motion.div}
      onClick={handleClick}
      style={{
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      whileHover={'hover'}
      variants={{
        hover: {
          y: -5,
          boxShadow: '0 8px 50px rgba(0,0,0,0.1)'
        }
      }}
      transition={{ duration: 0.2 }}
    >
      <Box style={{ height: 200, overflow: 'hidden', borderRadius: 'var(--mantine-radius-lg)' }}>
        <Image
          radius={'lg'}
          src={article.image}
          height={200}
          alt={article.title}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </Box>
      <Space h='3' />
      <Paper radius={'lg'} >
        <Stack p="md" gap="sm">
          <Box h='4rem' >
            <Text size="xl" ff='heading' lineClamp={2}>
              {article.title}
            </Text>
          </Box>
          <Group justify="space-between" align="center">
            {article.author && (
              <Group gap="xs">
                <Avatar src={article.author.avatar} size={20} radius="xl" />
                <Text size="xs" c="dimmed">
                  {article.author.name}
                </Text>
              </Group>
            )}
            <Text size="sm" c="dimmed">
              {article.date}
            </Text>
          </Group>
        </Stack>
      </Paper>
    </Card>
  );
}
