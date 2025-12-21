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
        className="bg-white rounded-3xl shadow-soft overflow-hidden"
      >
        {/* Header gradient */}
        <div className="h-32 bg-gradient-to-r from-purple via-dustyRose to-coral" />

        {/* Profile section */}
        <div className="relative px-6 md:px-8 pb-8">
          {/* Profile image */}
          <div className="absolute -top-16 left-6 md:left-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple to-dustyRose rounded-full blur-md opacity-50 scale-105" />
              <Image
                src="/profile.png"
                alt="Zoe Glover"
                width={128}
                height={128}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div className="pt-20">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl text-black mb-1">
                  Zoe Glover
                </h1>
                <p className="text-purple font-semibold text-lg">
                  Teacher, Leader, Lifelong Learner
                </p>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-lightPurple/50 text-purple rounded-full text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  San Diego, CA
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-peach/50 text-coral rounded-full text-sm font-medium">
                  <GraduationCap className="w-4 h-4" />
                  Ed.D. Candidate
                </span>
              </div>
            </div>

            {/* Bio text */}
            <p className="mt-6 text-gray leading-relaxed text-lg">
              Welcome to Elementary State of Mind! I&apos;m a passionate upper elementary teacher
              currently pursuing my Doctorate in Educational Leadership at USC. With experience
              teaching 4th-6th grade and a deep commitment to project-based learning and EdTech
              integration, I create resources that make learning engaging and meaningful. My
              classroom is a place where curiosity thrives, creativity flourishes, and every
              student feels empowered to grow!
            </p>

            {/* Expertise tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Project-Based Learning', 'EdTech Integration', 'Instructional Leadership', 'Data-Informed Practice'].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-lavender/50 text-black/70 rounded-lg text-sm"
                >
                  <Sparkles className="w-3 h-3 text-purple" />
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
