'use client';

import { motion } from 'framer-motion';

const IsometricClassroom = () => {
  // String light colors matching the site palette
  const lightColors = ['#a07cc3', '#e1889f', '#f59f80', '#fcccba', '#dccbeb'];

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] aspect-square">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Definitions for gradients and filters */}
        <defs>
          {/* Glow filter for lights */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Floor gradient */}
          <linearGradient id="floorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dccbeb" />
            <stop offset="100%" stopColor="#c8cadc" />
          </linearGradient>

          {/* Wall gradients */}
          <linearGradient id="leftWallGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f5e6ff" />
            <stop offset="100%" stopColor="#e8d4f4" />
          </linearGradient>

          <linearGradient id="rightWallGradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffe6f0" />
            <stop offset="100%" stopColor="#f4d4e4" />
          </linearGradient>
        </defs>

        {/* === ROOM STRUCTURE === */}

        {/* Floor - isometric diamond */}
        <motion.path
          d="M200 340 L340 260 L200 180 L60 260 Z"
          fill="url(#floorGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Left wall */}
        <motion.path
          d="M60 260 L60 100 L200 20 L200 180 Z"
          fill="url(#leftWallGradient)"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        {/* Right wall */}
        <motion.path
          d="M200 180 L200 20 L340 100 L340 260 Z"
          fill="url(#rightWallGradient)"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        {/* === ARTWORK ON WALLS === */}

        {/* Left wall - Picture frame 1 (ABC poster) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <path d="M90 140 L90 100 L140 75 L140 115 Z" fill="#fff" stroke="#a07cc3" strokeWidth="2" />
          <text x="108" y="100" fontSize="12" fill="#a07cc3" fontWeight="bold" transform="skewY(-26.5)">ABC</text>
        </motion.g>

        {/* Left wall - Picture frame 2 (colorful art) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <path d="M100 200 L100 155 L155 127 L155 172 Z" fill="#fff" stroke="#e1889f" strokeWidth="2" />
          {/* Rainbow stripes inside */}
          <path d="M105 190 L105 165 L150 140 L150 165 Z" fill="#fcccba" />
          <path d="M105 175 L105 160 L150 135 L150 150 Z" fill="#e1889f" />
          <path d="M105 162 L105 155 L150 130 L150 137 Z" fill="#a07cc3" />
        </motion.g>

        {/* Right wall - Large artwork (sun drawing) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <path d="M250 130 L250 75 L310 105 L310 160 Z" fill="#fff" stroke="#f59f80" strokeWidth="2" />
          {/* Simple sun */}
          <circle cx="278" cy="115" r="12" fill="#fcccba" transform="skewY(26.5)" />
        </motion.g>

        {/* Right wall - Small artwork */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <path d="M270 200 L270 160 L315 185 L315 225 Z" fill="#fff" stroke="#dccbeb" strokeWidth="2" />
          {/* Heart shape */}
          <path d="M290 195 Q285 185 290 190 Q295 185 290 195" fill="#e1889f" transform="scale(1.5) translate(-100, -60)" />
        </motion.g>

        {/* === STRING LIGHTS === */}

        {/* String light wire - left wall */}
        <motion.path
          d="M70 85 Q100 95 130 80 Q160 65 180 75"
          stroke="#8b7355"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* String light wire - right wall */}
        <motion.path
          d="M220 75 Q250 65 280 80 Q310 95 330 85"
          stroke="#8b7355"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* String light wire - across top */}
        <motion.path
          d="M180 75 Q200 55 220 75"
          stroke="#8b7355"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />

        {/* Animated light bulbs - Left side */}
        {[
          { cx: 80, cy: 90, delay: 0 },
          { cx: 105, cy: 85, delay: 0.3 },
          { cx: 130, cy: 78, delay: 0.6 },
          { cx: 155, cy: 73, delay: 0.9 },
          { cx: 175, cy: 75, delay: 1.2 },
        ].map((light, i) => (
          <motion.g key={`left-${i}`} filter="url(#glow)">
            <motion.circle
              cx={light.cx}
              cy={light.cy}
              r="6"
              fill={lightColors[i % lightColors.length]}
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{
                duration: 2,
                delay: light.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Bulb highlight */}
            <circle cx={light.cx - 2} cy={light.cy - 2} r="1.5" fill="#fff" opacity="0.6" />
          </motion.g>
        ))}

        {/* Animated light bulbs - Top center */}
        {[
          { cx: 190, cy: 65, delay: 0.4 },
          { cx: 200, cy: 58, delay: 0.7 },
          { cx: 210, cy: 65, delay: 1.0 },
        ].map((light, i) => (
          <motion.g key={`top-${i}`} filter="url(#glow)">
            <motion.circle
              cx={light.cx}
              cy={light.cy}
              r="6"
              fill={lightColors[(i + 2) % lightColors.length]}
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{
                duration: 2.5,
                delay: light.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <circle cx={light.cx - 2} cy={light.cy - 2} r="1.5" fill="#fff" opacity="0.6" />
          </motion.g>
        ))}

        {/* Animated light bulbs - Right side */}
        {[
          { cx: 225, cy: 73, delay: 0.2 },
          { cx: 250, cy: 70, delay: 0.5 },
          { cx: 275, cy: 78, delay: 0.8 },
          { cx: 300, cy: 85, delay: 1.1 },
          { cx: 322, cy: 88, delay: 1.4 },
        ].map((light, i) => (
          <motion.g key={`right-${i}`} filter="url(#glow)">
            <motion.circle
              cx={light.cx}
              cy={light.cy}
              r="6"
              fill={lightColors[(i + 1) % lightColors.length]}
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{
                duration: 2.2,
                delay: light.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <circle cx={light.cx - 2} cy={light.cy - 2} r="1.5" fill="#fff" opacity="0.6" />
          </motion.g>
        ))}

        {/* === FURNITURE === */}

        {/* Teacher's Desk - front center */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Desk top */}
          <path d="M150 280 L200 255 L270 290 L220 315 Z" fill="#d4a574" />
          {/* Desk front */}
          <path d="M150 280 L150 300 L220 335 L220 315 Z" fill="#b8956c" />
          {/* Desk side */}
          <path d="M220 315 L220 335 L270 310 L270 290 Z" fill="#c9a070" />
          {/* Items on desk */}
          <ellipse cx="195" cy="268" rx="12" ry="6" fill="#a07cc3" /> {/* Apple/item */}
          <rect x="210" y="262" width="20" height="15" fill="#fff" transform="skewY(26.5) skewX(-10)" /> {/* Papers */}
        </motion.g>

        {/* Student Desk 1 - left */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <path d="M80 300 L115 282 L155 300 L120 318 Z" fill="#e8d4f4" />
          <path d="M80 300 L80 312 L120 330 L120 318 Z" fill="#d4c0e4" />
          <path d="M120 318 L120 330 L155 312 L155 300 Z" fill="#dccbe8" />
          {/* Chair */}
          <path d="M90 315 L110 305 L125 315 L105 325 Z" fill="#a07cc3" />
          <path d="M90 315 L90 295 L105 287 L105 307 Z" fill="#8a6ab3" />
        </motion.g>

        {/* Student Desk 2 - right */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          <path d="M270 310 L305 292 L345 310 L310 328 Z" fill="#ffe6f0" />
          <path d="M270 310 L270 322 L310 340 L310 328 Z" fill="#f4d4e4" />
          <path d="M310 328 L310 340 L345 322 L345 310 Z" fill="#f9dce8" />
          {/* Chair */}
          <path d="M280 325 L300 315 L315 325 L295 335 Z" fill="#e1889f" />
          <path d="M300 315 L300 295 L315 287 L315 307 Z" fill="#c97088" />
        </motion.g>

        {/* Bookshelf - back left corner */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Shelf structure */}
          <path d="M70 230 L70 170 L95 155 L95 215 Z" fill="#c9a070" />
          <path d="M70 230 L95 215 L120 230 L95 245 Z" fill="#d4a574" />
          <path d="M95 215 L95 155 L120 170 L120 230 Z" fill="#b8956c" />
          {/* Books */}
          <rect x="75" y="190" width="5" height="20" fill="#a07cc3" transform="skewY(-26.5)" />
          <rect x="81" y="188" width="4" height="22" fill="#e1889f" transform="skewY(-26.5)" />
          <rect x="86" y="189" width="5" height="21" fill="#f59f80" transform="skewY(-26.5)" />
          <rect x="75" y="210" width="6" height="15" fill="#fcccba" transform="skewY(-26.5)" />
          <rect x="82" y="209" width="5" height="16" fill="#dccbeb" transform="skewY(-26.5)" />
        </motion.g>

        {/* Plant - right corner */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
        >
          {/* Pot */}
          <path d="M310 250 L310 235 L325 242 L325 257 Z" fill="#e1889f" />
          <path d="M310 250 L325 257 L340 250 L325 242 Z" fill="#f4a0b8" />
          <path d="M325 242 L340 250 L340 235 L325 227 Z" fill="#c97088" />
          {/* Leaves */}
          <ellipse cx="325" cy="220" rx="8" ry="12" fill="#7cb87c" />
          <ellipse cx="318" cy="225" rx="6" ry="10" fill="#8ec88e" />
          <ellipse cx="332" cy="225" rx="6" ry="10" fill="#6aa86a" />
        </motion.g>

        {/* Rug on floor */}
        <motion.path
          d="M170 300 L200 285 L250 310 L220 325 Z"
          fill="#e1889f"
          opacity="0.4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        />

      </svg>

      {/* Extra ambient glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-gradient-to-b from-purple/20 to-transparent blur-xl rounded-full" />
    </div>
  );
};

export default IsometricClassroom;
