import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageGridBackground from '@/components/PageGridBackground';
import ProjectShowcaseCard from '@/components/projects/ProjectShowcaseCard';
import SeoHead from '@/components/SeoHead';
import { projects } from '@/data/projects';
import { pageSeo } from '@/config/seo';
import { buildProjectsCollectionJsonLd } from '@/lib/seoJsonLd';

const Projects = () => (
  <div className="min-h-screen bg-background text-foreground relative">
    <SeoHead
      title={pageSeo.projects.title}
      description={pageSeo.projects.description}
      path={pageSeo.projects.path}
      jsonLd={buildProjectsCollectionJsonLd(projects)}
    />
    <Header />
    <main id="main-content" className="relative pt-24 md:pt-28" tabIndex={-1}>
      <PageGridBackground />

      <div className="container relative z-10 mx-auto max-w-6xl px-6 section-padding">
        <header className="section-header mx-auto max-w-prose text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Selected work
          </p>
          <h1 className="section-title text-h2 md:text-h1">Projects</h1>
          <p className="section-lead">
            Production builds for education, communities, marketplaces, and founders, focused on outcomes staff and
            users can rely on after launch.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {projects.map((project) => (
            <ProjectShowcaseCard key={project.slug} project={project} variant="grid" />
          ))}
        </div>

        <div className="mt-16 md:mt-20 text-center">
          <p className="text-body text-muted-foreground mb-6">Building something similar?</p>
          <Link to="/contact" className="btn-primary min-w-[240px]">
            Discuss your product
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Projects;
