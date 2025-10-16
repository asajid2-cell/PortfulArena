import { useMemo, useState } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import type { ArenaProject } from '../../lib/types';
import clsx from 'clsx';

interface ProjectCardProps {
  project: ArenaProject;
  index?: number;
}

const hoverSpring = {
  type: 'spring',
  mass: 0.9,
  stiffness: 120,
  damping: 18,
  restDelta: 0.002
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isPressed, setIsPressed] = useState(false);

  const orbitalDelay = useMemo(() => index * 0.06, [index]);
  const ringSpring = useSpring(0, {
    stiffness: 180,
    damping: 16,
    mass: 0.6
  });

  const handlePress = () => {
    setIsPressed(true);
    ringSpring.set(1);
  };

  const handleRelease = () => {
    setIsPressed(false);
    ringSpring.set(0);
  };

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-[color:var(--line-1)] bg-[color:rgba(74,4,4,0.92)] p-6 shadow-ambient backdrop-blur"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24, rotateZ: 1.5 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, rotateZ: 0 }}
      transition={prefersReducedMotion ? undefined : { delay: orbitalDelay, duration: 0.6, ease: 'easeOut' }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -6,
              rotateZ: 0.5,
              transition: hoverSpring
            }
      }
      whileTap={
        prefersReducedMotion
          ? undefined
          : {
              scale: [1, 0.985, 1.015, 1],
              rotateZ: [-1.5, 1.5, 0],
              transition: { duration: 0.45, ease: 'easeOut' }
            }
      }
      onPointerDown={!prefersReducedMotion ? handlePress : undefined}
      onPointerUp={!prefersReducedMotion ? handleRelease : undefined}
      onPointerLeave={!prefersReducedMotion ? handleRelease : undefined}
    >
      <div
        className={clsx(
          'absolute inset-0 opacity-0 transition duration-120 ease-settle group-hover:opacity-100',
          'bg-[radial-gradient(circle_at_28%_22%,rgba(117,32,55,0.22),transparent_62%),radial-gradient(circle_at_76%_68%,rgba(160,80,123,0.18),transparent_58%)]'
        )}
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-3)]">{project.category}</p>
        <h3 className="mt-3 font-display text-2xl font-semibold text-[color:var(--text-1)]">{project.title}</h3>
        <p className="mt-4 text-sm text-[color:var(--text-2)]">{project.summary}</p>
        {project.stack?.length && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[color:var(--line-1)] bg-[color:rgba(86,22,43,0.88)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[color:var(--text-3)]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
      <motion.div
        className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--pri-400)]"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: isPressed ? 4 : 0,
                transition: { type: 'spring', stiffness: 240, damping: 18 }
              }
        }
      >
        View project
        <motion.span
          aria-hidden
          className="inline-flex h-2 w-2 rounded-full bg-[color:var(--sec-500)]"
          style={{
            scale: prefersReducedMotion ? undefined : ringSpring
          }}
        />
      </motion.div>
    </motion.article>
  );
}

