'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/lib/testimonials';

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const move = (direction: number) => setIndex((current) => (current + direction + testimonials.length) % testimonials.length);

  return (
    <section className="reviews-section" aria-labelledby="reviews-heading">
      <div className="site-width reviews-grid">
        <div className="reviews-intro" data-reveal="heading">
          <h2 id="reviews-heading">What Teachers Are Saying</h2>
          <p>Real reviews from real educators</p>
          <a className="product-link" href="https://www.teacherspayteachers.com/store/elementary-state-of-mind" target="_blank" rel="noopener noreferrer">See all reviews on TPT</a>
        </div>
        <div className="review-panel" data-reveal="panel">
          <div className="review-slides" aria-live="polite" aria-atomic="true">
            {testimonials.map((review, position) => (
              <div className="review-slide" key={review.id} aria-hidden={position !== index}>
                <div className="rating" aria-label={review.rating + ' out of 5 stars'}>
                  {Array.from({ length: review.rating }, (_, star) => <Star size={17} key={star} fill="currentColor" aria-hidden="true" />)}
                </div>
                <blockquote>&ldquo;{review.review}&rdquo;</blockquote>
                <p className="review-person"><strong>{review.reviewer}</strong><span>{review.product}</span></p>
              </div>
            ))}
          </div>
          <div className="review-controls">
            <button type="button" aria-label="Previous review" onClick={() => move(-1)}><ChevronLeft size={19} /></button>
            <span>{index + 1} / {testimonials.length}</span>
            <button type="button" aria-label="Next review" onClick={() => move(1)}><ChevronRight size={19} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
