import { useEffect } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const progress = useSpring(0, {
    stiffness: 180,
    damping: 28,
    mass: 0.35
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      progress.set(0);
      return;
    }

    const updateProgress = () => {
      const body = document.body;
      const documentElement = document.documentElement;
      const scrollTop = documentElement.scrollTop || body.scrollTop;
      const scrollHeight = documentElement.scrollHeight - documentElement.clientHeight;
      const next = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      progress.set(next);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [prefersReducedMotion, progress]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[color:rgba(117,32,55,0.7)] via-[color:rgba(117,32,55,0.35)] to-[color:rgba(160,80,123,0.55)]"
        style={{ scaleX: progress }}
      />
    </div>
  );
}

export default ScrollProgress;

