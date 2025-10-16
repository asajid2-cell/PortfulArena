import { useMemo, useState } from 'react';
import type { ArenaProject } from '../../lib/types';
import { FilterBar, type FilterOption } from './FilterBar';
import { ProjectCard } from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsArenaProps {
  projects: ArenaProject[];
}

const spring = {
  type: 'spring',
  stiffness: 160,
  damping: 22
};

export function ProjectsArena({ projects }: ProjectsArenaProps) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStack, setFilterStack] = useState('all');

  const categoryOptions: FilterOption[] = useMemo(() => {
    const buckets = new Map<string, number>();
    projects.forEach((project) => {
      const key = project.category || 'Uncategorized';
      buckets.set(key, (buckets.get(key) || 0) + 1);
    });
    const mapped = Array.from(buckets.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([category, count]) => ({
        value: category,
        label: `${category} (${count})`
      }));
    return [{ value: 'all', label: 'All Launches' }, ...mapped];
  }, [projects]);

  const stackOptions: FilterOption[] = useMemo(() => {
    const stacks = new Map<string, number>();
    projects.forEach((project) => {
      project.stack?.forEach((tech) => {
        stacks.set(tech, (stacks.get(tech) || 0) + 1);
      });
    });
    const mapped = Array.from(stacks.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 16)
      .map(([tech, count]) => ({
        value: tech,
        label: `${tech} (${count})`
      }));
    return [{ value: 'all', label: 'All Tech' }, ...mapped];
  }, [projects]);

  const visibleProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory = filterCategory === 'all' || project.category === filterCategory;
      const matchStack =
        filterStack === 'all' || project.stack?.some((tech) => tech.toLowerCase() === filterStack.toLowerCase());
      return matchCategory && matchStack;
    });
  }, [projects, filterCategory, filterStack]);

  return (
    <div className="space-y-8">
      <FilterBar options={categoryOptions} value={filterCategory} onChange={setFilterCategory} ariaLabel="Filter projects by category" />
      <FilterBar options={stackOptions} value={filterStack} onChange={setFilterStack} ariaLabel="Filter projects by technology stack" />
      <motion.div layout transition={spring} className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence initial={false}>
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {visibleProjects.length === 0 && (
        <div className="rounded-card border border-dashed border-[color:var(--line-1)] bg-[color:rgba(11,16,22,0.52)] p-10 text-sm text-[color:var(--text-3)]">
          No projects match that filter yet. Try adjusting your filters or clear them.
        </div>
      )}
    </div>
  );
}

