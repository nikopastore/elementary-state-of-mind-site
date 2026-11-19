import Image from 'next/image';
import { GraduationCap } from 'lucide-react';

export default function TeacherBio() {
  return (
    <div className="teacher-bio" data-reveal="panel">
      <div className="teacher-portrait-wrap" data-parallax="-12">
        <div className="teacher-portrait">
          <Image
            src="/profile.png"
            alt="Dr. Zoe Pastore"
            fill
            priority
            sizes="(max-width: 700px) 80vw, 360px"
          />
        </div>
        <span className="teacher-degree-badge">
          <GraduationCap size={14} aria-hidden="true" />
          <span>Ed.D. · USC Rossier</span>
        </span>
      </div>

      <div className="teacher-copy">
        <span className="section-kicker">Educator &amp; Creator</span>
        <h2>Dr. Zoe Pastore</h2>
        <p className="teacher-role">Teacher, Leader, Lifelong Learner</p>
        <p className="teacher-detail">
          Phoenix, AZ <span>·</span> Ed.D.
        </p>
        <p>
          Welcome to Elementary State of Mind! I&apos;m a sixth-grade teacher
          and Transformational Teacher Leader at ASU Preparatory Academy. I
          earned my Doctor of Education in Educational Leadership at USC. With
          experience teaching 3rd-6th grade and a deep commitment to
          project-based learning, instructional coaching, and EdTech
          integration, I create resources that make learning engaging and
          meaningful. I&apos;m passionate about empowering both students and
          teachers to grow!
        </p>
        <ul className="teacher-expertise">
          {[
            'Project-Based Learning',
            'EdTech Integration',
            'Instructional Leadership',
            'Data-Informed Practice',
          ].map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
