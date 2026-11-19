import FlipBook, { type BookPage } from '@/components/FlipBook';
import { galleryPhotos } from '@/lib/galleryPhotos';
import { products } from '@/lib/products';

const selections: { title: string; photos: [string, string][] }[] = [
  {
    title: 'A classroom courtroom',
    photos: [['space-case-8', 'Evidence packets are spread across the tables beneath the projected mock trial slides.']],
  },
  {
    title: 'Evidence on the table',
    photos: [
      ['space-case-6', 'Illustrated evidence cards fan out beside a case-file cover.'],
      ['space-case-7', 'A closer view of the case file and the evidence arranged for students.'],
    ],
  },
  {
    title: 'Making a claim',
    photos: [
      ['space-case-1', 'A student sorts handwritten notes under claim, evidence, and reasoning.'],
      ['space-case-2', 'Another case worksheet uses sticky notes to organize the argument.'],
    ],
  },
  {
    title: 'Comparing arguments',
    photos: [
      ['space-case-3', 'Notes on the case fill the evidence columns of a student worksheet.'],
      ['space-case-4', 'A second worksheet shows how a student linked evidence to their reasoning.'],
    ],
  },
  {
    title: 'From notes to a case',
    photos: [['space-case-5', 'Handwritten evidence and reasoning sit together on a completed mock trial planning sheet.']],
  },
  {
    title: 'Setting the scene',
    photos: [
      ['space-case-9', 'The classroom is arranged for the trial, with materials laid out around the room.'],
      ['space-case-11', 'A projected title and printed case materials set the scene for the mock trial.'],
    ],
  },
  {
    title: 'Trial day',
    photos: [
      ['space-case-10', 'Students gather around the display during the classroom mock trial.'],
      ['space-case-12', 'The trial screen sits behind tables laid out with the class materials.'],
    ],
  },
  {
    title: 'A table for Friendsgiving',
    photos: [
      ['friendsgiving-1', 'The classroom is set for a shared celebration, with papers at each place.'],
      ['friendsgiving-2', 'Friendsgiving guests gather around a green-covered classroom table.'],
    ],
  },
  {
    title: 'From a scene to a song',
    photos: [
      ['kpop-1', 'A scene analysis page pairs a drawing with claim, evidence, and reasoning.'],
      ['kpop-2', 'A song analysis page uses the same structure to organize a student’s ideas.'],
    ],
  },
  {
    title: 'Listening with evidence',
    photos: [
      ['kpop-3', 'Color-coded notes fill the song analysis worksheet.'],
      ['kpop-4', 'A second student’s worksheet uses the same evidence prompts for their interpretation.'],
    ],
  },
  {
    title: 'A scene under the lens',
    photos: [['kpop-5', 'A colored scene illustration sits above the student’s written evidence and reasoning.']],
  },
];

const photosById = new Map(galleryPhotos.map((photo) => [photo.id, photo]));
const productsById = new Map(products.map((product) => [product.id, product]));
const pages: BookPage[] = selections.map(({ title, photos }) => {
  const selected = photos.map(([id, caption]) => {
    const photo = photosById.get(id);
    if (!photo) throw new Error(`Gallery photo missing: ${id}`);
    return { ...photo, alt: caption, caption };
  });
  const product = productsById.get(selected[0].productId);
  if (!product) throw new Error(`Gallery resource missing: ${selected[0].productId}`);
  return { title, product: { id: product.id, name: product.name }, photos: selected };
});

export default function GalleryPageClient() {
  return (
    <div className="site-width content-page gallery-page">
      <div className="page-title">
        <h1>Products in Action</h1>
        <p>See these resources come to life in real classrooms</p>
      </div>
      <FlipBook pages={pages} />
    </div>
  );
}
