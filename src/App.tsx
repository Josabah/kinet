import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageLoader from "@/components/PageLoader";
import ScrollToTop from "@/components/ScrollToTop";
import { BLOGS_PATH, blogPath } from "@/lib/blogPaths";

const Index = lazy(() => import("./pages/Index"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectCaseStudy = lazy(() => import("./pages/ProjectCaseStudy"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Story = lazy(() => import("./pages/Story"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RedirectBlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={blogPath(slug ?? '')} replace />;
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Index />} />
          <Route path="/capabilities" element={<Navigate to="/services" replace />} />
          <Route path="/tech" element={<Navigate to="/services" replace />} />
          <Route path="/process" element={<Index />} />
          <Route path="/why-kinet" element={<Navigate to="/" replace />} />
          <Route path="/faq" element={<Index />} />
          <Route path="/contact" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/story" element={<Story />} />
          <Route path="/social-story" element={<Navigate to="/story" replace />} />
          <Route path={BLOGS_PATH} element={<Blog />} />
          <Route path={`${BLOGS_PATH}/:slug`} element={<BlogPost />} />
          <Route path="/blog" element={<Navigate to={BLOGS_PATH} replace />} />
          <Route path="/blog/:slug" element={<RedirectBlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
