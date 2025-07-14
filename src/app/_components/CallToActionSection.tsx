'use client'

import { Title, Text, rem, Stack, Flex, Box, Overlay } from '@mantine/core';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import { SearchInput } from '@/src/app/_components/SearchInput';
import { QuestionCarousel } from '@/src/app/_components/QuestionCarousel';

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

export function CallToActionSection() {
    const titleRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Trigger animations when section comes into view
                        if (titleRef.current) {
                            animate(titleRef.current, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5 });
                        }
                        if (searchRef.current) {
                            animate(searchRef.current, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, delay: 0.2 });
                        }
                        if (carouselRef.current) {
                            animate(carouselRef.current, { opacity: [0, 1], x: [50, 0] }, { duration: 0.6, delay: 0.4 });
                        }
                        // Disconnect observer after animation
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.2 } // Trigger when 20% of the section is visible
        );

        const sectionRef = document.getElementById('cta-section');
        if (sectionRef) {
            observer.observe(sectionRef);
        }

        return () => observer.disconnect();
    }, []);

    const handleQuestionSelect = (question: string) => {
        console.log('Selected question:', question);
    };

    return (
        <Box
            id="cta-section"
            h={'90dvh'}
            pt={'20dvh'}
            pb={'25dvh'}
            style={{
                position: 'relative',
                backgroundImage: 'url(/epoxy-bright-flipped.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* <Overlay
                gradient="linear-gradient(180deg, rgba(0,127,180,0.9) 0%, rgba(0,127,180,0.00) 20%)"
                opacity={1}
                zIndex={1}
            /> */}
            
            <Flex align='center' px={0} direction={'column'} pos="relative" style={{ zIndex: 2 }}>
                {/* Decorative images */}
                {/* <Box
                    pos="absolute"
                    top={{base: '3dvh', sm:'10dvh' }}
                    left={{base: '5dvw', sm:'20dvw' }}
                    style={{
                        transform: 'rotate(-30deg)',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                >
                    <Image src="/yellow-poppy-1.png" alt="Decorative cone" width={90} height={90} style={{ maxWidth: '100%', height: 'auto' }} />
                </Box> */}
                
                {/* <Box
                    pos="absolute"
                    top={{base: '15dvh', sm:'5dvh' }}
                    right={{base: '2dvw', sm:'20dvw' }}
                    style={{
                        transform: 'rotate(10deg)',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                >
                    <Image src="/yellow-poppy2.png" alt="Decorative hexagon" width={120} height={120} style={{ maxWidth: '100%', height: 'auto' }} />
                </Box> */}
                
                <Stack align='center' gap="xl" style={{ position: 'relative', zIndex: 2 }}>
                    <Box ref={titleRef} style={{ opacity: 0 }}>
                        <Title
                            ta="center"
                            order={2}
                            size={rem(48)}
                            fw={700}
                            c="accent.0"
                        >
                            Ready to <Text span c="secondary.2" inherit>Get Started</Text>?
                        </Title>
                    </Box>

                    <Box ref={carouselRef} style={{ opacity: 0 }}>
                        <QuestionCarousel
                            questions={quickQuestions}
                            onQuestionSelect={handleQuestionSelect}
                        />
                    </Box>

                    <Box ref={searchRef} style={{ opacity: 0 }}>
                        <SearchInput
                            onMicClick={() => console.log('Mic clicked')}
                            onCalendarClick={() => console.log('Calendar clicked')}
                        />
                    </Box>

                    
                </Stack>
            </Flex>
        </Box>
    );
}
