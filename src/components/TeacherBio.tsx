'use client';

import React from 'react';
import { User } from 'lucide-react';
import NotebookSection from './NotebookSection';

const TeacherBio: React.FC = () => {
  return (
    <NotebookSection title="Meet the Teacher">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Image Placeholder Column */}
        <div className="flex justify-center md:justify-start">
          <div className="w-48 h-48 rounded-full bg-sage/20 flex items-center justify-center border-4 border-sage/30">
            <User className="w-16 h-16 text-sage/50" />
            {/* Replace this div with your photo:
            <Image
              src="/your-photo.jpg"
              alt="Teacher photo"
              fill
              className="rounded-full object-cover"
            />
            */}
          </div>
        </div>

        {/* Bio Column */}
        <div className="md:col-span-2">
          <h3 className="font-heading text-3xl text-charcoal mb-2">
            {/* Replace with your name */}
            Your Name Here
          </h3>
          <p className="font-body text-base text-charcoal/80 leading-relaxed">
            {/* Replace with your bio */}
            Welcome to Elementary State of Mind! I&apos;m a passionate elementary teacher dedicated
            to creating engaging, meaningful learning experiences for young minds. My classroom is
            a place where curiosity thrives, creativity flourishes, and every student feels valued.
            I love sharing resources that make teaching more joyful and learning more fun!
          </p>
        </div>
      </div>
    </NotebookSection>
  );
};

export default TeacherBio;
