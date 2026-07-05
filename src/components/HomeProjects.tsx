import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectShowcaseCard from '@/components/projects/ProjectShowcaseCard';
import { projects } from '@/data/projects';

const HomeProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding relative">
      <div ref={ref} className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-prose mx-auto text-center section-header"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Selected work
          </p>
          <h2 className="section-title text-h3 sm:text-h2">Projects</h2>
          <p className="section-lead">
            Production builds for communities, marketplaces, and founders, focused on outcomes staff and users can rely
            on after launch.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          className="grid gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {projects.map((project) => (
            <ProjectShowcaseCard key={project.slug} project={project} variant="grid" />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="mt-12 md:mt-16 text-center"
        >
          <Link to="/projects" className="text-sm font-semibold text-primary transition-colors hover:text-primary/80">
            View all projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeProjects;
