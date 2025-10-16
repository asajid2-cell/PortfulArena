import { FormEvent, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface ContactFormProps {
  endpoint?: string;
}

export function ContactForm({ endpoint }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const sparks = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index,
        angle: (index / 12) * Math.PI * 2,
        distance: 40 + index * 2
      })),
    []
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!formData.get('message')) {
      setStatus('error');
      setMessage('Drop a few notes so I know where to steer the launch.');
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json'
          }
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setStatus('success');
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('That launch wobbled. Try again or email hello@example.com.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[24px] border border-[color:var(--line-1)] bg-[color:rgba(74,4,4,0.9)] p-8 shadow-ambient">
      <div>
        <label className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-3)]" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-xl border border-[color:var(--line-1)] bg-[color:var(--bg-0)] px-4 py-3 text-sm text-[color:var(--text-1)] placeholder:text-[color:var(--text-3)] focus:border-[color:var(--pri-400)] focus:outline-none focus:ring-2 focus:ring-[color:var(--pri-400)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg-0)]"
          placeholder="You"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-3)]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-xl border border-[color:var(--line-1)] bg-[color:var(--bg-0)] px-4 py-3 text-sm text-[color:var(--text-1)] placeholder:text-[color:var(--text-3)] focus:border-[color:var(--pri-400)] focus:outline-none focus:ring-2 focus:ring-[color:var(--pri-400)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg-0)]"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-3)]" htmlFor="message">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2 w-full rounded-xl border border-[color:var(--line-1)] bg-[color:var(--bg-0)] px-4 py-3 text-sm text-[color:var(--text-1)] placeholder:text-[color:var(--text-3)] focus:border-[color:var(--pri-400)] focus:outline-none focus:ring-2 focus:ring-[color:var(--pri-400)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg-0)]"
          placeholder="Share your sparks, timeline, and goals."
        />
      </div>
      <div className="relative">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full border border-transparent bg-[color:var(--pri-500)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(160,80,123,0.22)] transition-transform duration-120 ease-launch hover:translate-y-[-2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pri-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-0)] disabled:cursor-wait"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Launching...' : status === 'success' ? 'Sent!' : 'Launch message'}
        </button>
        <AnimatePresence>
          {status === 'success' && !prefersReducedMotion && (
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {sparks.map((spark) => (
                <motion.span
                  key={spark.id}
                  className="absolute h-1 w-6 rounded-full bg-[color:var(--acc-amber)]"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0.8, 1.2, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos(spark.angle) * spark.distance,
                    y: Math.sin(spark.angle) * spark.distance,
                    rotate: (spark.angle * 180) / Math.PI
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            className="text-xs text-[color:var(--acc-amber)]"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
      <p className="text-xs text-[color:var(--text-3)]">
        Formspark or Basin integration slots in easily - set the `endpoint` prop with your form URL. Prefer a simple link? Email{' '}
        <a className="font-medium text-[color:var(--pri-400)]" href="mailto:hello@example.com">
          hello@example.com
        </a>.
      </p>
    </form>
  );
}

