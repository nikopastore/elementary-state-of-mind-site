'use client';

import { motion } from 'framer-motion';

const IsometricClassroom = () => {
  return (
    <div className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[440px] xl:max-w-[480px]">
      <svg
        viewBox="0 0 500 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          {/* Glow filter for string lights */}
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Subtle shadow */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>

          {/* Warm gradients */}
          <linearGradient id="floorWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5e6d3" />
            <stop offset="50%" stopColor="#ede0d0" />
            <stop offset="100%" stopColor="#e8d5c4" />
          </linearGradient>

          <linearGradient id="wallLeft" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef3f0" />
            <stop offset="100%" stopColor="#fff9f7" />
          </linearGradient>

          <linearGradient id="wallRight" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#f9f0f5" />
            <stop offset="100%" stopColor="#fdf7fa" />
          </linearGradient>

          <linearGradient id="rugGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8b4c8" />
            <stop offset="100%" stopColor="#d4a0b8" />
          </linearGradient>
        </defs>

        {/* ===== ROOM STRUCTURE ===== */}

        {/* Floor with wood texture feel */}
        <motion.path
          d="M250 380 C250 380 400 295 400 295 C405 292 405 292 400 289 L250 205 C245 202 245 202 240 205 L100 289 C95 292 95 292 100 295 Z"
          fill="url(#floorWood)"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Floor planks suggestion */}
        <g opacity="0.1" stroke="#c4a882" strokeWidth="1">
          <path d="M140 310 L250 250 L360 310" fill="none" />
          <path d="M160 325 L250 270 L340 325" fill="none" />
          <path d="M180 340 L250 290 L320 340" fill="none" />
        </g>

        {/* Left wall - soft cream */}
        <motion.path
          d="M100 289 L100 95 C100 90 102 88 105 86 L245 5 C250 2 255 5 255 10 L255 205 C255 208 252 212 248 214 L105 292 C102 294 100 293 100 289 Z"
          fill="url(#wallLeft)"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />

        {/* Right wall - soft pink tint */}
        <motion.path
          d="M255 205 L255 10 C255 5 260 2 265 5 L395 86 C398 88 400 90 400 95 L400 289 C400 293 398 294 395 292 L262 214 C258 212 255 208 255 205 Z"
          fill="url(#wallRight)"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />

        {/* ===== COZY RUG ===== */}
        <motion.ellipse
          cx="250"
          cy="320"
          rx="90"
          ry="45"
          fill="url(#rugGradient)"
          opacity="0.7"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.ellipse
          cx="250"
          cy="320"
          rx="70"
          ry="35"
          fill="#f0c8d8"
          opacity="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        />

        {/* ===== WINDOW ON LEFT WALL ===== */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          filter="url(#shadow)"
        >
          {/* Window frame */}
          <path
            d="M130 180 L130 100 L190 65 L190 145 Z"
            fill="#fff"
            stroke="#e8d4c8"
            strokeWidth="4"
          />
          {/* Window panes */}
          <path d="M135 175 L135 140 L155 127 L155 162 Z" fill="#c8e6f5" opacity="0.6" />
          <path d="M160 159 L160 124 L185 109 L185 144 Z" fill="#c8e6f5" opacity="0.6" />
          <path d="M135 135 L135 105 L155 92 L155 122 Z" fill="#b8ddf0" opacity="0.6" />
          <path d="M160 119 L160 89 L185 74 L185 104 Z" fill="#b8ddf0" opacity="0.6" />
          {/* Curtain */}
          <path
            d="M125 105 Q120 130 125 155 L130 155 Q132 130 130 105 Z"
            fill="#f4d4e0"
            opacity="0.8"
          />
          <path
            d="M190 70 Q195 95 190 120 L185 120 Q187 95 185 70 Z"
            fill="#f4d4e0"
            opacity="0.8"
          />
        </motion.g>

        {/* ===== CUTE WALL ART ===== */}

        {/* Left wall - rainbow art */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          filter="url(#shadow)"
        >
          <path
            d="M145 235 L145 195 L195 168 L195 208 Z"
            fill="#fff"
            stroke="#e0c8d8"
            strokeWidth="2"
            rx="3"
          />
          {/* Rainbow arcs */}
          <path d="M155 220 Q170 195 185 220" stroke="#f59f80" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M158 215 Q170 195 182 215" stroke="#e1889f" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M161 210 Q170 195 179 210" stroke="#a07cc3" strokeWidth="2" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* Right wall - ABC poster */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          filter="url(#shadow)"
        >
          <path
            d="M310 150 L310 95 L365 125 L365 180 Z"
            fill="#fff8f0"
            stroke="#f0d8c8"
            strokeWidth="2"
          />
          <text x="325" y="135" fontSize="16" fill="#a07cc3" fontWeight="bold" fontFamily="Comic Sans MS, cursive">A</text>
          <text x="340" y="150" fontSize="16" fill="#e1889f" fontWeight="bold" fontFamily="Comic Sans MS, cursive">B</text>
          <text x="330" y="168" fontSize="16" fill="#f59f80" fontWeight="bold" fontFamily="Comic Sans MS, cursive">C</text>
        </motion.g>

        {/* Right wall - heart drawing */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          filter="url(#shadow)"
        >
          <path
            d="M280 220 L280 180 L320 200 L320 240 Z"
            fill="#fff"
            stroke="#f0c8d8"
            strokeWidth="2"
          />
          {/* Cute heart */}
          <path
            d="M295 205 C290 200 285 205 290 215 C292 218 295 220 298 222 C301 220 304 218 306 215 C311 205 306 200 301 205 C299 207 298 208 298 208 C298 208 297 207 295 205 Z"
            fill="#e1889f"
          />
        </motion.g>

        {/* ===== STRING LIGHTS ===== */}

        {/* Wire across walls */}
        <motion.path
          d="M115 85 Q150 95 180 80 Q210 65 240 75 Q270 85 300 70 Q330 55 360 70 Q380 80 390 75"
          stroke="#967259"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        />

        {/* Animated string light bulbs */}
        {[
          { cx: 130, cy: 90, color: '#ffb3c6', delay: 0 },
          { cx: 155, cy: 85, color: '#c8a2c8', delay: 0.2 },
          { cx: 180, cy: 78, color: '#ffd1a3', delay: 0.4 },
          { cx: 210, cy: 72, color: '#b8d4e8', delay: 0.6 },
          { cx: 240, cy: 76, color: '#ffb3c6', delay: 0.8 },
          { cx: 270, cy: 80, color: '#c8a2c8', delay: 1.0 },
          { cx: 300, cy: 70, color: '#ffd1a3', delay: 1.2 },
          { cx: 330, cy: 62, color: '#b8d4e8', delay: 1.4 },
          { cx: 360, cy: 70, color: '#ffb3c6', delay: 1.6 },
          { cx: 385, cy: 76, color: '#c8a2c8', delay: 1.8 },
        ].map((light, i) => (
          <motion.g key={i} filter="url(#softGlow)">
            {/* Bulb glow */}
            <motion.circle
              cx={light.cx}
              cy={light.cy}
              r="10"
              fill={light.color}
              opacity="0.4"
              animate={{
                opacity: [0.2, 0.6, 0.2],
                r: [8, 12, 8],
              }}
              transition={{
                duration: 2.5,
                delay: light.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Bulb body */}
            <motion.circle
              cx={light.cx}
              cy={light.cy}
              r="6"
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
            {/* Bulb cap */}
            <rect x={light.cx - 3} y={light.cy - 10} width="6" height="5" rx="1" fill="#967259" />
            {/* Highlight */}
            <circle cx={light.cx - 2} cy={light.cy - 2} r="2" fill="#fff" opacity="0.7" />
          </motion.g>
        ))}

        {/* ===== COZY BOOKSHELF ===== */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          filter="url(#shadow)"
        >
          {/* Shelf back */}
          <path d="M105 280 L105 200 L135 183 L135 263 Z" fill="#e8d4c4" />
          <path d="M105 280 L135 263 L160 278 L130 295 Z" fill="#f0e0d4" />
          <path d="M135 263 L135 183 L160 198 L160 278 Z" fill="#dcc8b8" />

          {/* Shelf divider */}
          <path d="M108 238 L138 221 L158 236 L128 253 Z" fill="#d4c0b0" />

          {/* Books - top shelf */}
          <rect x="112" y="205" width="8" height="28" rx="1" fill="#a07cc3" transform="skewY(-30)" />
          <rect x="122" y="200" width="6" height="32" rx="1" fill="#e1889f" transform="skewY(-30)" />
          <rect x="130" y="202" width="7" height="30" rx="1" fill="#f59f80" transform="skewY(-30)" />
          <rect x="139" y="198" width="8" height="34" rx="1" fill="#fcccba" transform="skewY(-30)" />

          {/* Books - bottom shelf */}
          <rect x="112" y="248" width="10" height="22" rx="1" fill="#dccbeb" transform="skewY(-30)" />
          <rect x="124" y="244" width="8" height="26" rx="1" fill="#c8a2c8" transform="skewY(-30)" />
          <rect x="134" y="246" width="6" height="24" rx="1" fill="#f4d4e0" transform="skewY(-30)" />

          {/* Cute plant on shelf */}
          <ellipse cx="150" cy="230" rx="8" ry="5" fill="#d4a574" />
          <ellipse cx="150" cy="228" rx="6" ry="4" fill="#5a8f5a" />
          <path d="M150 225 Q145 218 148 210" stroke="#5a8f5a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M150 225 Q155 215 153 208" stroke="#6aa86a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="148" cy="210" rx="5" ry="7" fill="#7cb87c" />
          <ellipse cx="154" cy="207" rx="4" ry="6" fill="#8ec88e" />
        </motion.g>

        {/* ===== CUTE TEACHER DESK ===== */}
        <motion.g
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          filter="url(#shadow)"
        >
          {/* Desk top - rounded feel */}
          <path
            d="M320 310 Q310 305 310 305 L360 280 Q370 278 375 282 L335 335 Q330 338 325 335 Z"
            fill="#f5e6d8"
          />
          {/* Desk front panel */}
          <path
            d="M310 305 L310 345 Q312 350 320 348 L325 335 Q330 338 335 335 L335 295 Z"
            fill="#e8d4c4"
          />
          {/* Desk side */}
          <path
            d="M335 295 L335 335 Q330 338 325 335 L325 348 Q330 350 340 345 L375 322 Q380 318 380 312 L375 282 Q370 278 360 280 Z"
            fill="#dcc8b8"
          />
          {/* Drawer */}
          <path d="M315 315 L315 335 L330 328 L330 308 Z" fill="#d4c0b0" stroke="#c4b0a0" strokeWidth="1" />
          <circle cx="322" cy="320" r="2" fill="#967259" />

          {/* Apple on desk */}
          <ellipse cx="345" cy="288" rx="10" ry="9" fill="#e74c3c" />
          <ellipse cx="343" cy="286" rx="3" ry="2" fill="#ff6b5b" opacity="0.6" />
          <path d="M345 280 Q348 276 350 278" stroke="#5a8f5a" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="350" cy="277" rx="3" ry="2" fill="#7cb87c" />

          {/* Pencil cup */}
          <ellipse cx="365" cy="290" rx="8" ry="5" fill="#a07cc3" />
          <path d="M357 290 L357 275 Q357 272 365 272 Q373 272 373 275 L373 290" fill="#a07cc3" />
          <ellipse cx="365" cy="275" rx="8" ry="4" fill="#b08cd3" />
          {/* Pencils */}
          <rect x="360" y="258" width="3" height="18" rx="1" fill="#ffd93d" />
          <rect x="365" y="260" width="3" height="16" rx="1" fill="#e1889f" />
          <rect x="369" y="262" width="3" height="14" rx="1" fill="#6bcb77" />
        </motion.g>

        {/* ===== CUTE FLOOR PLANT ===== */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          filter="url(#shadow)"
        >
          {/* Pot */}
          <ellipse cx="385" cy="335" rx="18" ry="10" fill="#e1889f" />
          <path d="M367 335 L370 310 Q370 305 385 305 Q400 305 400 310 L403 335" fill="#e1889f" />
          <ellipse cx="385" cy="310" rx="15" ry="6" fill="#f0a0b8" />
          <ellipse cx="385" cy="312" rx="12" ry="5" fill="#6a9a6a" />

          {/* Plant leaves - monstera style */}
          <path d="M385 310 Q375 290 365 275" stroke="#5a8f5a" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M385 310 Q395 285 405 270" stroke="#6aa86a" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M385 310 Q380 280 385 260" stroke="#5a8f5a" strokeWidth="4" fill="none" strokeLinecap="round" />

          <ellipse cx="365" cy="272" rx="12" ry="16" fill="#7cb87c" />
          <ellipse cx="405" cy="267" rx="11" ry="15" fill="#8ec88e" />
          <ellipse cx="385" cy="257" rx="14" ry="18" fill="#6aa86a" />

          {/* Leaf details */}
          <path d="M365 280 L365 265" stroke="#5a8f5a" strokeWidth="1" opacity="0.5" />
          <path d="M405 275 L405 260" stroke="#6aa86a" strokeWidth="1" opacity="0.5" />
          <path d="M385 270 L385 250" stroke="#5a8f5a" strokeWidth="1" opacity="0.5" />
        </motion.g>

        {/* ===== SMALL READING CHAIR ===== */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          filter="url(#shadow)"
        >
          {/* Chair cushion */}
          <ellipse cx="200" cy="345" rx="25" ry="12" fill="#c8a2c8" />
          <ellipse cx="200" cy="342" rx="22" ry="10" fill="#d4b2d4" />
          {/* Chair back */}
          <path
            d="M178 345 Q175 335 180 320 Q190 305 200 305 Q210 305 220 320 Q225 335 222 345"
            fill="#c8a2c8"
          />
          <path
            d="M182 340 Q180 332 184 322 Q192 310 200 310 Q208 310 216 322 Q220 332 218 340"
            fill="#d4b2d4"
          />
          {/* Cute cushion on chair */}
          <ellipse cx="200" cy="335" rx="12" ry="8" fill="#f59f80" />
          <ellipse cx="198" cy="333" rx="4" ry="3" fill="#ffb090" opacity="0.6" />
        </motion.g>

        {/* ===== GLOBE ON STAND ===== */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          filter="url(#shadow)"
        >
          {/* Stand base */}
          <ellipse cx="140" cy="355" rx="12" ry="6" fill="#d4a574" />
          {/* Stand pole */}
          <rect x="138" y="325" width="4" height="30" fill="#c49a6c" />
          {/* Globe ring */}
          <ellipse cx="140" cy="310" rx="18" ry="4" fill="#d4a574" stroke="#c49a6c" strokeWidth="1" />
          {/* Globe */}
          <circle cx="140" cy="305" r="16" fill="#87ceeb" />
          <ellipse cx="135" cy="302" rx="6" ry="8" fill="#7cb87c" />
          <ellipse cx="145" cy="308" rx="5" ry="6" fill="#6aa86a" />
          <ellipse cx="140" cy="298" rx="4" ry="3" fill="#fff" opacity="0.3" />
        </motion.g>

      </svg>
    </div>
  );
};

export default IsometricClassroom;
