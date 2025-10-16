export interface ArenaProject {
  slug: string;
  title: string;
  summary: string;
  description?: string;
  problem?: string;
  insight?: string;
  approach?: string;
  outcome?: string;
  role?: string;
  category: string;
  stack: string[];
  metrics?: Array<{ label: string; value: string }>;
  links?: Array<{ label: string; href: string }>;
  heroImage?: string;
  heroVideo?: string;
  featured?: boolean;
  order?: number;
  publishedAt?: string;
}
