import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageGridBackground from '@/components/PageGridBackground';
import ProjectShowcaseCard from '@/components/projects/ProjectShowcaseCard';
import { projects } from '@/data/projects';

const Projects = () => (
  <div className="min-h-screen bg-background text-foreground relative">
    <Helmet>
      <title>Projects | Kinet</title>
      <meta
        name="description"
        content="Selected client work from Kinet: production websites, marketplaces, and platforms built for real outcomes."
      />
      <link rel="canonical" href="https://kinetsolutions.dev/projects" />
    </Helmet>
    <Header />
    <main id="main-content" className="relative pt-24 md:pt-28" tabIndex={-1}>
      <PageGridBackground />

      <div className="container relative z-10 mx-auto px-6 section-padding">
        <header className="section-header max-w-prose">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Selected work
          </p>
          <h1 className="section-title text-h2 md:text-h1">Projects</h1>
          <p className="section-lead mx-0 text-left">
            Production builds for communities, marketplaces, and founders, focused on outcomes staff and users can
            rely on after launch.
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
