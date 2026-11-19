'use client';

import { useState } from 'react';
import { Mail, Send, Check, Loader2 } from 'lucide-react';

const BUTTONDOWN_USERNAME = 'elementarystateofmind';

export default function EmailSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(
        `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ email }),
        },
      );

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! Check your email to confirm.');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="subscribe-card">
      <div className="subscribe-copy">
        <div className="subscribe-head">
          <span className="subscribe-icon" aria-hidden="true">
            <Mail size={19} />
          </span>
          <div>
            <span className="section-kicker">Newsletter</span>
            <h3>Subscribe to Updates</h3>
          </div>
        </div>
        <p>Get new blog posts and teaching tips delivered to your inbox.</p>
      </div>

      {status === 'success' ? (
        <div className="subscribe-success" role="status">
          <Check size={18} aria-hidden="true" />
          <span>{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="subscribe-form">
          <label className="sr-only" htmlFor="subscribe-email">
            Email address
          </label>
          <input
            id="subscribe-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="subscribe-input"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="button subscribe-submit"
          >
            {status === 'loading' ? (
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            ) : (
              <Send size={15} aria-hidden="true" />
            )}
            <span>Subscribe</span>
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="subscribe-error" role="alert">
          {message}
        </p>
      )}
    </div>
  );
}
