type ProjectScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  serviceTag: string;
  url: string;
  heroImage: string;
  stack: string[];
  problem: string;
  built: string;
  outcome: string;
  screenshots: ProjectScreenshot[];
};

export const projects: Project[] = [
  {
    slug: 'kiduspetros',
    name: 'Kidus Petros Gibi Gubae',
    category: 'Church Website & CMS',
    serviceTag: 'Web Development',
    url: 'https://kiduspetros.com',
    heroImage: '/projects/kiduspetros/hero.png',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    problem:
      'The organization needed a public site their team could keep current without hiring a developer for every event photo or schedule change.',
    built:
      'We built the public website and a custom admin portal so staff can publish events, manage gallery media, and respond to contact submissions on their own.',
    outcome:
      'Three administrators now handle day-to-day updates independently. The church owns the site and the content, with no ongoing dev dependency.',
    screenshots: [
      {
        src: '/projects/kiduspetros/hero.png',
        alt: 'Kidus Petros Gibi Gubae homepage',
        caption: 'Homepage with bilingual navigation.',
      },
      {
        src: '/projects/kiduspetros/about.png',
        alt: 'Kidus Petros about page',
        caption: 'About page with mission and history.',
      },
      {
        src: '/projects/kiduspetros/gallery.png',
        alt: 'Kidus Petros public photo gallery',
        caption: 'Public gallery with filters for holidays, services, and community events.',
      },
      {
        src: '/projects/kiduspetros/admin.png',
        alt: 'Kidus Petros admin CMS',
        caption: 'Admin portal where staff upload and manage gallery images.',
      },
    ],
  },
  {
    slug: 'povet',
    name: 'POV.ET',
    category: 'Ethiopian Photography Archive',
    serviceTag: 'Web & App Development',
    url: 'https://povet.vercel.app',
    heroImage: '/projects/povet/hero.png',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Cloudflare R2', 'Vercel'],
    problem:
      'A photography community was sharing strong work in Telegram, but nothing stayed archived, searchable, or easy to share outside the group.',
    built:
      'POV.ET syncs Telegram submissions into a public gallery with contributor profiles, tags, and pages built for search and social sharing.',
    outcome:
      '1,049 photos across 163 contributor categories, imported automatically. The community has a permanent home for the work instead of a disappearing chat feed.',
    screenshots: [
      {
        src: '/projects/povet/hero.png',
        alt: 'POV.ET community photography gallery',
        caption: 'Contributor grid with handles and locations.',
      },
      {
        src: '/projects/povet/explore.png',
        alt: 'POV.ET explore page',
        caption: 'Explore view for browsing the archive.',
      },
      {
        src: '/projects/povet/post.png',
        alt: 'POV.ET photo post page',
        caption: 'Multi-photo posts with captions and tags.',
      },
      {
        src: '/projects/povet/image-detail.png',
        alt: 'POV.ET single image detail view',
        caption: 'Full-screen view with location, hashtags, and related shots.',
      },
    ],
  },
  {
    slug: 'brije',
    name: 'Brije',
    category: 'Brand–Creator Marketplace',
    serviceTag: 'Web & App Development',
    url: 'https://brije.vercel.app',
    heroImage: '/projects/brije/hero.png',
    stack: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    problem:
      'Brands and creators were coordinating paid campaigns over DMs with no shared record of applications, approvals, or ongoing conversations.',
    built:
      'A two-sided marketplace with TikTok verification, synced creator profiles, campaign workflows, and in-app messaging for both sides.',
    outcome:
      'Discovery, applications, and campaign chat now live in one place instead of scattered threads and spreadsheets.',
    screenshots: [
      {
        src: '/projects/brije/hero.png',
        alt: 'Brije creator discovery landing page',
        caption: 'Landing page with creator search preview.',
      },
      {
        src: '/projects/brije/brand-dashboard.png',
        alt: 'Brije brand dashboard',
        caption: 'Brand view for campaigns and creator recommendations.',
      },
      {
        src: '/projects/brije/creator-dashboard.png',
        alt: 'Brije creator dashboard',
        caption: 'Creator view with TikTok sync, stats, and invitations.',
      },
      {
        src: '/projects/brije/campaign-chats.png',
        alt: 'Brije campaign messaging',
        caption: 'Campaign-scoped chat between brand and creator.',
      },
    ],
  },
  {
    slug: 'unscriptedcodes',
    name: 'Unscripted Codes',
    category: 'Engineering Blog & Digital Products',
    serviceTag: 'Web Development',
    url: 'https://unscriptedcodes.me',
    heroImage: '/projects/unscriptedcodes/hero.png',
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Stripe'],
    problem:
      'Publishing articles and selling digital products often means wiring together auth, payments, and access control across separate services.',
    built:
      'One platform with email and Google sign-in, password recovery, and Stripe webhooks that unlock products as soon as payment clears.',
    outcome:
      'Content, accounts, and payments run in a single flow. No manual fulfillment or duct-tape access rules.',
    screenshots: [
      {
        src: '/projects/unscriptedcodes/hero.png',
        alt: 'Unscripted Codes homepage',
        caption: 'Homepage for the engineering publication.',
      },
      {
        src: '/projects/unscriptedcodes/blogs.png',
        alt: 'Unscripted Codes blog listing',
        caption: 'Article index with tags and read times.',
      },
      {
        src: '/projects/unscriptedcodes/signup.png',
        alt: 'Unscripted Codes signup flow',
        caption: 'Registration with password checks and Google sign-in.',
      },
    ],
  },
];

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
