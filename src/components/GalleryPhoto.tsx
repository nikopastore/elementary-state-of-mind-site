'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { GalleryPhoto as GalleryPhotoType } from '@/lib/galleryPhotos';
import { products } from '@/lib/products';
import { X, ArrowUpRight } from 'lucide-react';

interface GalleryPhotoProps {
  photo: GalleryPhotoType;
  thumbnailSizes: string;
  frameClassName?: string;
  objectPosition?: string;
}

const LIGHTBOX_SIZES = '(max-width: 768px) 92vw, 820px';
const preloadedLightboxUrls = new Set<string>();

function preloadLightboxImage(src: string) {
  if (typeof window === 'undefined' || !src) return;
  const targetWidth = window.devicePixelRatio > 1 ? 1200 : 1080;
  const optimizedUrl = `/_next/image?url=${encodeURIComponent(src)}&w=${targetWidth}&q=75`;
  if (preloadedLightboxUrls.has(optimizedUrl)) return;
  preloadedLightboxUrls.add(optimizedUrl);
  const img = new window.Image();
  img.decoding = 'async';
  img.src = optimizedUrl;
}

export default function GalleryPhoto({
  photo,
  thumbnailSizes,
  frameClassName = '',
  objectPosition,
}: GalleryPhotoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [instantSrc, setInstantSrc] = useState<string | null>(null);
  const [highResLoaded, setHighResLoaded] = useState(false);
  const thumbnail = useRef<HTMLButtonElement>(null);
  const product = products.find((p) => p.id === photo.productId);

  // Warm the lightbox cache gently after visible thumbnails settle
  useEffect(() => {
    const timer = window.setTimeout(() => {
      preloadLightboxImage(photo.image);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [photo.image]);

  const openPhoto = useCallback(() => {
    const imgEl = thumbnail.current?.querySelector('img');
    const cachedSrc = imgEl?.currentSrc || imgEl?.getAttribute('src') || null;
    setInstantSrc(cachedSrc);
    setHighResLoaded(false);
    preloadLightboxImage(photo.image);
    setIsOpen(true);
  }, [photo.image]);

  const closePhoto = useCallback(() => {
    setIsOpen(false);
    thumbnail.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePhoto();
      }
    },
    [closePhoto],
  );

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, handleKeyDown]);

  if (!product) {
    return null;
  }

  return (
    <>
      <button
        ref={thumbnail}
        type="button"
        aria-haspopup="dialog"
        aria-label={`Open photo: ${photo.alt}`}
        className="book-photo-button"
        onMouseEnter={() => preloadLightboxImage(photo.image)}
        onFocus={() => preloadLightboxImage(photo.image)}
        onPointerDown={() => preloadLightboxImage(photo.image)}
        onClick={openPhoto}
      >
        <span className={`book-photo-frame ${frameClassName}`.trim()}>
          <Image
            src={photo.image}
            alt={photo.alt}
            fill
            className="book-photo-image"
            style={objectPosition ? { objectPosition } : undefined}
            sizes={thumbnailSizes}
            loading="eager"
          />
        </span>
      </button>

      {typeof document !== 'undefined' &&
        isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={photo.alt}
            className="gallery-lightbox-backdrop"
            onClick={closePhoto}
          >
            <button
              type="button"
              onClick={closePhoto}
              className="gallery-lightbox-close"
              aria-label="Close"
              autoFocus
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div
              className="gallery-lightbox-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                href={`/shop#${product.id}`}
                className="gallery-lightbox-media group"
                onClick={() => setIsOpen(false)}
              >
                <div className="gallery-lightbox-image-wrap">
                  {instantSrc && !highResLoaded && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={instantSrc}
                      alt=""
                      aria-hidden="true"
                      className="gallery-lightbox-instant"
                    />
                  )}
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    className={`gallery-lightbox-full ${highResLoaded ? 'is-loaded' : ''}`}
                    sizes={LIGHTBOX_SIZES}
                    quality={75}
                    priority
                    onLoad={() => setHighResLoaded(true)}
                  />
                </div>
                <div className="gallery-lightbox-hover-hint">
                  <span className="gallery-lightbox-cta">
                    View Product
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>

              <div className="gallery-lightbox-meta">
                {photo.caption && (
                  <p className="gallery-lightbox-caption">{photo.caption}</p>
                )}
                <div className="gallery-lightbox-sub">
                  <span>{product.name}</span>
                  <span className="gallery-lightbox-dot" aria-hidden="true">·</span>
                  <span>Click image to view product</span>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
