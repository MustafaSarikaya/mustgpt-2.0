'use client'

import { Box } from '@mantine/core';

interface WaveAnimationProps {
  primaryWaveStartColor?: string;
  primaryWaveEndColor?: string;
  primaryWaveStartLocation?: number;
  primaryWaveEndLocation?: number;
  backgroundWaveColor?: string;
  backgroundWaveStartLocation?: number;
  backgroundWaveEndLocation?: number;
  backgroundColor?: string;
}

const WaveAnimation = ({
  primaryWaveStartColor = '#53BDE9',
  primaryWaveEndColor = '#007FB4',
  primaryWaveStartLocation = 0,
  primaryWaveEndLocation = 60,
  backgroundWaveColor = '#E6E6E6',
  backgroundWaveStartLocation = 0,
  backgroundWaveEndLocation = 100,
  backgroundColor = 'rgba(246,246,246, 0)'
}: WaveAnimationProps) => {
  const waveWidth = 128; // Width of a single wave SVG
  const repetitions = 30; // Number of wave repetitions to cover the width
  
  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        height: '40px',
        overflow: 'hidden',
        backgroundColor
      }}
    >
      {/* Background wave */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          width: `${waveWidth * repetitions}px`,
          animation: 'wave-scroll-reverse 6s linear infinite',
          opacity: 0.7
        }}
      >
        {Array.from({ length: repetitions }).map((_, index) => (
          <svg
            key={`bg-${index}`}
            width={waveWidth}
            height="100"
            viewBox="0 0 128 80"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave-gradient-bg" x1="0" x2="0" y1="0" y2="1">
                <stop offset={`${backgroundWaveStartLocation}%`} stopColor={backgroundWaveColor} />
                <stop offset={`${backgroundWaveEndLocation}%`} stopColor={backgroundWaveColor} />
              </linearGradient>
            </defs>
            <path d="M 43.872 7.28 C 26.324 20.46 7.312 23.76 0 23.76 L 0 32 L 128 32 L 128 23.76 C 120.688 23.76 101.676 20.464 84.128 7.28 C 77.208 2.08 70.3 0.04 64 0 C 57.7 0.04 50.788 2.08 43.872 7.28 Z" fill="url(#wave-gradient-bg)"></path>
          </svg>
        ))}
      </div>
      
      {/* Foreground wave */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          width: `${waveWidth * repetitions}px`,
          animation: 'wave-scroll 8s linear infinite',
          // filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.35))'
        }}
      >
        {Array.from({ length: repetitions }).map((_, index) => (
          <svg
            key={`fg-${index}`}
            width={waveWidth}
            height="100"
            viewBox="0 0 128 80"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave-gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset={`${primaryWaveStartLocation}%`} stopColor={primaryWaveStartColor} />
                <stop offset={`${primaryWaveEndLocation}%`} stopColor={primaryWaveEndColor} />
              </linearGradient>
            </defs>
            <path d="M 43.872 7.28 C 26.324 20.46 7.312 23.76 0 23.76 L 0 32 L 128 32 L 128 23.76 C 120.688 23.76 101.676 20.464 84.128 7.28 C 77.208 2.08 70.3 0.04 64 0 C 57.7 0.04 50.788 2.08 43.872 7.28 Z" fill="url(#wave-gradient)"></path>
          </svg>
        ))}
      </div>

      <style jsx>{`
        @keyframes wave-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-${waveWidth}px); }
        }
        @keyframes wave-scroll-reverse {
          from { transform: translateX(-${waveWidth}px); }
          to { transform: translateX(0); }
        }
      `}</style>
    </Box>
  );
};

export default WaveAnimation;
