import MasonryGallery from '@/components/MasonryGallery';

export default function GalleryPage() {
  return (
    <div className="bg-cream min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center text-charcoal mb-4">
          Gallery
        </h1>
        <p className="text-xl text-center text-charcoal/70 mb-12 max-w-2xl mx-auto">
          A peek inside our classroom
        </p>
        <MasonryGallery images={[]} />
        <p className="text-center text-charcoal/60 mt-8 font-body">
          More photos coming soon!
        </p>
      </div>
    </div>
  );
}
