'use client';

import { Box, rem } from '@mantine/core';
import type { MantineTheme } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { QuestionCard } from './QuestionCard';

interface Question {
  title: string;
  question: string;
}

interface QuestionCarouselProps {
  questions: Question[];
  onQuestionSelect: (question: string) => void;
}

export function QuestionCarousel({ questions, onQuestionSelect }: QuestionCarouselProps) {
  return (
    // <Box w="100%" maw={800} px={{base: 0, sm: 'md'}} >
      <Carousel
        w={{ base:'100dvw', sm:'65dvw', md:'60dvw' }}
        slideSize='200px'
        withControls
        withIndicators
        emblaOptions={{
          loop: false,
          dragFree: true,
          align: 'start',
        }}
      >
        {questions.map((item, index) => (
          <Carousel.Slide key={index}>
            <QuestionCard
              title={item.title}
              question={item.question}
              onClick={() => onQuestionSelect(item.question)}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    // </Box>
  );
}
