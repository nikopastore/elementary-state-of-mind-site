import { Playfair_Display, Newsreader } from 'next/font/google';
import FlipBook, {
  type BookChapterLink,
  type BookPage,
  type BookPageLayout,
} from '@/components/FlipBook';
import { galleryPhotos } from '@/lib/galleryPhotos';
import { products } from '@/lib/products';

const bookDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-book-display',
  display: 'swap',
});

const bookSerif = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-book-serif',
  display: 'swap',
});

interface PageSelection {
  title: string;
  subtitle?: string;
  chapter: string;
  layout: BookPageLayout;
  photos: {
    id: string;
    caption: string;
    objectPosition?: string;
  }[];
}

const selections: PageSelection[] = [
  {
    title: 'A classroom courtroom',
    subtitle: 'Opening day of the lunar mystery mock trial',
    chapter: 'Chapter I · Space Case Mock Trial',
    layout: 'hero-plate',
    photos: [
      {
        id: 'space-case-8',
        caption:
          'Evidence packets are spread across the tables beneath the projected mock trial slides.',
        objectPosition: '50% 45%',
      },
    ],
  },
  {
    title: 'Evidence on the table',
    subtitle: 'Case files and illustrated clues laid out for investigation',
    chapter: 'Chapter I · Space Case Mock Trial',
    layout: 'asymmetric-duo',
    photos: [
      {
        id: 'space-case-6',
        caption: 'Illustrated evidence cards fan out beside a case-file cover.',
      },
      {
        id: 'space-case-7',
        caption:
          'A closer view of the case file and the evidence arranged for students.',
      },
    ],
  },
  {
    title: 'Making a claim',
    subtitle: 'Sorting notes into structured arguments',
    chapter: 'Chapter I · Space Case Mock Trial',
    layout: 'staggered-vertical',
    photos: [
      {
        id: 'space-case-1',
        caption:
          'A student sorts handwritten notes under claim, evidence, and reasoning.',
      },
      {
        id: 'space-case-2',
        caption:
          'Another case worksheet uses sticky notes to organize the argument.',
      },
    ],
  },
  {
    title: 'Comparing arguments',
    subtitle: 'Weighing details across student notebooks',
    chapter: 'Chapter I · Space Case Mock Trial',
    layout: 'wide-over-detail',
    photos: [
      {
        id: 'space-case-3',
        caption:
          'Notes on the case fill the evidence columns of a student worksheet.',
        objectPosition: '50% 42%',
      },
      {
        id: 'space-case-4',
        caption:
          'A second worksheet shows how a student linked evidence to their reasoning.',
      },
    ],
  },
  {
    title: 'From notes to a case',
    subtitle: 'Handwritten planning before stepping to the podium',
    chapter: 'Chapter I · Space Case Mock Trial',
    layout: 'editorial-feature',
    photos: [
      {
        id: 'space-case-5',
        caption:
          'Handwritten evidence and reasoning sit together on a completed mock trial planning sheet.',
      },
    ],
  },
  {
    title: 'Setting the scene',
    subtitle: 'Transforming desks into a working courtroom',
    chapter: 'Chapter I · Space Case Mock Trial',
    layout: 'landscape-pair',
    photos: [
      {
        id: 'space-case-9',
        caption:
          'The classroom is arranged for the trial, with materials laid out around the room.',
      },
      {
        id: 'space-case-11',
        caption:
          'A projected title and printed case materials set the scene for the mock trial.',
      },
    ],
  },
  {
    title: 'Trial day',
    subtitle: 'Every voice at the center of the room',
    chapter: 'Chapter I · Space Case Mock Trial',
    layout: 'cinema-spread',
    photos: [
      {
        id: 'space-case-10',
        caption:
          'Students gather around the display during the classroom mock trial.',
      },
      {
        id: 'space-case-12',
        caption:
          'The trial screen sits behind tables laid out with the class materials.',
      },
    ],
  },
  {
    title: 'A table for Friendsgiving',
    subtitle: 'Shared gratitude around a decorated classroom table',
    chapter: 'Chapter II · Classroom Friendsgiving',
    layout: 'chapter-opener-duo',
    photos: [
      {
        id: 'friendsgiving-1',
        caption:
          'The classroom is set for a shared celebration, with papers at each place.',
        objectPosition: '50% 55%',
      },
      {
        id: 'friendsgiving-2',
        caption:
          'Friendsgiving guests gather around a green-covered classroom table.',
      },
    ],
  },
  {
    title: 'From a scene to a song',
    subtitle: 'Pairing visual art with close reading and lyrics',
    chapter: 'Chapter III · Behind the Beat',
    layout: 'offset-duo',
    photos: [
      {
        id: 'kpop-1',
        caption:
          'A scene analysis page pairs a drawing with claim, evidence, and reasoning.',
      },
      {
        id: 'kpop-2',
        caption:
          'A song analysis page uses the same structure to organize a student’s ideas.',
      },
    ],
  },
  {
    title: 'Listening with evidence',
    subtitle: 'Color-coded annotations and musical interpretation',
    chapter: 'Chapter III · Behind the Beat',
    layout: 'diagonal-balance',
    photos: [
      {
        id: 'kpop-3',
        caption: 'Color-coded notes fill the song analysis worksheet.',
      },
      {
        id: 'kpop-4',
        caption:
          'A second student’s worksheet uses the same evidence prompts for their interpretation.',
        objectPosition: '50% 40%',
      },
    ],
  },
  {
    title: 'A scene under the lens',
    subtitle: 'Illustration and written analysis in harmony',
    chapter: 'Chapter III · Behind the Beat',
    layout: 'closing-plate',
    photos: [
      {
        id: 'kpop-5',
        caption:
          'A colored scene illustration sits above the student’s written evidence and reasoning.',
      },
    ],
  },
];

