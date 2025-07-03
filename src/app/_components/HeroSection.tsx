'use client'

import { Title, Text, rem, Group, Avatar, Stack, Flex, Box } from '@mantine/core';
import Image from 'next/image';
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
        <Flex align='center' px={0} h="80vh" w={'100%'} direction={'column'} pt={'15dvh'} pos="relative" style={{ overflow: 'hidden' }}>
            {/* Background blur */}
            <Box
                pos="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                style={{
                    backgroundImage: 'url(/yellow-poppy-1.png)',

                    backgroundSize: 'auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    opacity: 0.7,
                    filter: 'blur(50px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />
            
            {/* Decorative images */}
            {/* Small cone near greeting */}
            <Box
                pos="absolute"
                top={{base: '3dvh', sm:'15dvh' }}
                left={{base: '5dvw', sm:'20dvw' }}
                style={{
                    transform: 'rotate(-30deg)',
                    zIndex: 1,
                    pointerEvents: 'none',
                    // opacity: 0.9

                }}
            >
                <Image src="/yellow-poppy-1.png" alt="Decorative cone" width={90} height={90} style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
            
            {/* Hexagon near MustGPT text */}
            <Box
                pos="absolute"
                top={{base: '15dvh', sm:'20dvh' }}
                right={{base: '2dvw', sm:'20dvw' }}
                style={{
                    transform: 'rotate(10deg)',
                    zIndex: 1,
                    pointerEvents: 'none',
                    // opacity: 0.9

                }}
            >
                <Image src="/yellow-poppy2.png" alt="Decorative hexagon" width={120} height={120} style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
            
            {/* Skewed hexagon behind MustGPT */}
            {/* <Box
                pos="absolute"
                top="0dvh"
                left="50dvw"
                style={{
                    zIndex: 1,
                    pointerEvents: 'none',
                    opacity: 0.9

                }}
            >
                <Image src="/skewed-hexagone.png" alt="Decorative skewed hexagon" width={90} height={90} style={{ maxWidth: '100%', height: 'auto' }} />
            </Box> */}
            
            {/* Sphere near search input */}
            <Box
                pos="absolute"
                top="45dvh"
                left="10dvw"
                style={{
                    zIndex: 1,
                    pointerEvents: 'none',
                    // opacity: 0.9
                }}
            >
                <Image src="/yellow-poppy3.png" alt="Decorative sphere" width={100} height={100} style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
            
            {/* Triangle near search input */}
            <Box
                pos="absolute"
                top={{base: '65dvh', sm:'50dvh' }}
                right={{base: '2dvw', sm:'10dvw' }}
                style={{
                    zIndex: 1,
                    pointerEvents: 'none',
                    // opacity: 0.9
                }}
            >
                <Image src="/yellow-poppy4.png" alt="Decorative triangle" width={95} height={95} style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
            
            <Stack align='center' gap="xl" style={{ position: 'relative', zIndex: 2 }}>
                <div ref={greetingRef} style={{ opacity: 0 }}>
                    <Group gap="xs">
                        <Text size="lg" c="secondary.8" fw={500}>Hey, I&apos;m</Text>
                        <Avatar
                            src="/profile-pic.jpeg"
                            alt="Mustafa"
                            size="md"
                            radius="xl"
                        />
                        <Text size="lg" c="secondary.8" fw={500}>Mustafa</Text>
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
