'use client'

import { Box, Center, Grid, Text, Title, Paper, rem, Overlay } from '@mantine/core';
import { Play } from 'react-feather';

const features = [
  {
    title: 'Feature 1',
    description: 'Description of feature 1 goes here',
    icon: '🚀',
  },
  {
    title: 'Feature 2',
    description: 'Description of feature 2 goes here',
    icon: '💡',
  },
];

export function FeaturesSection() {
  return (
    <Box
      py={'20dvh'}
      style={{
        position: 'relative',
        backgroundImage: 'url(/epoxy-bright-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Overlay
        gradient="linear-gradient(180deg, rgba(0,127,180,0.9) 0%, rgba(0,127,180,0.00) 20%)"
        opacity={1}
        zIndex={1}
      />
      <Center style={{ position: 'relative', zIndex: 2 }}>
        <Grid gutter={rem(50)} w={{base:'90dvw', sm:'65dvw', md:'60dvw'}}>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Title order={2} mb={rem(20)} ff="heading" c={'accent.0'}>
              Discover <Text span c="secondary.2" inherit>Amazing</Text> Features
            </Title>
            <Text size="lg" mb={rem(40)} c="gray.0">
              Explore our powerful features designed to enhance your experience
            </Text>
            
            {features.map((feature, index) => (
              <Paper
                key={index}
                p="md"
                mb="md"
                style={(theme) => ({
                  border: `${rem(1)} dashed ${theme.colors.gray[3]}`,
                  borderRadius: theme.radius.md,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: rem(16),
                  backgroundColor: 'rgba(246,246,246, 0)'
                })}
              >
                <Text size={rem(24)}>{feature.icon}</Text>
                <div>
                  <Text fw={700} mb={4}>{feature.title}</Text>
                  <Text size="sm" c="gray.0">{feature.description}</Text>
                </div>
              </Paper>
            ))}
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }} style={{ display: 'flex', alignItems: 'center' }} >
            <Paper
              radius="lg"
              style={{
                width: '100%',
                aspectRatio: '9/16',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src="/placeholder-video.jpg"
                alt="Video preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                style={{
                  position: 'absolute',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  padding: rem(16),
                }}
              >
                <Play size={32} strokeWidth={1.5} />
              </Box>
            </Paper>
          </Grid.Col>
        </Grid>
      </Center>
    </Box>
  );
}
