'use client';

import TeacherBio from '@/components/TeacherBio';
import NotebookSection from '@/components/NotebookSection';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-cream min-h-screen py-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center text-charcoal mb-12">
          Meet the Teacher
        </h1>

        <TeacherBio />

        <div className="mt-16 space-y-12">
          <NotebookSection title="Teaching Philosophy">
            <p className="text-lg text-charcoal/80 leading-relaxed">
              {/* Replace with your teaching philosophy */}
              My teaching philosophy centers on creating a warm, inclusive environment where every
              child feels safe to take risks and grow. I believe in hands-on, engaging learning
              experiences that spark curiosity and foster a lifelong love of discovery. Every
              student has unique gifts, and my goal is to help each one shine!
            </p>
          </NotebookSection>

          <NotebookSection title="Education & Experience">
            <ul className="list-disc list-inside text-lg text-charcoal/80 leading-relaxed space-y-2">
              {/* Replace with your actual education and experience */}
              <li>Bachelor&apos;s Degree in Elementary Education</li>
              <li>Years of classroom teaching experience</li>
              <li>Passionate about creating engaging learning materials</li>
              <li>Committed to student-centered teaching practices</li>
            </ul>
          </NotebookSection>
        </div>
      </div>
    </motion.div>
  );
}
