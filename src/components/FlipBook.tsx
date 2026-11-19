'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GalleryPhoto from '@/components/GalleryPhoto';
import type { GalleryPhoto as Photo } from '@/lib/galleryPhotos';

export interface BookPage {
  title: string;
  product: { id: string; name: string };
  photos: Photo[];
}

const spreadQuery = '(min-width: 960px)';
const subscribeToSpread = (listener: () => void) => {
  const media = window.matchMedia(spreadQuery);
  media.addEventListener('change', listener);
  return () => media.removeEventListener('change', listener);
};
const canShowSpread = () => window.matchMedia(spreadQuery).matches;
const showInitialSpread = () => true;

type Turn = { from: number; to: number; step: 1 | 2; direction: -1 | 1 };

function PrintedPage({ page, turning = false }: { page?: BookPage; turning?: boolean }) {
  if (!page) return <div className="book-page book-page-blank" />;
  const imageSizes = page.photos.length === 1
    ? '(min-width: 1344px) 560px, (min-width: 960px) 45vw, 90vw'
    : '(min-width: 1344px) 275px, (min-width: 960px) 22vw, 43vw';

  return (
    <article className="book-page">
      <h2>{page.title}</h2>
      <div className="book-photographs" data-photos={page.photos.length}>
        {page.photos.map((photo) => (
          <figure key={photo.id}>
            {turning ? (
              <div className="book-photo-frame" aria-hidden="true">
                <Image src={photo.image} alt="" fill sizes={imageSizes} className="book-photo-image" loading="eager" />
              </div>
            ) : <GalleryPhoto photo={photo} thumbnailSizes={imageSizes} />}
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <Link className="book-resource" href={`/shop#${page.product.id}`}>{page.product.name}</Link>
    </article>
  );
}

export default function FlipBook({ pages }: { pages: BookPage[] }) {
  const spread = useSyncExternalStore(subscribeToSpread, canShowSpread, showInitialSpread);
  const [position, setPosition] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const step = spread ? 2 : 1;
  const first = position - position % step;
  const last = Math.min(first + step, pages.length);
  const activeTurn = turn?.step === step ? turn : null;

  useEffect(() => {
    if (!turn) return;
    const timeout = window.setTimeout(() => {
      setPosition(turn.to);
      setTurn(null);
    }, 850);
    return () => window.clearTimeout(timeout);
  }, [turn]);

  function move(direction: -1 | 1) {
    const target = first + direction * step;
    if (turn || target < 0 || target >= pages.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPosition(target);
    } else {
      setTurn({ from: first, to: target, step, direction });
    }
  }

  const forward = activeTurn?.direction === 1;
  const left = activeTurn && (!spread || !forward) ? activeTurn.to : first;
  const right = activeTurn && forward ? activeTurn.to + 1 : first + 1;
  const sheetFront = activeTurn && pages[activeTurn.from + (spread && forward ? 1 : 0)];
  const sheetBack = activeTurn && spread ? pages[activeTurn.to + (forward ? 0 : 1)] : undefined;
  const pageLabel = last === first + 1 ? `Page ${last} of ${pages.length}` : `Pages ${first + 1}–${last} of ${pages.length}`;

  if (!pages.length) return null;

  return (
    <section className="gallery-book" aria-label="Classroom photo book">
      <div id="gallery-book-pages" className="book-stage" data-layout={spread ? 'spread' : 'single'}>
        <div className="book-pages" inert={Boolean(activeTurn)}>
          <PrintedPage key={left} page={pages[left]} />
          {spread && <PrintedPage key={right} page={pages[right]} />}
        </div>
        {activeTurn && (
          <div
            className="book-turning-sheet"
            data-direction={forward ? 'next' : 'previous'}
            aria-hidden="true"
            inert
            onAnimationEnd={(event) => {
              if (event.currentTarget !== event.target) return;
              setPosition(activeTurn.to);
              setTurn(null);
            }}
          >
            <div className="book-sheet-front"><PrintedPage page={sheetFront || undefined} turning /></div>
            {spread && <div className="book-sheet-back"><PrintedPage page={sheetBack} turning /></div>}
          </div>
        )}
      </div>
      <nav
        className="book-controls"
        aria-label="Turn gallery pages"
        onKeyDown={(event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }}
      >
        <button className="book-control" type="button" aria-controls="gallery-book-pages" aria-disabled={first === 0 || Boolean(turn)} onClick={() => move(-1)}>
          <ChevronLeft aria-hidden="true" size={19} /><span>Previous</span>
        </button>
        <p className="book-position" aria-live="polite">{pageLabel}</p>
        <button className="book-control" type="button" aria-controls="gallery-book-pages" aria-disabled={last === pages.length || Boolean(turn)} onClick={() => move(1)}>
          <span>Next</span><ChevronRight aria-hidden="true" size={19} />
        </button>
      </nav>
    </section>
  );
}
