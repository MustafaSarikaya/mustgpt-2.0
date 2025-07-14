'use client'

import { Textarea, ActionIcon, Box, Group } from '@mantine/core';
import { Search, Mic, Calendar } from 'react-feather';
import { forwardRef, KeyboardEvent } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchInputProps extends ComponentPropsWithoutRef<typeof Textarea> {
  onMicClick?: () => void;
  onCalendarClick?: () => void;
  initialMessage?: string;
}

export const SearchInput = forwardRef<HTMLTextAreaElement, SearchInputProps>(
  ({ onMicClick, onCalendarClick, initialMessage = '', ...props }, ref) => {
    const router = useRouter();
    return (
      <Box w={{base: '90dvw', sm:'65dvw', md:'60dvw'}}>
        <Textarea
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              const message = (e.target as HTMLTextAreaElement).value.trim();
              if (message) {
                const searchParams = new URLSearchParams();
                searchParams.set('message', message);
                router.push(`/chat?${searchParams.toString()}`);
              }
            }
          }}
          ref={ref}
          size="lg"
          placeholder="Let's chat!"
          autosize
          minRows={1}
          maxRows={4}
          radius={'lg'}
          p={1}
          styles={{
            input: {
              '&:focus': {
                outline: '2px solid var(--mantine-color-primary-5)',
                outlineOffset: '-2px'
              }
            }
          }}
          leftSection={
            <ActionIcon variant="subtle" color="gray" size="lg">
              <Search size={20} />
            </ActionIcon>
          }
          rightSectionWidth={100}
          rightSection={
            <Group gap="xs" wrap="nowrap" justify="flex-end" w={100}>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="lg"
                onClick={onMicClick}
              >
                <Mic size={20} />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="lg"
                onClick={onCalendarClick}
              >
                <Calendar size={20} />
              </ActionIcon>
            </Group>
          }
          {...props}
        />
      </Box>
    );
  }
);

SearchInput.displayName = 'SearchInput';
