'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/lib/testimonials';

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const move = (direction: number) =>
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length);

  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="site-width reviews-grid">
        <div className="reviews-intro" data-reveal="heading">
          <span className="reviews-badge">
            <Star size={14} fill="currentColor" aria-hidden="true" />
            <span>4.95 Average Rating on TPT</span>
          </span>
          <h2 id="reviews-heading">What Teachers Are Saying</h2>
          <p>Real reviews from real educators using these resources in their classrooms.</p>
          <a
            className="product-link reviews-tpt-link"
            href="https://www.teacherspayteachers.com/store/elementary-state-of-mind"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>See all reviews on TPT</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <div className="review-panel" data-reveal="panel">
          <span className="review-quote-mark" aria-hidden="true">&ldquo;</span>
          <div className="review-slides" aria-live="polite" aria-atomic="true">
            {testimonials.map((review, position) => {
              const active = position === index;
              return (
                <div
                  className={`review-slide ${active ? 'is-active' : ''}`}
                  key={review.id}
                  aria-hidden={!active}
                >
                  <div className="rating" aria-label={review.rating + ' out of 5 stars'}>
                    {Array.from({ length: review.rating }, (_, star) => (
                      <Star size={16} key={star} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote>&ldquo;{review.review}&rdquo;</blockquote>
                  <p className="review-person">
                    <strong>{review.reviewer}</strong>
                    <span>{review.product}</span>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="review-controls">
            <div className="review-dots" role="tablist" aria-label="Choose a review">
              {testimonials.map((review, position) => (
                <button
                  key={review.id}
                  type="button"
                  role="tab"
                  aria-selected={position === index}
                  aria-label={`Review ${position + 1} of ${testimonials.length}`}
                  className={position === index ? 'review-dot is-active' : 'review-dot'}
                  onClick={() => setIndex(position)}
                />
              ))}
            </div>
            <div className="review-arrows">
              <button type="button" aria-label="Previous review" onClick={() => move(-1)}>
                <ChevronLeft size={18} />
              </button>
              <span className="review-counter">
                {index + 1} / {testimonials.length}
              </span>
              <button type="button" aria-label="Next review" onClick={() => move(1)}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
