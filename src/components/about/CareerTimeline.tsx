import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

export interface TimelineEvent {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  technologies?: string[];
}

interface CareerTimelineProps {
  events: TimelineEvent[];
}

export function CareerTimeline({ events }: CareerTimelineProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      <div className="absolute left-[18px] top-3 bottom-3 w-px bg-[color:var(--line-1)]" aria-hidden />
      <ol className="space-y-10">
        {events.map((event, index) => (
          <li key={event.id} className="relative pl-14">
            <motion.div
              className={clsx(
                'absolute left-0 top-2 grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-[color:var(--line-1)] bg-[color:var(--bg-2)] shadow-ambient',
                'before:absolute before:inset-1 before:rounded-full before:border before:border-[color:var(--pri-500)] before:opacity-40',
                'after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle,rgba(117,32,55,0.22),transparent)]'
              )}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      rotateZ: [0, 360],
                      transition: { duration: 12, repeat: Infinity, ease: 'linear', delay: index * 0.4 }
                    }
              }
            >
              <span className="sr-only">{event.period}</span>
            </motion.div>
            <div className="rounded-2xl border border-[color:var(--line-1)] bg-[color:rgba(74,4,4,0.82)] p-5 shadow-ambient">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-3)]">{event.role}</p>
                  <h3 className="mt-1 font-display text-xl text-[color:var(--text-1)]">{event.title}</h3>
                </div>
                <span className="rounded-full border border-[color:var(--line-1)] bg-[color:var(--bg-0)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[color:var(--sec-400)]">
                  {event.period}
                </span>
              </div>
              <p className="mt-4 text-sm text-[color:var(--text-2)]">{event.description}</p>
              {event.technologies?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {event.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-[color:var(--line-1)] bg-[color:rgba(15,17,23,0.9)] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-[color:var(--text-3)]">
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

