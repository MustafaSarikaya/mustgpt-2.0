import { Carousel } from '@mantine/carousel';
import { Container, Title, Avatar, Text, Box, Stack, Flex } from '@mantine/core';
import Image from 'next/image';

const testimonials = [
  {
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/profile-pic.jpeg',
  },
  {
    name: 'Jane Smith',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/profile-pic.jpeg',
  },
  {
    name: 'Mike Johnson',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: '/profile-pic.jpeg',
  },
];

export function TestimonialSection() {
  return (
    <Box pos="relative" pb={'15dvh'}>
      {/* Left decorative poppy */}
      <Box
        pos="absolute"
        left={0}
        top={0}
        style={{ transform: 'translateY(30%)', zIndex: -1 }}
        w={{ base: '25%', sm: '15%' }}
        h="auto"
      >
        <Image
          src="/yellow-poppy2.png"
          alt="Decorative poppy"
          width={200}
          height={300}
          style={{
            width: '100%',
            height: 'auto',
            transform: 'translateX(10%)',
          }}
        />
      </Box>

      {/* Bottom right decorative poppy */}
      <Box
        pos="absolute"
        right={0}
        bottom={0}
        style={{ transform: 'translateY(-50%)', zIndex: -1 }}
        w={{ base: '30%', sm: '20%' }}
        h="auto"
      >
        <Image
          src="/yellow-poppy3.png"
          alt="Decorative poppy"
          width={250}
          height={350}
          style={{
            width: '100%',
            height: 'auto',
            transform: 'translateX(15%)',
          }}
        />
      </Box>

      <Container mih="60dvh" style={{ position: 'relative', zIndex: 1 }} w={{base: '90dvw', sm:'65dvw', md:'60dvw'}}>
        <Title
          order={2}
          ta="center"
          mb={50}
        >
          Trusted by Clients 🎩 <br/> and Colleagues 🪖
        </Title>

        <Carousel
          slideSize='100%'
          withControls
          withIndicators
          emblaOptions={{
            loop: false,
            dragFree: false,
            align: 'start',
          }}
          styles={{
            viewport: {
              paddingRight: '10px'
            },
            // control: {
            //   '&[data-inactive]': {
            //     opacity: 0,
            //     cursor: 'default',
            //   },
            // },
            // controls: {
            //   padding: '0 20px',
            // },
            indicator: {
              // bottom: rem(-40),
              outline: '3px solid rgb(234, 212, 20)',
              outlineOffset: '-3px',
              transition: 'width 250ms ease',
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Carousel.Slide key={index}  
            style={{ padding: '2rem' }}
            >
              <Flex
                gap="xl"
                align="flex-start"
                direction={{ base: 'column-reverse', sm: 'row' }}
              >
                <Stack align="center" justify='center' w={{ base: '100%', sm: '25%' }}>
                  <Avatar
                    src={testimonial.image}
                    size="xl"
                    radius="50%"
                  />
                  <Text fw={700} size="lg">
                    {testimonial.name}
                  </Text>
                </Stack>
                <Box w={{ base: '100%', sm: '75%' }}>
                  <Text ta={{ base: 'center', sm: 'left' }} lh={1.6}>
                    {testimonial.text}
                  </Text>
                </Box>
              </Flex>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
