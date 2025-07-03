'use client'

import { ActionIcon, Box, Container, Group, Space, Stack, Text, Title } from "@mantine/core";
import { GitHub, Linkedin, Twitter } from "react-feather";
import WaveAnimation from "./WaveAnimation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" className="relative">
      <Box className="mt-[-35px]"> {/* Negative margin to create overlap */}
        <WaveAnimation 
          primaryWaveStartColor="rgb(199, 232, 247)"
          primaryWaveEndColor="#F6F6F6"
          primaryWaveStartLocation={0}
          primaryWaveEndLocation={100} 
          backgroundWaveColor="rgba(139, 214, 246, 0.7)"
          backgroundColor="007FB4"
        />
      </Box>
      <Box className="relative">
        <Container w={{base: '90dvw', sm:'65dvw', md:'60dvw'}}>
          <Stack mt={'5dvh'} mb={'2dvh'}>
            {/* Navigation links */}
            <Stack align="center" gap="xl">
              <Stack gap="md" align="center">
                <Title order={6} c="dimmed" className="uppercase tracking-wider">
                  Explore
                </Title>
                <Group gap="xl" justify="center">
                  <Text component="a" href="/projects" className="text-gray-700 hover:text-blue-600">
                    Projects
                  </Text>
                  <Text component="a" href="/events" className="text-gray-700 hover:text-blue-600">
                    Events
                  </Text>
                </Group>
              </Stack>
              
              {/* Social icons */}
              <Group gap="xl" justify="center">
                <ActionIcon 
                  variant="subtle" 
                  size="lg" 
                  component="a" 
                  href="https://github.com/mustafasarikaya" 
                  target="_blank"
                >
                  <GitHub size={24} />
                </ActionIcon>
                <ActionIcon 
                  variant="subtle" 
                  size="lg" 
                  component="a" 
                  href="https://linkedin.com/in/mustafa-sarikaya" 
                  target="_blank"
                >
                  <Linkedin size={24} />
                </ActionIcon>
                <ActionIcon 
                  variant="subtle" 
                  size="lg" 
                  component="a" 
                  href="https://twitter.com/mustafa_srkaya" 
                  target="_blank"
                >
                  <Twitter size={24} />
                </ActionIcon>
              </Group>
            </Stack>
            
            <Space h={'3dvh'}/>
            
            {/* Copyright and terms */}
            <Stack align="center" gap="lg">
              <Text size="sm" className="text-gray-600 text-center">
                © {currentYear} Mustafa Sarikaya. All rights reserved.
              </Text>
              <Group gap="xl" justify="center">
                <Text 
                  component="a" 
                  href="/terms" 
                  size="sm" 
                  className="text-gray-600 hover:text-blue-600"
                >
                  Terms of Service
                </Text>
                <Text 
                  component="a" 
                  href="/privacy" 
                  size="sm" 
                  className="text-gray-600 hover:text-blue-600"
                >
                  Privacy Policy
                </Text>
              </Group>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
