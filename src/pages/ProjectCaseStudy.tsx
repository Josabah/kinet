import { type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageGridBackground from '@/components/PageGridBackground';
import { getProjectBySlug } from '@/data/projects';

const CaseStudySection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="border-t border-border pt-10 md:pt-12">
    <h2 className="font-display text-h4 md:text-h3 font-bold text-heading mb-4">{title}</h2>
    <p className="text-body text-muted-foreground leading-relaxed max-w-prose">{children}</p>
  </section>
);

const ProjectCaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Helmet>
        <title>{project.name} | Projects | Kinet</title>
        <meta name="description" content={`${project.name}: ${project.outcome.slice(0, 140)}`} />
        <link rel="canonical" href={`https://kinetsolutions.dev/projects/${project.slug}`} />
      </Helmet>
      <Header />
      <main id="main-content" className="relative pt-24 md:pt-28" tabIndex={-1}>
        <PageGridBackground />

        <div className="container relative z-10 mx-auto px-6 pb-24 md:pb-32">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-heading mb-10"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All projects
          </Link>

          <header className="max-w-3xl mb-12 md:mb-16">
            <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              {project.serviceTag}
            </span>
            <h1 className="mt-5 font-display text-h2 md:text-h1 font-bold text-heading text-balance">
              {project.name}
            </h1>
            <p className="mt-4 text-lead text-muted-foreground">{project.category}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-heading hover:text-heading/70 transition-colors"
            >
              Visit live site
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </header>

          <figure className="mb-16 md:mb-20 overflow-hidden rounded-3xl border border-border bg-muted/20 shadow-[0_24px_64px_-32px_rgba(16,24,40,0.2)]">
            <img
              src={project.heroImage}
              alt={`${project.name} homepage`}
              className="block w-full h-auto"
              decoding="async"
            />
          </figure>

          <div className="grid gap-10 md:gap-12 max-w-3xl">
            <CaseStudySection title="Background">{project.problem}</CaseStudySection>
            <CaseStudySection title="What we built">{project.built}</CaseStudySection>
            <CaseStudySection title="Results">{project.outcome}</CaseStudySection>
          </div>

          {project.screenshots.length > 1 && (
            <section className="mt-20 md:mt-24">
              <h2 className="font-display text-h3 md:text-h2 font-bold text-heading mb-10">More screens</h2>
              <div className="grid gap-8 md:gap-10">
                {project.screenshots.slice(1).map((shot) => (
                  <figure key={shot.src} className="overflow-hidden rounded-2xl border border-border bg-muted/20">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      className="block w-full h-auto"
                      loading="lazy"
                      decoding="async"
                    />
                    {shot.caption && (
                      <figcaption className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
                        {shot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          <div className="mt-20 md:mt-24 rounded-3xl border border-border bg-muted/40 px-8 py-10 md:px-12 md:py-12 text-center">
            <h2 className="font-display text-h4 md:text-h3 font-bold text-heading mb-3">Working on something similar?</h2>
            <p className="text-body text-muted-foreground max-w-prose mx-auto mb-8">
              We take on a small number of builds at a time, from marketing sites to full products.
            </p>
            <Link to="/contact" className="btn-primary min-w-[240px]">
              Discuss your product
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectCaseStudy;
