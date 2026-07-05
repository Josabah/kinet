import { projects } from '@/data/projects';
import ProjectShowcaseCard from '@/components/projects/ProjectShowcaseCard';

const FeaturedWork = () => {
  const marqueeItems = [...projects, ...projects];

  return (
    <section aria-label="Featured client work" className="relative z-10 -mt-1 pb-8 md:-mt-6 md:pb-16">
      <div className="overflow-hidden">
        <div className="flex w-max gap-3 px-4 work-marquee-track sm:gap-4 sm:px-6 md:gap-6">
          {marqueeItems.map((project, index) => (
            <ProjectShowcaseCard key={`${project.slug}-${index}`} project={project} variant="marquee" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
