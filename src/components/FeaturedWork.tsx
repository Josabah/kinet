import { projects } from '@/data/projects';
import ProjectShowcaseCard from '@/components/projects/ProjectShowcaseCard';

const FeaturedWork = () => {
  const marqueeItems = [...projects, ...projects];

  return (
    <section aria-label="Featured client work" className="relative z-10 -mt-4 pb-16 md:-mt-8 md:pb-24">
      <div className="overflow-hidden">
        <div className="flex w-max gap-5 px-6 work-marquee-track md:gap-6">
          {marqueeItems.map((project, index) => (
            <ProjectShowcaseCard key={`${project.slug}-${index}`} project={project} variant="marquee" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
