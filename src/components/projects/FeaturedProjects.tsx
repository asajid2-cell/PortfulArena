import type { ArenaProject } from '../../lib/types';
import { ProjectCard } from './ProjectCard';

interface FeaturedProjectsProps {
  projects: ArenaProject[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {projects.slice(0, 4).map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}

