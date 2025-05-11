'use client'

import { Textarea, ActionIcon, Box, Group } from '@mantine/core';
import { Search, Mic, Calendar } from 'react-feather';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

interface SearchInputProps extends ComponentPropsWithoutRef<typeof Textarea> {
  onMicClick?: () => void;
  onCalendarClick?: () => void;
}

export const SearchInput = forwardRef<HTMLTextAreaElement, SearchInputProps>(
  ({ onMicClick, onCalendarClick, ...props }, ref) => {
    return (
      <Box w={{base: '95dvw', sm:'60dvw', md:'50dvw'}}>
        <Textarea
          ref={ref}
          size="lg"
          placeholder="Let's chat!"
          autosize
          minRows={1}
          maxRows={4}
          p={1}
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
