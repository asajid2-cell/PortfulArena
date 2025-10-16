import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import clsx from 'clsx';

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
}

export function FilterBar({ options, value, onChange, ariaLabel }: FilterBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const updateConstraints = () => {
      const overflow = track.scrollWidth - container.clientWidth;
      if (overflow > 0) {
        setConstraints({ left: -overflow, right: 0 });
      } else {
        x.set(0);
        setConstraints({ left: 0, right: 0 });
      }
    };

    updateConstraints();
    const resizeObserver = new ResizeObserver(updateConstraints);
    resizeObserver.observe(container);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, [x]);

  const handleKey = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, option: FilterOption) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onChange(option.value);
      }
    },
    [onChange]
  );

  const tabIndexLookup = useMemo(() => {
    const currentIndex = options.findIndex((opt) => opt.value === value);
    return currentIndex === -1 ? 0 : currentIndex;
  }, [options, value]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-full border border-[color:var(--line-1)] bg-[color:rgba(11,16,22,0.8)] px-2 py-2"
    >
      <motion.div
        ref={trackRef}
        className="flex items-center gap-2"
        drag="x"
        dragConstraints={constraints}
        dragElastic={0.12}
        dragMomentum
        style={{ x }}
        aria-label={ariaLabel}
      >
        {options.map((option, index) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              className={clsx(
                'relative inline-flex select-none items-center gap-2 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-120 ease-settle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pri-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-0)]',
                isActive
                  ? 'bg-[color:rgba(117,32,55,0.2)] text-[color:var(--pri-300)]'
                  : 'text-[color:var(--text-3)] hover:text-[color:var(--pri-400)]'
              )}
              onClick={() => onChange(option.value)}
              onKeyDown={(event) => handleKey(event, option)}
              aria-pressed={isActive}
              tabIndex={index === tabIndexLookup ? 0 : -1}
            >
              {option.label}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}