const chapters: BookChapterLink[] = [
  {
    numeral: 'I',
    title: 'Space Case Mock Trial',
    subtitle: 'Courtroom debates, case files & CER notes',
    targetPage: 1,
  },
  {
    numeral: 'II',
    title: 'Classroom Friendsgiving',
    subtitle: 'Community, gratitude & shared tables',
    targetPage: 8,
  },
  {
    numeral: 'III',
    title: 'Behind the Beat',
    subtitle: 'Scene drawings & song analysis',
    targetPage: 9,
  },
];

const photosById = new Map(galleryPhotos.map((photo) => [photo.id, photo]));
const productsById = new Map(products.map((product) => [product.id, product]));

let plateCounter = 0;
const pages: BookPage[] = selections.map(
  ({ title, subtitle, chapter, layout, photos }, index) => {
    const selected = photos.map(({ id, caption, objectPosition }) => {
      const photo = photosById.get(id);
      if (!photo) throw new Error(`Gallery photo missing: ${id}`);
      plateCounter += 1;
      return {
        ...photo,
        alt: caption,
        caption,
        objectPosition,
        plateLabel: `Plate ${String(plateCounter).padStart(2, '0')}`,
      };
    });
    const product = productsById.get(selected[0].productId);
    if (!product)
      throw new Error(`Gallery resource missing: ${selected[0].productId}`);
    return {
      title,
      subtitle,
      chapter,
      pageNumber: index + 1,
      layout,
      product: { id: product.id, name: product.name },
      photos: selected,
    };
  },
);

export default function GalleryPageClient() {
  return (
    <div
      className={`site-width content-page gallery-page ${bookDisplay.variable} ${bookSerif.variable}`}
    >
      <div className="page-title">
        <h1>Products in Action</h1>
        <p>See these resources come to life in real classrooms</p>
      </div>
      <FlipBook pages={pages} chapters={chapters} />
    </div>
  );
}
