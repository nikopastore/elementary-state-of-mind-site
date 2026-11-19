import TeacherBio from '@/components/TeacherBio';
import { Award } from 'lucide-react';
import { faqs } from '@/lib/faqs';

export const districtTeacherAward = '2026 ASU Prep District Teacher of the Year';

const education = [
  {
    degree: 'Doctor of Education (Ed.D.) in Educational Leadership',
    school: 'University of Southern California (USC) - Rossier School of Education',
    year: 'Completed',
    gpa: '4.00/4.00',
  },
  {
    degree: 'Master of Education (M.Ed.) in Global Education',
    school: 'Arizona State University (ASU) - Mary Lou Fulton Teachers College',
    year: 'December 2021',
    gpa: '4.00/4.00',
  },
  {
    degree: 'Bachelor of Arts (BA) in Elementary Education',
    school: 'Arizona State University (ASU) - Mary Lou Fulton Teachers College',
    year: 'May 2020',
    gpa: '3.95/4.00',
  },
];

const experience = [
  {
    title: 'Sixth-Grade Transformational Teacher Leader',
    school: 'ASU Preparatory Academy - South Phoenix',
    location: 'Phoenix, AZ',
    period: 'July 2025 - Present',
    highlights: [
      districtTeacherAward,
      'Leading instructional coaching and professional development initiatives',
      'Supporting teacher growth through data-informed feedback and collaborative planning',
    ],
  },
  {
    title: '5th & 6th Grade Teacher',
    school: 'Innovations Academy',
    location: 'San Diego, CA',
    period: 'July 2022 - June 2025',
    highlights: [
      'Designed and facilitated interdisciplinary, project-based learning experiences',
      'Supported students through authentic assessments and student-led demonstrations of learning',
    ],
  },
  {
    title: '3rd-6th Grade Teacher',
    school: 'Kyrene De Las Manitas',
    location: 'Tempe, AZ',
    period: 'August 2019 - May 2022',
    highlights: [
      'Designed and delivered differentiated lessons for multi-grade upper elementary students',
      'ELA Team Lead, coordinating curriculum development and professional learning',
    ],
  },
];

const credentials = [
  districtTeacherAward,
  'AZ Standard Professional Elementary K-8 Teaching Credential',
  'California Administrative Services Credential (In Progress)',
  'California Multiple Subject Teaching Credential',
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

export default function AboutPageClient() {
  return (
    <div className="site-width content-page">
      <div className="page-title">
        <h1>Meet the Teacher</h1>
        <p>Passionate about empowering young learners through innovative teaching</p>
      </div>
      <TeacherBio />
      <section className="award-showcase" id="teacher-of-the-year" aria-labelledby="district-award-title" data-reveal="panel">
        <div className="award-intro">
          <Award className="award-icon" aria-hidden="true" />
          <p>ASU Preparatory Academy · 2026</p>
          <h2 id="district-award-title">District Teacher of the Year</h2>
        </div>
        <div className="award-story">
          <p>Dr. Zoe Pastore teaches sixth grade and coaches fellow educators at ASU Prep South Phoenix. In its finalist profile, ASU Prep highlighted her <em>New Kid</em> novel study, where students talked about belonging and identity and returned to the text to support their interpretations.</p>
          <p>As a Transformational Teacher Leader, she works with colleagues to use student work and assessment data to plan lessons, try instructional strategies, and review what helped students learn.</p>
          <div className="award-sources">
            <a className="product-link" href="https://www.asuprepdigital.org/blog/meet-the-asu-prep-2026-teacher-of-the-year-finalists/">ASU Prep finalist profile</a>
            <a className="product-link" href="https://asuprep.asu.edu/news/asu-prep-south-phoenix-k-6-celebrates-transformational-teacher-leaders/">ASU Prep teacher leadership profile</a>
          </div>
        </div>
      </section>
      <div className="about-columns">
        <section className="about-section" data-reveal="heading">
          <h2>Education</h2>
          {education.map(({ degree, school, year, gpa }) => (
            <div className="about-record" key={degree}>
              <h3>{degree}</h3>
              <p>{school}</p>
              <p className="record-detail">{year} · GPA: {gpa}</p>
            </div>
          ))}
        </section>
        <section className="about-section" data-reveal="heading">
          <h2>Experience</h2>
          {experience.map(({ title, school, location, period, highlights }) => (
            <div className="about-record" key={school}>
              <h3>{title}</h3>
              <p>{school}</p>
              <p className="record-detail">{location} · {period}</p>
              <ul>{highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            </div>
          ))}
        </section>
        <section className="about-section" data-reveal="heading">
          <h2>Credentials &amp; Honors</h2>
          <ul className="about-list">{credentials.map((credential) => <li key={credential}>{credential}</li>)}</ul>
        </section>
        <section className="about-section" data-reveal="heading">
          <h2>Professional Learning</h2>
          <ul className="about-list">{professionalLearning.map(({ name, year }) => <li key={name}>{name} · {year}</li>)}</ul>
        </section>
      </div>
      <section className="about-section teaching-philosophy" data-reveal="panel">
        <h2>Teaching Philosophy</h2>
        <p>My teaching philosophy is rooted in the belief that meaningful learning happens when students feel safe, curious, and genuinely engaged. I design learning experiences that blend structure with creativity, allowing students to explore big ideas through hands-on, inquiry-driven work. Through project-based learning, authentic assessments, and intentional reflection, students build both academic skills and confidence in their own thinking.</p>
        <p>I believe classrooms should be places where curiosity is honored, mistakes are celebrated as part of growth, and every child is empowered to take ownership of their learning. Each student brings unique strengths and perspectives, and my role as an educator is to design environments where those gifts can emerge, develop, and shine.</p>
      </section>
      <section className="about-section" data-reveal="heading">
        <h2>Frequently Asked Questions</h2>
        {faqs.map(({ question, answer }) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
