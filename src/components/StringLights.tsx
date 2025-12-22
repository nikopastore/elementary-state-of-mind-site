'use client';

import { motion } from 'framer-motion';

const StringLights = () => {
  // Generate lights across the width
  const lights = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    color: ['#ffb3c6', '#c8a2c8', '#ffd1a3', '#b8d4e8'][i % 4],
    loadDelay: i * 0.08, // Staggered load from left to right
    glowDelay: i * 0.15, // Offset for glow animation
  }));

  return (
    <div className="w-full overflow-hidden" style={{ height: '50px' }}>
      <div className="relative w-full h-full flex items-start justify-between px-2">
        {/* The wire/string - draws in from left */}
        <motion.svg
          className="absolute top-0 left-0 w-full"
          style={{ height: '20px' }}
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.path
            d="M0 8 Q 2% 12 4% 8 Q 6% 4 8% 8 Q 10% 12 12% 8 Q 14% 4 16% 8 Q 18% 12 20% 8 Q 22% 4 24% 8 Q 26% 12 28% 8 Q 30% 4 32% 8 Q 34% 12 36% 8 Q 38% 4 40% 8 Q 42% 12 44% 8 Q 46% 4 48% 8 Q 50% 12 52% 8 Q 54% 4 56% 8 Q 58% 12 60% 8 Q 62% 4 64% 8 Q 66% 12 68% 8 Q 70% 4 72% 8 Q 74% 12 76% 8 Q 78% 4 80% 8 Q 82% 12 84% 8 Q 86% 4 88% 8 Q 90% 12 92% 8 Q 94% 4 96% 8 Q 98% 12 100% 8"
            stroke="#8b7355"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </motion.svg>

        {/* Light bulbs - appear one at a time */}
        {lights.map((light, index) => {
          const leftPercent = (index / (lights.length - 1)) * 100;
          // Alternate heights for wave effect
          const isLow = index % 2 === 0;

          return (
            <motion.div
              key={light.id}
              className="absolute flex flex-col items-center"
              style={{
                left: `${leftPercent}%`,
                top: isLow ? '10px' : '4px',
                transform: 'translateX(-50%)',
              }}
              initial={{ opacity: 0, scale: 0, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: light.loadDelay,
                ease: 'backOut',
              }}
            >
              {/* Bulb socket/cap */}
              <div
                className="rounded-sm"
                style={{
                  width: '8px',
                  height: '6px',
                  backgroundColor: '#967259',
                }}
              />

              {/* Bulb with glow */}
              <div className="relative">
                {/* Outer glow - pulsing */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: light.color,
                    top: '-4px',
                    left: '-4px',
                    filter: 'blur(8px)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    delay: light.loadDelay + 0.4 + light.glowDelay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Bulb body - pulsing brightness */}
                <motion.div
                  className="relative"
                  style={{
                    width: '16px',
                    height: '20px',
                    backgroundColor: light.color,
                    borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                  }}
                  initial={{ opacity: 0.3 }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: light.loadDelay + 0.4 + light.glowDelay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Highlight */}
                  <div
                    className="absolute rounded-full bg-white"
                    style={{
                      width: '5px',
                      height: '6px',
                      top: '4px',
                      left: '3px',
                      opacity: 0.6,
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StringLights;
