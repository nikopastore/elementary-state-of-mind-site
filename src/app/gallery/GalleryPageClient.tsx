import GalleryPhoto from '@/components/GalleryPhoto';
import { galleryPhotos } from '@/lib/galleryPhotos';

export default function GalleryPageClient() {
  return (
    <div className="site-width content-page gallery-page">
      <div className="page-title">
        <h1>Products in Action</h1>
        <p>See these resources come to life in real classrooms</p>
      </div>
      <div className="gallery-photos columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
        {galleryPhotos.map((photo) => (
          <div key={photo.id}><GalleryPhoto photo={photo} /></div>
        ))}
      </div>
    </div>
  );
}
