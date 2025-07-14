'use client'

import { HeroSection } from '@/src/app/_components/HeroSection';
import WaveAnimation from '@/src/app/_components/WaveAnimation';
import { FeaturesSection } from '@/src/app/_components/FeaturesSection';
import { BlogSection } from '@/src/app/_components/BlogSection';
import { TestimonialSection } from '../_components/TestimonialSection';
import { CallToActionSection } from '@/src/app/_components/CallToActionSection';
import Footer from '@/src/app/_components/Footer';

export default function Home() {
    return (
        <>
            <HeroSection />
            <WaveAnimation />
            <FeaturesSection />
            <BlogSection />
            <TestimonialSection/>
            <CallToActionSection />
            <Footer />
        </>
    );
}
