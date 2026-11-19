'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import GalleryPhoto from '@/components/GalleryPhoto';
import type { GalleryPhoto as Photo } from '@/lib/galleryPhotos';

export type BookPageLayout =
  | 'hero-plate'
  | 'asymmetric-duo'
  | 'staggered-vertical'
  | 'wide-over-detail'
  | 'editorial-feature'
  | 'landscape-pair'
  | 'cinema-spread'
  | 'chapter-opener-duo'
  | 'offset-duo'
  | 'diagonal-balance'
  | 'closing-plate';

export interface BookPhotoEntry extends Photo {
  plateLabel?: string;
  objectPosition?: string;
}

export interface BookPage {
  title: string;
  subtitle?: string;
  chapter: string;
  pageNumber: number;
  layout: BookPageLayout;
  product: { id: string; name: string };
  photos: BookPhotoEntry[];
}

export interface BookChapterLink {
  numeral: string;
  title: string;
  subtitle: string;
  targetPage: number; // 1-based page number
}

interface FlipBookProps {
  pages: BookPage[];
  chapters: BookChapterLink[];
}

const spreadQuery = '(min-width: 960px)';
const subscribeToSpread = (listener: () => void) => {
  const media = window.matchMedia(spreadQuery);
  media.addEventListener('change', listener);
  return () => media.removeEventListener('change', listener);
};
const canShowSpread = () => window.matchMedia(spreadQuery).matches;
const showInitialSpread = () => true;

type Turn = {
  from: number;
  to: number;
  spread: boolean;
  direction: -1 | 1;
};

type SlotContent =
  | { kind: 'empty' }
  | { kind: 'cover' }
  | { kind: 'inside-cover' }
  | { kind: 'page'; page: BookPage };

function normalizePosition(pos: number, spread: boolean, pageCount: number): number {
  const clamped = Math.max(0, Math.min(pos, pageCount));
  if (!spread || clamped <= 1) return clamped;
  // On desktop, spreads after [inside-cover, p1] are [2,3], [4,5], [6,7], [8,9], [10,11]
  return clamped % 2 === 0 ? clamped : clamped - 1;
}

function getNextPosition(pos: number, spread: boolean, pageCount: number): number | null {
  if (!spread) return pos < pageCount ? pos + 1 : null;
  if (pos === 0) return 1;
  if (pos === 1) return pageCount >= 2 ? 2 : null;
  const next = pos + 2;
  return next <= pageCount ? next : null;
}

function getPrevPosition(pos: number, spread: boolean): number | null {
  if (!spread) return pos > 0 ? pos - 1 : null;
  if (pos === 0) return null;
  if (pos === 1) return 0;
  if (pos === 2) return 1;
  return pos - 2;
}

function getDesktopLeftSlot(pos: number, pages: BookPage[]): SlotContent {
  if (pos === 0) return { kind: 'empty' };
  if (pos === 1) return { kind: 'inside-cover' };
  const page = pages[pos - 1];
  return page ? { kind: 'page', page } : { kind: 'empty' };
}

function getDesktopRightSlot(pos: number, pages: BookPage[]): SlotContent {
  if (pos === 0) return { kind: 'cover' };
  if (pos === 1) {
    const page = pages[0];
    return page ? { kind: 'page', page } : { kind: 'empty' };
  }
  const page = pages[pos];
  return page ? { kind: 'page', page } : { kind: 'empty' };
}

function getMobileSlot(pos: number, pages: BookPage[]): SlotContent {
  if (pos === 0) return { kind: 'cover' };
  const page = pages[pos - 1];
  return page ? { kind: 'page', page } : { kind: 'empty' };
}

