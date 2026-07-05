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
        'group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-3xl',
        isMarquee && 'w-[min(68vw,240px)] sm:w-[min(72vw,300px)] md:w-[min(88vw,420px)] shrink-0 snap-start',
      )}
    >
      <article
        className={cn(
          'overflow-hidden rounded-3xl border border-border bg-card/40 transition-all duration-300',
          'hover:border-heading/15 hover:shadow-[0_24px_48px_-24px_rgba(16,24,40,0.18)]',
        )}
      >
        <div className={cn('overflow-hidden border-b border-border/60 bg-muted/20', isMarquee && 'max-h-[140px] sm:max-h-none')}>
          <img
            src={project.heroImage}
            alt={`${project.name} homepage screenshot`}
            className={cn(
              'block w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]',
              isMarquee && 'max-h-[140px] sm:max-h-none object-cover object-top sm:object-center',
            )}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className={cn(isMarquee ? 'p-3 sm:p-4' : 'p-6 sm:p-7')}>
          <span className="inline-flex rounded-full border border-border bg-background px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-muted-foreground">
            {project.serviceTag}
          </span>
          <h3 className={cn(
            'font-display font-bold text-heading',
            isMarquee ? 'mt-1.5 text-sm sm:text-base' : 'mt-4 text-h5',
          )}>
            {project.name}
          </h3>
          {!isMarquee && <p className="mt-2 text-body text-muted-foreground">{project.category}</p>}
          <p className={cn(
            'font-medium text-heading/70 transition-colors group-hover:text-heading',
            isMarquee ? 'mt-2 text-xs sm:text-sm' : 'mt-4 text-sm',
          )}>
            View case study →
          </p>
        </div>
      </article>
    </Link>
  );
};

export default ProjectShowcaseCard;
