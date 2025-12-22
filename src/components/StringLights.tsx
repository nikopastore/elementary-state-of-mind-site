'use client';

import { motion } from 'framer-motion';

const StringLights = () => {
  // Light bulb positions and colors - spread across the width
  const lights = [
    { x: 3, color: '#ffb3c6', delay: 0 },
    { x: 8, color: '#c8a2c8', delay: 0.15 },
    { x: 13, color: '#ffd1a3', delay: 0.3 },
    { x: 18, color: '#b8d4e8', delay: 0.45 },
    { x: 23, color: '#ffb3c6', delay: 0.6 },
    { x: 28, color: '#c8a2c8', delay: 0.75 },
    { x: 33, color: '#ffd1a3', delay: 0.9 },
    { x: 38, color: '#b8d4e8', delay: 1.05 },
    { x: 43, color: '#ffb3c6', delay: 1.2 },
    { x: 48, color: '#c8a2c8', delay: 1.35 },
    { x: 53, color: '#ffd1a3', delay: 1.5 },
    { x: 58, color: '#b8d4e8', delay: 1.65 },
    { x: 63, color: '#ffb3c6', delay: 1.8 },
    { x: 68, color: '#c8a2c8', delay: 1.95 },
    { x: 73, color: '#ffd1a3', delay: 2.1 },
    { x: 78, color: '#b8d4e8', delay: 2.25 },
    { x: 83, color: '#ffb3c6', delay: 2.4 },
    { x: 88, color: '#c8a2c8', delay: 2.55 },
    { x: 93, color: '#ffd1a3', delay: 2.7 },
    { x: 97, color: '#b8d4e8', delay: 2.85 },
  ];

  return (
    <div className="w-full h-10 relative overflow-hidden bg-transparent">
      <svg
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter for lights */}
          <filter id="bulbGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* String/wire - gentle draping curve */}
        <motion.path
          d="M0 2
             Q 5 3.5 10 2.5
             Q 15 1.5 20 2.5
             Q 25 3.5 30 2.5
             Q 35 1.5 40 2.5
             Q 45 3.5 50 2.5
             Q 55 1.5 60 2.5
             Q 65 3.5 70 2.5
             Q 75 1.5 80 2.5
             Q 85 3.5 90 2.5
             Q 95 1.5 100 2.5"
          stroke="#8b7355"
          strokeWidth="0.3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Light bulbs */}
        {lights.map((light, i) => {
          // Calculate Y position based on the wave pattern
          const baseY = 2.5;
          const waveY = Math.sin((light.x / 10) * Math.PI) * 0.8;
          const y = baseY + waveY;

          return (
            <g key={i} filter="url(#bulbGlow)">
              {/* Bulb cap/socket */}
              <rect
                x={light.x - 0.3}
                y={y - 0.8}
                width="0.6"
                height="0.6"
                rx="0.1"
                fill="#967259"
              />

              {/* Outer glow */}
              <motion.circle
                cx={light.x}
                cy={y + 0.8}
                r="1.2"
                fill={light.color}
                opacity="0.3"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  r: [1, 1.4, 1],
                }}
                transition={{
                  duration: 2.5,
                  delay: light.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Bulb body */}
              <motion.ellipse
                cx={light.x}
                cy={y + 0.8}
                rx="0.7"
                ry="0.9"
                fill={light.color}
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  delay: light.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Highlight/shine */}
              <ellipse
                cx={light.x - 0.2}
                cy={y + 0.5}
                rx="0.2"
                ry="0.25"
                fill="#fff"
                opacity="0.6"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default StringLights;