function BookCover({
  totalPhotos,
  onOpen,
  interactive,
}: {
  totalPhotos: number;
  onOpen?: () => void;
  interactive: boolean;
}) {
  return (
    <div className="book-cover">
      <div className="book-cover-spine" aria-hidden="true">
        <span className="book-cover-rib" />
        <span className="book-cover-rib" />
        <span className="book-cover-rib" />
        <span className="book-cover-rib" />
      </div>
      <div className="book-cover-board">
        <div className="book-cover-frame">
          <span className="book-cover-corner tl" aria-hidden="true" />
          <span className="book-cover-corner tr" aria-hidden="true" />
          <span className="book-cover-corner bl" aria-hidden="true" />
          <span className="book-cover-corner br" aria-hidden="true" />

          <div className="book-cover-inner">
            <p className="book-cover-imprint">Elementary State of Mind</p>

            <div className="book-cover-medallion" aria-hidden="true">
              <span className="book-cover-monogram">E·S·M</span>
            </div>

            <div className="book-cover-title-group">
              <h2 className="book-cover-title">
                Products
                <span className="book-cover-title-italic"> in Action</span>
              </h2>
              <div className="book-cover-rule" aria-hidden="true">
                <span />
                <em className="book-cover-diamond">◆</em>
                <span />
              </div>
              <p className="book-cover-subtitle">
                A Classroom Photo Anthology
              </p>
            </div>

            <div className="book-cover-footer">
              <p className="book-cover-edition">
                Volume I &nbsp;·&nbsp; {totalPhotos} Classroom Plates
              </p>
              {interactive && onOpen && (
                <button
                  type="button"
                  className="book-cover-open-btn"
                  onClick={onOpen}
                >
                  <BookOpen size={16} aria-hidden="true" />
                  <span>Open Photo Book</span>
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsideCover({
  chapters,
  totalPhotos,
  onJumpToPage,
  interactive,
}: {
  chapters: BookChapterLink[];
  totalPhotos: number;
  onJumpToPage?: (targetPage: number) => void;
  interactive: boolean;
}) {
  return (
    <article className="book-page book-inside-cover">
      <div className="book-exlibris-frame">
        <p className="book-exlibris-kicker">Ex Libris · Classroom Edition</p>
        <h2 className="book-exlibris-title">From Real Desks &amp; Chalkboards</h2>
        <p className="book-exlibris-note">
          Every plate in this volume captures elementary students debating
          evidence, gathering around shared tables, and turning music and
          stories into thoughtful written arguments.
        </p>

        <div className="book-contents">
          <p className="book-contents-heading">Contents</p>
          <ol className="book-contents-list">
            {chapters.map((chapter) => (
              <li key={chapter.numeral}>
                {interactive && onJumpToPage ? (
                  <button
                    type="button"
                    className="book-contents-item"
                    onClick={() => onJumpToPage(chapter.targetPage)}
                  >
                    <span className="book-contents-num">{chapter.numeral}</span>
                    <span className="book-contents-text">
                      <strong>{chapter.title}</strong>
                      <span>{chapter.subtitle}</span>
                    </span>
                    <span className="book-contents-pg">
                      p. {String(chapter.targetPage).padStart(2, '0')}
                    </span>
                  </button>
                ) : (
                  <div className="book-contents-item">
                    <span className="book-contents-num">{chapter.numeral}</span>
                    <span className="book-contents-text">
                      <strong>{chapter.title}</strong>
                      <span>{chapter.subtitle}</span>
                    </span>
                    <span className="book-contents-pg">
                      p. {String(chapter.targetPage).padStart(2, '0')}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        <p className="book-exlibris-colophon">
          {totalPhotos} photographs · Click any photograph to inspect full size
        </p>
      </div>
    </article>
  );
}

function PhotoFigure({
  photo,
  imageSizes,
  turning,
  slotClass,
}: {
  photo: BookPhotoEntry;
  imageSizes: string;
  turning: boolean;
  slotClass: string;
}) {
  return (
    <figure className={`book-figure ${slotClass}`}>
      <div className="book-figure-media">
        {turning ? (
          <div className="book-photo-frame" aria-hidden="true">
            <Image
              src={photo.image}
              alt=""
              fill
              sizes={imageSizes}
              className="book-photo-image"
              style={
                photo.objectPosition
                  ? { objectPosition: photo.objectPosition }
                  : undefined
              }
              loading="eager"
            />
          </div>
        ) : (
          <GalleryPhoto
            photo={photo}
            thumbnailSizes={imageSizes}
            objectPosition={photo.objectPosition}
          />
        )}
      </div>
      <figcaption className="book-caption">
        {photo.plateLabel && (
          <span className="book-plate-tag">{photo.plateLabel}</span>
        )}
        <span className="book-caption-text">{photo.caption}</span>
      </figcaption>
    </figure>
  );
}

function PrintedPage({
  page,
  side,
  turning = false,
}: {
  page: BookPage;
  side: 'left' | 'right' | 'single';
  turning?: boolean;
}) {
  const singlePhotoSizes =
    '(min-width: 1344px) 520px, (min-width: 960px) 42vw, 90vw';
  const duoPhotoSizes =
    '(min-width: 1344px) 340px, (min-width: 960px) 28vw, 86vw';
  const imageSizes =
    page.photos.length === 1 ? singlePhotoSizes : duoPhotoSizes;
  const formattedNumber = String(page.pageNumber).padStart(2, '0');

  return (
    <article
      className={`book-page book-layout-${page.layout}`}
      data-side={side}
    >
      <header className="book-running-head">
        <span className="book-chapter-label">{page.chapter}</span>
        <span className="book-folio">{formattedNumber}</span>
      </header>

      <div className="book-editorial-grid">
        <div className="book-heading-block">
          <h2 className="book-editorial-title">{page.title}</h2>
          {page.subtitle && (
            <p className="book-editorial-subtitle">{page.subtitle}</p>
          )}
        </div>

        {page.photos.map((photo, index) => (
          <PhotoFigure
            key={photo.id}
            photo={photo}
            imageSizes={imageSizes}
            turning={turning}
            slotClass={index === 0 ? 'book-slot-primary' : 'book-slot-secondary'}
          />
        ))}
      </div>

      <footer className="book-page-footer">
        <Link className="book-resource" href={`/shop#${page.product.id}`}>
          <span className="book-resource-kicker">Featured Resource</span>
          <span className="book-resource-name">{page.product.name}</span>
        </Link>
      </footer>
    </article>
  );
}

function SlotRenderer({
  slot,
  side,
  turning = false,
  chapters,
  totalPhotos,
  onOpenCover,
  onJumpToPage,
}: {
  slot: SlotContent;
  side: 'left' | 'right' | 'single';
  turning?: boolean;
  chapters: BookChapterLink[];
  totalPhotos: number;
  onOpenCover?: () => void;
  onJumpToPage?: (targetPage: number) => void;
}) {
  if (slot.kind === 'empty') {
    return <div className="book-page-empty" aria-hidden="true" />;
  }
  if (slot.kind === 'cover') {
    return (
      <BookCover
        totalPhotos={totalPhotos}
        onOpen={onOpenCover}
        interactive={!turning}
      />
    );
  }
  if (slot.kind === 'inside-cover') {
    return (
      <InsideCover
        chapters={chapters}
        totalPhotos={totalPhotos}
        onJumpToPage={onJumpToPage}
        interactive={!turning}
      />
    );
  }
  return <PrintedPage page={slot.page} side={side} turning={turning} />;
}

export default function FlipBook({ pages, chapters }: FlipBookProps) {
  const spread = useSyncExternalStore(
    subscribeToSpread,
    canShowSpread,
    showInitialSpread,
  );
  const [position, setPosition] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);

  const totalPhotos = pages.reduce((sum, p) => sum + p.photos.length, 0);
  const normalizedPos = normalizePosition(position, spread, pages.length);
  const activeTurn = turn && turn.spread === spread ? turn : null;

  // If the viewport crosses the desktop/mobile breakpoint mid-turn, settle cleanly
  useEffect(() => {
    if (!turn || turn.spread === spread) return;
    setPosition(normalizePosition(turn.to, spread, pages.length));
    setTurn(null);
  }, [spread, turn, pages.length]);

  // Safety fallback timer in case animationend is skipped (e.g. background tab)
  useEffect(() => {
    if (!turn) return;
    const isCover = turn.from === 0 || turn.to === 0;
    const timeout = window.setTimeout(() => {
      setPosition(normalizePosition(turn.to, spread, pages.length));
      setTurn(null);
    }, isCover ? 1150 : 1020);
    return () => window.clearTimeout(timeout);
  }, [turn, spread, pages.length]);

  const navigateTo = useCallback(
    (rawTarget: number, direction: -1 | 1) => {
      if (turn) return;
      const target = normalizePosition(rawTarget, spread, pages.length);
      if (target === normalizedPos) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setPosition(target);
      } else {
        setTurn({ from: normalizedPos, to: target, spread, direction });
      }
    },
    [turn, spread, pages.length, normalizedPos],
  );

  const move = useCallback(
    (direction: -1 | 1) => {
      if (turn) return;
      const target =
        direction === 1
          ? getNextPosition(normalizedPos, spread, pages.length)
          : getPrevPosition(normalizedPos, spread);
      if (target === null) return;
      navigateTo(target, direction);
    },
    [turn, normalizedPos, spread, pages.length, navigateTo],
  );

  // Global keyboard navigation when no lightbox dialog or form input is active
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (document.querySelector('[role="dialog"]')) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [move]);

  if (!pages.length) return null;

  const isForward = activeTurn?.direction === 1;
  const isCoverTurn =
    activeTurn && (activeTurn.from === 0 || activeTurn.to === 0);

  // Book visual state for desktop cover-centering glide
  let bookState: 'closed' | 'opening' | 'closing' | 'open' = 'open';
  if (spread) {
    if (activeTurn?.from === 0) bookState = 'opening';
    else if (activeTurn?.to === 0) bookState = 'closing';
    else if (normalizedPos === 0) bookState = 'closed';
  } else {
    bookState = normalizedPos === 0 && !activeTurn ? 'closed' : 'open';
  }

  // Compute underlying static pages and turning sheet faces
  let leftSlot: SlotContent = { kind: 'empty' };
  let rightSlot: SlotContent = { kind: 'empty' };
  let sheetFront: SlotContent = { kind: 'empty' };
  let sheetBack: SlotContent = { kind: 'empty' };

  if (spread) {
    if (!activeTurn) {
      leftSlot = getDesktopLeftSlot(normalizedPos, pages);
      rightSlot = getDesktopRightSlot(normalizedPos, pages);
    } else if (isForward) {
      leftSlot = getDesktopLeftSlot(activeTurn.from, pages);
      rightSlot = getDesktopRightSlot(activeTurn.to, pages);
      sheetFront = getDesktopRightSlot(activeTurn.from, pages);
      sheetBack = getDesktopLeftSlot(activeTurn.to, pages);
    } else {
      leftSlot = getDesktopLeftSlot(activeTurn.to, pages);
      rightSlot = getDesktopRightSlot(activeTurn.from, pages);
      sheetFront = getDesktopLeftSlot(activeTurn.from, pages);
      sheetBack = getDesktopRightSlot(activeTurn.to, pages);
    }
  } else {
    if (!activeTurn) {
      leftSlot = getMobileSlot(normalizedPos, pages);
    } else if (isForward) {
      leftSlot = getMobileSlot(activeTurn.to, pages);
      sheetFront = getMobileSlot(activeTurn.from, pages);
    } else {
      leftSlot = getMobileSlot(activeTurn.from, pages);
      sheetFront = getMobileSlot(activeTurn.to, pages);
    }
  }

  // Progress ratio for realistic left/right stacked paper-edge thickness
  const progress = normalizedPos / Math.max(1, pages.length);
  const leftStack = Math.round(progress * 6);
  const rightStack = Math.round((1 - progress) * 6);

  // Human-readable position indicator
  const canGoPrev = getPrevPosition(normalizedPos, spread) !== null;
  const canGoNext =
    getNextPosition(normalizedPos, spread, pages.length) !== null;

  let pageLabel: string;
  if (normalizedPos === 0) {
    pageLabel = 'Cover';
  } else if (!spread) {
    pageLabel = `Page ${normalizedPos} of ${pages.length}`;
  } else if (normalizedPos === 1) {
    pageLabel = `Intro & Page 1 of ${pages.length}`;
  } else {
    const rightNum = Math.min(normalizedPos + 1, pages.length);
    pageLabel =
      rightNum === normalizedPos
        ? `Page ${normalizedPos} of ${pages.length}`
        : `Pages ${normalizedPos}–${rightNum} of ${pages.length}`;
  }

  return (
    <section className="gallery-book" aria-label="Classroom photo book">
      <div
        id="gallery-book-pages"
        className="book-viewport"
        data-layout={spread ? 'spread' : 'single'}
        data-state={bookState}
      >
        <div
          className="book-stage"
          data-layout={spread ? 'spread' : 'single'}
          data-state={bookState}
          style={
            {
              '--left-stack': leftStack,
              '--right-stack': rightStack,
            } as React.CSSProperties
          }
        >
          <div className="book-pages" inert={Boolean(activeTurn)}>
            <SlotRenderer
              slot={leftSlot}
              side={spread ? 'left' : 'single'}
              chapters={chapters}
              totalPhotos={totalPhotos}
              onOpenCover={() => move(1)}
              onJumpToPage={(targetPage) => navigateTo(targetPage, 1)}
            />
            {spread && (
              <SlotRenderer
                slot={rightSlot}
                side="right"
                chapters={chapters}
                totalPhotos={totalPhotos}
                onOpenCover={() => move(1)}
                onJumpToPage={(targetPage) => navigateTo(targetPage, 1)}
              />
            )}
          </div>

          {activeTurn && (
            <>
              <div
                className="book-turn-shadow"
                data-direction={isForward ? 'next' : 'previous'}
                aria-hidden="true"
              />
              <div
                className={`book-turning-sheet ${isCoverTurn ? 'is-cover-sheet' : ''}`}
                data-direction={isForward ? 'next' : 'previous'}
                aria-hidden="true"
                inert
                onAnimationEnd={(event) => {
                  if (event.currentTarget !== event.target) return;
                  setPosition(
                    normalizePosition(activeTurn.to, spread, pages.length),
                  );
                  setTurn(null);
                }}
              >
                <div className="book-sheet-front">
                  <SlotRenderer
                    slot={sheetFront}
                    side={spread ? (isForward ? 'right' : 'left') : 'single'}
                    turning
                    chapters={chapters}
                    totalPhotos={totalPhotos}
                  />
                </div>
                {spread && (
                  <div className="book-sheet-back">
                    <SlotRenderer
                      slot={sheetBack}
                      side={isForward ? 'left' : 'right'}
                      turning
                      chapters={chapters}
                      totalPhotos={totalPhotos}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <nav className="book-controls" aria-label="Turn gallery pages">
        <button
          className="book-control"
          type="button"
          aria-controls="gallery-book-pages"
          aria-disabled={!canGoPrev || Boolean(turn)}
          onClick={() => move(-1)}
        >
          <ChevronLeft aria-hidden="true" size={18} />
          <span>{normalizedPos === 1 ? 'Cover' : 'Previous'}</span>
        </button>

        <p className="book-position" aria-live="polite">
          {pageLabel}
        </p>

        <button
          className="book-control"
          type="button"
          aria-controls="gallery-book-pages"
          aria-disabled={!canGoNext || Boolean(turn)}
          onClick={() => move(1)}
        >
          <span>{normalizedPos === 0 ? 'Open Book' : 'Next'}</span>
          <ChevronRight aria-hidden="true" size={18} />
        </button>
      </nav>
    </section>
  );
}
