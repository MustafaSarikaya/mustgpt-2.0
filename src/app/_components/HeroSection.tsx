'use client'

import { Title, Text, rem, Group, Avatar, Stack, Flex } from '@mantine/core';
import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import { SearchInput } from '@/app/_components/SearchInput';
import { QuestionCarousel } from '@/app/_components/QuestionCarousel';

const quickQuestions = [
    {
        title: 'Experience',
        question: 'What is your professional background?'
    },
    {
        title: 'Skills',
        question: 'What are your main technical skills?'
    },
    {
        title: 'Projects',
        question: 'What are some notable projects you\'ve worked on?'
    },
    {
        title: 'Contact',
        question: 'How can I get in touch with you?'
    }
];

export function HeroSection() {
    const greetingRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (greetingRef.current) {
            animate(greetingRef.current, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5 });
        }
        if (titleRef.current) {
            animate(titleRef.current, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, delay: 0.2 });
        }
        if (searchRef.current) {
            animate(searchRef.current, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, delay: 0.4 });
        }
        if (carouselRef.current) {
            animate(carouselRef.current, { opacity: [0, 1], x: [50, 0] }, { duration: 0.6, delay: 0.6 });
        }
    }, []);

    const handleQuestionSelect = (question: string) => {
        console.log('Selected question:', question);
        // TODO: Add the question to the input field
    };

    return (
        <Flex align='center' px={0} h="80vh" w={'100%'} direction={'column'} pt={'15dvh'}>
            <Stack align='center' gap="xl">
                <div ref={greetingRef} style={{ opacity: 0 }}>
                    <Group gap="xs">
                        <Text size="lg" c="primary" fw={500}>Hey, I&apos;m</Text>
                        <Avatar
                            src="/profile-pic.jpeg"
                            alt="Mustafa"
                            size="md"
                            radius="xl"
                        />
                        <Text size="lg" c="primary" fw={500}>Mustafa</Text>
                    </Group>
                </div>

                <div ref={titleRef} style={{ opacity: 0 }}>
                    <Title
                        order={1}
                        size={rem(64)}
                        fw={700}
                        c="accent.9"
                    >
                        MustGPT
                    </Title>
                </div>

                <div ref={searchRef} style={{ opacity: 0 }}>
                    <SearchInput
                        onMicClick={() => console.log('Mic clicked')}
                        onCalendarClick={() => console.log('Calendar clicked')}
                    />
                </div>

                <div ref={carouselRef} style={{ opacity: 0 }}>
                    <QuestionCarousel
                        questions={quickQuestions}
                        onQuestionSelect={handleQuestionSelect}
                    />
                </div>
            </Stack>
        </Flex>
    );
}
