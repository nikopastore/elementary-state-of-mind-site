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
        }
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
    <div className="bg-gradient-to-r from-purple/10 to-dustyRose/10 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center">
          <Mail className="w-5 h-5 text-purple" />
        </div>
        <h3 className="text-xl md:text-2xl font-heading font-bold text-black">
          Subscribe to Updates
        </h3>
      </div>
      <p className="text-gray mb-4">
        Get new blog posts and teaching tips delivered to your inbox.
      </p>

      {status === 'success' ? (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-xl p-4">
          <Check className="w-5 h-5" />
          <span>{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-xl border border-gray/20 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple transition-all"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center gap-2 bg-dustyRose hover:bg-purple text-white font-semibold px-6 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>Subscribe</span>
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-3 text-red-500 text-sm">{message}</p>
      )}
    </div>
  );
}
