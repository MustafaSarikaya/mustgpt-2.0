'use client';

import { Paper, Text, Stack } from '@mantine/core';
import type { MantineTheme } from '@mantine/core';

interface QuestionCardProps {
  title: string;
  question: string;
  onClick: () => void;
}

export function QuestionCard({ title, question, onClick }: QuestionCardProps) {
  return (
    <Paper
      shadow="sm"
      p="lg"
      my="md"
      mx='xs'
      radius="lg"
      onClick={onClick}
      style={(theme: MantineTheme) => ({
        height: '9rem',
        borderColor: 'accent',
        cursor: 'pointer',
        transition: 'all 150ms ease',
      })}
    >
      <Stack h="100%" justify="space-between">
        <div>
          <Text 
            size="lg" 
            fw={500} 
            mb="xs"
          >
            {title}
          </Text>
          <Text size="sm" c="dimmed" lineClamp={3}>
            {question}
          </Text>
        </div>
      </Stack>
    </Paper>
  );
}
