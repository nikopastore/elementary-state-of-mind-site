'use client';

import React from 'react';
import Image from 'next/image';
import NotebookSection from './NotebookSection';

const TeacherBio: React.FC = () => {
  return (
    <NotebookSection title="Meet the Teacher">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Image Column */}
        <div className="flex justify-center md:justify-start">
          <div className="w-48 h-48 relative">
            <Image
              src="https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop" 
              alt="Photo of Dr. Evelyn Reed"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>

        {/* Bio Column */}
        <div className="md:col-span-2">
          <h3 className="font-heading text-3xl text-gray-800 mb-2">
            Dr. Evelyn Reed
          </h3>
          <p className="font-body text-base text-gray-700 leading-relaxed">
            Dr. Reed has over 15 years of experience in early childhood education, specializing in 
            inquiry-based learning. With a Ph.D. in Developmental Psychology from Stanford University, 
            she is passionate about creating nurturing environments that foster curiosity and a lifelong 
            love for learning. Her approach combines structured lessons with creative play, ensuring 
            that every child feels seen, heard, and valued. When she's not in the classroom, she enjoys 
            gardening and exploring local hiking trails with her dog, Rusty.
          </p>
        </div>
      </div>
    </NotebookSection>
  );
};

export default TeacherBio;
