import { Link } from 'react-router-dom';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

type ProjectShowcaseCardProps = {
  project: Project;
  variant?: 'marquee' | 'grid';
};

const ProjectShowcaseCard = ({ project, variant = 'grid' }: ProjectShowcaseCardProps) => {
  const isMarquee = variant === 'marquee';

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        'group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl',
        isMarquee && 'w-[min(88vw,420px)] shrink-0 snap-start',
      )}
    >
      <article
        className={cn(
          'overflow-hidden rounded-3xl border border-border bg-card/40 transition-all duration-300',
          'hover:border-primary/30 hover:shadow-[0_24px_48px_-24px_rgba(16,24,40,0.18)]',
        )}
      >
        <div className="overflow-hidden border-b border-border/60 bg-muted/20">
          <img
            src={project.heroImage}
            alt={`${project.name} homepage screenshot`}
            className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="p-6 sm:p-7">
          <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            {project.serviceTag}
          </span>
          <h3 className="mt-4 font-display text-h5 font-bold text-heading">{project.name}</h3>
          <p className="mt-2 text-body text-muted-foreground">{project.category}</p>
          <p className="mt-4 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
            View case study →
          </p>
        </div>
      </article>
    </Link>
  );
};

export default ProjectShowcaseCard;
