'use client';

import TeacherBio from '@/components/TeacherBio';
import ModernSection from '@/components/ModernSection';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, BookOpen, ExternalLink } from 'lucide-react';

const education = [
  {
    degree: 'Doctor of Education (Ed.D.) in Educational Leadership',
    school: 'University of Southern California (USC) – Rossier School of Education',
    year: 'Expected May 2026',
    gpa: '4.00/4.00',
    inProgress: true,
  },
  {
    degree: 'Master of Education (M.Ed.) in Global Education',
    school: 'Arizona State University (ASU) – Mary Lou Fulton Teachers College',
    year: 'December 2021',
    gpa: '4.00/4.00',
  },
  {
    degree: 'Bachelor of Arts (BA) in Elementary Education',
    school: 'Arizona State University (ASU) – Mary Lou Fulton Teachers College',
    year: 'May 2020',
    gpa: '3.95/4.00',
  },
];

const experience = [
  {
    title: 'Transformational Teacher Leader',
    school: 'ASU Preparatory Academy - South Phoenix',
    location: 'Phoenix, AZ',
    period: 'July 2025 – Present',
    highlights: [
      'Leading instructional coaching and professional development initiatives',
      'Supporting teacher growth through data-informed feedback and collaborative planning',
    ],
  },
  {
    title: '5th & 6th Grade Teacher',
    school: 'Innovations Academy',
    location: 'San Diego, CA',
    period: 'July 2022 – June 2025',
    highlights: [
      'Designed and facilitated interdisciplinary, project-based learning experiences',
      'Supported students through authentic assessments and student-led demonstrations of learning',
    ],
  },
  {
    title: '4th, 5th & 6th Grade Teacher',
    school: 'Kyrene De Las Manitas',
    location: 'Tempe, AZ',
    period: 'August 2019 – May 2022',
    highlights: [
      'Designed and delivered differentiated lessons for multi-grade upper elementary students',
      'ELA Team Lead, coordinating curriculum development and professional learning',
    ],
  },
];

const credentials = [
  'AZ Standard Professional Elementary K-8 Teaching Credential',
  'California Administrative Services Credential (In Progress)',
  'Clear CA Multiple Subject Teaching Credential (Expected 2025)',
  'Crosscultural, Language, and Academic Development Certificate',
  'Crisis Prevention Institute (CPI) Blue Card',
];

const professionalLearning = [
  { name: 'Marzano Resources Supporting Beginning Teachers Workshop', year: '2025' },
  { name: 'San Diego County of Education Targeted Feedback Institute', year: '2025' },
  { name: 'Corwin Teacher Clarity Conference', year: '2025' },
  { name: 'Youcubed Math Curriculum at Stanford University Workshop', year: '2023' },
  { name: 'Next Gen Education Workforce National Conference Presenter', year: '2020' },
];

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 md:py-16"
    >
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-lavender via-white to-lavender/30" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-dustyRose/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-black mb-3">
            Meet the Teacher
          </h1>
          <p className="text-gray text-lg max-w-2xl mx-auto">
            Passionate about empowering young learners through innovative teaching
          </p>
        </motion.div>

        {/* Teacher Bio Card */}
        <TeacherBio />

        {/* Content Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ModernSection title="Education" icon={GraduationCap} variant="glass">
              <div className="space-y-5">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-purple/30">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-black text-sm leading-tight">
                        {edu.degree}
                      </h3>
                      {edu.inProgress && (
                        <span className="shrink-0 px-2 py-0.5 bg-coral/20 text-coral text-xs rounded-full font-medium">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray mt-1">{edu.school}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray">
                      <span>{edu.year}</span>
                      <span className="text-purple font-medium">GPA: {edu.gpa}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ModernSection>
          </motion.div>

          {/* Teaching Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ModernSection title="Experience" icon={Briefcase} variant="glass">
              <div className="space-y-5">
                {experience.map((exp, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-dustyRose/30">
                    <h3 className="font-semibold text-black text-sm">{exp.title}</h3>
                    <p className="text-purple text-sm font-medium">{exp.school}</p>
                    <p className="text-xs text-gray mt-0.5">
                      {exp.location} • {exp.period}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="text-xs text-gray flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-coral mt-1.5 shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ModernSection>
          </motion.div>

          {/* Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ModernSection title="Credentials" icon={Award} variant="gradient">
              <ul className="space-y-2">
                {credentials.map((cred, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-purple/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-3 h-3 text-purple" />
                    </div>
                    <span className="text-black/80">{cred}</span>
                  </li>
                ))}
              </ul>
            </ModernSection>
          </motion.div>

          {/* Professional Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ModernSection title="Professional Learning" icon={BookOpen} variant="gradient">
              <ul className="space-y-2">
                {professionalLearning.map((item, index) => (
                  <li key={index} className="flex items-start justify-between gap-2 text-sm">
                    <span className="text-black/80">{item.name}</span>
                    <span className="text-purple font-medium shrink-0">{item.year}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://www.youtube.com/watch?v=8vMVr_R8yA4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-sm text-dustyRose hover:text-purple transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Watch Conference Presentation
              </a>
            </ModernSection>
          </motion.div>
        </div>

        {/* Teaching Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-r from-purple to-dustyRose rounded-2xl p-8 text-white">
            <h2 className="font-heading text-2xl md:text-3xl mb-4">Teaching Philosophy</h2>
            <p className="text-white/90 leading-relaxed">
              My teaching philosophy centers on creating a warm, inclusive environment where every
              child feels safe to take risks and grow. I believe in hands-on, engaging learning
              experiences that spark curiosity and foster a lifelong love of discovery. Through
              project-based learning and authentic assessments, I empower students to take
              ownership of their education. Every student has unique gifts, and my goal is to
              help each one shine!
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
