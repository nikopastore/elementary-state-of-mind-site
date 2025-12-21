'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Sparkles } from 'lucide-react';

const TeacherBio: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl md:rounded-3xl shadow-soft overflow-hidden"
      >
        {/* Header gradient */}
        <div className="h-24 md:h-32 bg-gradient-to-r from-purple via-dustyRose to-coral" />

        {/* Profile section */}
        <div className="relative px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
          {/* Profile image */}
          <div className="absolute -top-12 md:-top-16 left-4 sm:left-6 md:left-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple to-dustyRose rounded-full blur-md opacity-50 scale-105" />
              <Image
                src="/profile.png"
                alt="Zoe Glover"
                width={128}
                height={128}
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div className="pt-14 md:pt-20">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
              <div>
                <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl text-black mb-1">
                  Zoe Glover
                </h1>
                <p className="text-purple font-semibold text-base md:text-lg">
                  Teacher, Leader, Lifelong Learner
                </p>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                <span className="inline-flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 bg-lightPurple/50 text-purple rounded-full text-xs md:text-sm font-medium">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Phoenix, AZ
                </span>
                <span className="inline-flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 bg-peach/50 text-coral rounded-full text-xs md:text-sm font-medium">
                  <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Ed.D. Candidate
                </span>
              </div>
            </div>

            {/* Bio text */}
            <p className="mt-4 md:mt-6 text-gray leading-relaxed text-sm md:text-base lg:text-lg">
              Welcome to Elementary State of Mind! I&apos;m a Transformational Teacher Leader at
              ASU Preparatory Academy, currently pursuing my Doctorate in Educational Leadership
              at USC. With experience teaching 4th-6th grade and a deep commitment to project-based
              learning, instructional coaching, and EdTech integration, I create resources that make
              learning engaging and meaningful. I&apos;m passionate about empowering both students
              and teachers to grow!
            </p>

            {/* Expertise tags */}
            <div className="mt-4 md:mt-6 flex flex-wrap gap-1.5 md:gap-2">
              {['Project-Based Learning', 'EdTech Integration', 'Instructional Leadership', 'Data-Informed Practice'].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 bg-lavender/50 text-black/70 rounded-md md:rounded-lg text-xs md:text-sm"
                >
                  <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-purple" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherBio;
