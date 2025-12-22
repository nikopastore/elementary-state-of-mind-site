export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
  images?: string[];
  category: 'classroom' | 'tips' | 'resources' | 'personal';
};

export const posts: Post[] = [
  {
    slug: 'turning-novel-study-into-mock-trial',
    title: 'Turning a Novel Study Into a Mock Trial: Teaching Reading, Evidence, and Critical Thinking Through Play',
    excerpt: 'Real readers reread. They argue. They defend ideas with evidence. That\'s precisely what a mock trial allows students to do. Learn how to transform your next novel study into an engaging courtroom experience.',
    content: `
# Turning a Novel Study Into a Mock Trial: Teaching Reading, Evidence, and Critical Thinking Through Play

## The Problem With Traditional Novel Studies

So many novel studies focus on:

- Worksheets
- Isolated comprehension questions
- One-and-done discussions

But real readers reread.
They argue.
They defend ideas with evidence.

That's precisely what a mock trial allows students to do.

## Why Mock Trials Work for ELA

Mock trials naturally embed:

- Close reading
- Evidence collection
- Argument writing
- Speaking & listening
- Collaboration

Students aren't just answering questions — they're *using the text for a purpose*.

## How We Did It

After reading *Space Case*, students:

1. Identified suspects
2. Tracked textual evidence
3. Took on roles (lawyers, witnesses, judge, jury)
4. Prepared arguments using direct quotes
5. Presented and defended their claims

## The Evidence-Based Practices Behind the Fun

While it felt like play, the learning was intentional:

- Explicit modeling of citing evidence
- Repeated rereading of complex passages
- Academic discussion and oral rehearsal
- Authentic assessment

Engagement wasn't a distraction — it was the vehicle.

## What I Noticed as a Teacher

- Reluctant readers participated
- Students *wanted* to reread
- Discussions were deeper
- Evidence mattered

The classroom energy was focused, joyful, and purposeful.

## Why Engagement Changes Everything

When students care about the outcome, they care about the text.
When learning feels meaningful, rigor rises naturally.

That's the power of teaching through play.

## Teacher Takeaway

If you're looking for ways to:

- Increase reading stamina
- Deepen comprehension
- Make evidence meaningful

Consider turning your next novel study into an experience.

## Want to Try It?

After teachers kept asking for our materials, I created the **Space Case Mock Trial** resource so others could bring this experience into their classrooms.

[View the Space Case Mock Trial Resource](/shop) | [Browse All Resources](/shop)
    `.trim(),
    date: '2025-12-22',
    category: 'classroom',
    images: [
      '/blog/mock-trial-1.jpg',
      '/blog/mock-trial-2.jpg',
      '/blog/mock-trial-3.jpg',
      '/blog/mock-trial-4.jpg',
    ],
  },
  {
    slug: 'what-is-an-elementary-state-of-mind',
    title: 'What Is an Elementary State of Mind? (And Why It Matters More Than Ever)',
    excerpt: 'Elementary State of Mind started as a mindset long before it became a website, a shop, or a brand. It was born in those moments when I looked around my classroom and thought, there has to be a way to teach deeply, meet standards, and still let kids be kids.',
    content: `
# What Is an Elementary State of Mind? (And Why It Matters More Than Ever)

Elementary State of Mind started as a mindset long before it became a website, a shop, or a brand. It was born in those moments when I looked around my classroom and thought, *there has to be a way to teach deeply, meet standards, and still let kids be kids.*

An elementary state of mind isn't about doing less.
It's about teaching **with intention, imagination, and heart**.

## Why This Matters

Today's classrooms are full of contradictions. We're asked to increase rigor, follow scripted programs, analyze data constantly — all while nurturing creativity, social-emotional growth, and joy.

Teachers are burning out not because they don't care, but because they care *deeply*.

Elementary State of Mind exists to bridge that gap.

## What an Elementary State of Mind Means to Me

At its core, ESOM is built on a few beliefs:

- **Joy and rigor are not opposites**
- **Play is a pathway to deep learning**
- **Students deserve voice, choice, and creativity**
- **Teachers deserve resources that trust their professionalism**
- **Engagement is not extra — it's essential**

An elementary state of mind honors how children actually learn — through curiosity, movement, discussion, storytelling, and meaningful work.

## What This Looks Like in Real Classrooms

It looks like students rereading a text not because they were told to, but because they *need* evidence to prove their case.

It looks like anchor charts covered in kid language.

It looks like productive noise, collaboration, and pride.

## Why Elementary Teachers Need This Space

So often, teaching resources are either:

- Too rigid, or
- Too fluffy

Elementary State of Mind is where **evidence-based instruction meets imagination**.

Everything here is:

- Classroom-tested
- Flexible
- Designed to make learning stick *and* feel good

## What You'll Find Here

- Engaging ELA & PBL resources
- Ideas rooted in best practice
- Real classroom stories
- Tools that support teacher sustainability

If you're a teacher who wants your classroom to feel alive again — you're in the right place.
    `.trim(),
    date: '2025-12-21',
    category: 'personal',
  },
];
