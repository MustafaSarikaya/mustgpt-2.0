'use client'

import { HeroSection } from '@/app/_components/HeroSection';
import WaveAnimation from '@/app/_components/WaveAnimation';
import { FeaturesSection } from '@/app/_components/FeaturesSection';
import { BlogSection } from '@/app/_components/BlogSection';
import { TestimonialSection } from '../_components/TestimonialSection';
import { CallToActionSection } from '@/app/_components/CallToActionSection';
import Footer from '@/app/_components/Footer';

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
