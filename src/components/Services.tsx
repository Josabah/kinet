import { useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { TechPillRow, TechStackRow } from '@/components/capabilityTechIcons';
import { cn } from '@/lib/utils';

const ACCENT = '#2f39ba';
const INK = '#101828';
const MUTED = '#98A2B3';
const LINE = '#E4E7EC';
const FILL = '#F9FAFB';

type Service = {
  id: string;
  label: string;
  title: string;
  description: string;
  technologies: string[];
  pillTechnologies?: string[];
  usePills?: boolean;
  illustration: ReactNode;
};

const transition = { duration: 0.2, ease: 'easeOut' as const };

const contentMotion = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition,
};

const WebIllustration = () => (
  <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden>
    <rect x="24" y="20" width="432" height="280" rx="12" stroke={LINE} strokeWidth="1.5" fill="#fff" />
    <rect x="24" y="20" width="432" height="36" rx="12" fill={FILL} />
    <line x1="24" y1="56" x2="456" y2="56" stroke={LINE} />
    <circle cx="44" cy="38" r="4" fill={MUTED} opacity="0.5" />
    <circle cx="58" cy="38" r="4" fill={MUTED} opacity="0.5" />
    <circle cx="72" cy="38" r="4" fill={MUTED} opacity="0.5" />
    <rect x="40" y="72" width="88" height="212" rx="6" fill={FILL} stroke={LINE} />
    <rect x="48" y="88" width="56" height="6" rx="3" fill={LINE} />
    <rect x="48" y="104" width="48" height="6" rx="3" fill={ACCENT} opacity="0.35" />
    <rect x="48" y="120" width="52" height="6" rx="3" fill={LINE} />
    <rect x="48" y="136" width="44" height="6" rx="3" fill={LINE} />
    <rect x="140" y="72" width="296" height="32" rx="6" fill={FILL} stroke={LINE} />
    <rect x="152" y="84" width="80" height="8" rx="4" fill={INK} opacity="0.12" />
    <rect x="140" y="116" width="140" height="80" rx="8" fill={FILL} stroke={LINE} />
    <rect x="152" y="132" width="48" height="6" rx="3" fill={INK} opacity="0.15" />
    <path d="M152 156 L220 148 L268 162 L220 172 Z" stroke={ACCENT} strokeWidth="2" fill={ACCENT} fillOpacity="0.08" />
    <rect x="292" y="116" width="144" height="80" rx="8" fill={FILL} stroke={LINE} />
    <rect x="304" y="132" width="56" height="6" rx="3" fill={INK} opacity="0.15" />
    <rect x="304" y="148" width="112" height="32" rx="4" fill={ACCENT} opacity="0.12" />
    <rect x="140" y="208" width="296" height="76" rx="8" fill={FILL} stroke={LINE} />
    <rect x="152" y="224" width="64" height="6" rx="3" fill={INK} opacity="0.15" />
    <rect x="152" y="240" width="268" height="8" rx="4" fill={LINE} />
    <rect x="152" y="256" width="220" height="8" rx="4" fill={LINE} />
    <rect x="152" y="272" width="180" height="8" rx="4" fill={LINE} />
  </svg>
);

const MobileIllustration = () => (
  <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden>
    <rect x="168" y="16" width="144" height="288" rx="24" stroke={INK} strokeWidth="1.5" fill="#fff" />
    <rect x="208" y="32" width="64" height="8" rx="4" fill={FILL} stroke={LINE} />
    <rect x="184" y="56" width="112" height="6" rx="3" fill={INK} opacity="0.12" />
    <rect x="184" y="76" width="72" height="6" rx="3" fill={MUTED} opacity="0.4" />
    <rect x="184" y="100" width="112" height="64" rx="10" fill={FILL} stroke={LINE} />
    <circle cx="212" cy="124" r="12" fill={ACCENT} fillOpacity="0.15" stroke={ACCENT} strokeWidth="1.5" />
    <rect x="232" y="116" width="52" height="6" rx="3" fill={INK} opacity="0.15" />
    <rect x="232" y="128" width="40" height="5" rx="2.5" fill={LINE} />
    <rect x="184" y="176" width="112" height="48" rx="10" fill={FILL} stroke={LINE} />
    <rect x="196" y="190" width="48" height="5" rx="2.5" fill={INK} opacity="0.12" />
    <rect x="196" y="202" width="72" height="5" rx="2.5" fill={LINE} />
    <rect x="184" y="236" width="112" height="48" rx="10" fill={FILL} stroke={LINE} />
    <rect x="196" y="250" width="56" height="5" rx="2.5" fill={INK} opacity="0.12" />
    <rect x="196" y="262" width="64" height="5" rx="2.5" fill={LINE} />
    <rect x="200" y="292" width="80" height="4" rx="2" fill={LINE} />
  </svg>
);

const BackendIllustration = () => (
  <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden>
    {[
      { x: 32, label: 'Client' },
      { x: 148, label: 'API' },
      { x: 264, label: 'Services' },
      { x: 368, label: 'Database' },
    ].map((node, i) => (
      <g key={node.label}>
        <rect x={node.x} y="120" width="96" height="80" rx="10" fill="#fff" stroke={i === 1 ? ACCENT : LINE} strokeWidth={i === 1 ? 2 : 1.5} />
        <rect x={node.x + 16} y="144" width="64" height="6" rx="3" fill={i === 1 ? ACCENT : INK} fillOpacity={i === 1 ? 0.25 : 0.12} />
        <rect x={node.x + 16} y="158" width="48" height="5" rx="2.5" fill={LINE} />
        <rect x={node.x + 16} y="170" width="56" height="5" rx="2.5" fill={LINE} />
        <text x={node.x + 48} y="108" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
          {node.label}
        </text>
        {i < 3 && (
          <>
            <line x1={node.x + 96} y1="160" x2={node.x + 112} y2="160" stroke={LINE} strokeWidth="1.5" />
            <path d={`M${node.x + 108} 156 L${node.x + 116} 160 L${node.x + 108} 164`} fill={MUTED} />
          </>
        )}
      </g>
    ))}
    <rect x="80" y="228" width="320" height="48" rx="8" fill={FILL} stroke={LINE} strokeDasharray="4 4" />
    <text x="240" y="256" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
      Stable under growth
    </text>
  </svg>
);

const AIIllustration = () => (
  <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden>
    {[
      { x: 40, label: 'User' },
      { x: 148, label: 'AI' },
      { x: 256, label: 'Knowledge' },
      { x: 364, label: 'Action' },
    ].map((node, i) => (
      <g key={node.label}>
        <rect
          x={node.x}
          y="130"
          width={i === 1 ? 88 : 80}
          height="72"
          rx="10"
          fill="#fff"
          stroke={i === 1 ? ACCENT : LINE}
          strokeWidth={i === 1 ? 2 : 1.5}
        />
        {i === 0 && <circle cx={node.x + 40} cy="158" r="14" stroke={INK} strokeWidth="1.5" fill={FILL} />}
        {i === 1 && (
          <>
            <circle cx={node.x + 44} cy="158" r="16" stroke={ACCENT} strokeWidth="1.5" fill={ACCENT} fillOpacity="0.1" />
            <circle cx={node.x + 44} cy="158" r="4" fill={ACCENT} />
          </>
        )}
        {i === 2 && (
          <>
            <rect x={node.x + 16} y="148" width="48" height="32" rx="4" fill={FILL} stroke={LINE} />
            <line x1={node.x + 24} y1="158" x2={node.x + 56} y2="158" stroke={LINE} />
            <line x1={node.x + 24} y1="168" x2={node.x + 48} y2="168" stroke={LINE} />
          </>
        )}
        {i === 3 && <rect x={node.x + 20} y="150" width="40" height="32" rx="6" fill={ACCENT} fillOpacity="0.15" stroke={ACCENT} strokeWidth="1.5" />}
        <text x={node.x + (i === 1 ? 44 : 40)} y="118" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
          {node.label}
        </text>
        {i < 3 && (
          <>
            <line x1={node.x + (i === 1 ? 88 : 80)} y1="166" x2={node.x + (i === 1 ? 104 : 100)} y2="166" stroke={LINE} strokeWidth="1.5" />
            <path
              d={`M${node.x + (i === 1 ? 100 : 96)} 162 L${node.x + (i === 1 ? 108 : 104)} 166 L${node.x + (i === 1 ? 100 : 96)} 170`}
              fill={MUTED}
            />
          </>
        )}
      </g>
    ))}
  </svg>
);

const DesignIllustration = () => (
  <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" aria-hidden>
    <rect x="32" y="48" width="200" height="224" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" strokeDasharray="6 4" />
    <rect x="52" y="72" width="120" height="8" rx="4" stroke={MUTED} strokeWidth="1" fill="none" />
    <rect x="52" y="92" width="80" height="6" rx="3" stroke={MUTED} strokeWidth="1" fill="none" />
    <rect x="52" y="116" width="160" height="64" rx="6" stroke={MUTED} strokeWidth="1" fill="none" />
    <line x1="52" y1="196" x2="180" y2="196" stroke={MUTED} strokeWidth="1" />
    <line x1="52" y1="212" x2="140" y2="212" stroke={MUTED} strokeWidth="1" />
    <line x1="52" y1="228" x2="160" y2="228" stroke={MUTED} strokeWidth="1" />
    <text x="132" y="36" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
      Wireframe
    </text>
    <path d="M248 160 L272 160" stroke={ACCENT} strokeWidth="2" />
    <path d="M264 152 L272 160 L264 168" fill={ACCENT} />
    <rect x="280" y="48" width="168" height="224" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
    <rect x="296" y="72" width="96" height="8" rx="4" fill={INK} fillOpacity="0.15" />
    <rect x="296" y="92" width="64" height="6" rx="3" fill={MUTED} opacity="0.5" />
    <rect x="296" y="116" width="136" height="64" rx="8" fill={FILL} stroke={LINE} />
    <rect x="308" y="132" width="48" height="32" rx="4" fill={ACCENT} fillOpacity="0.15" />
    <rect x="364" y="132" width="56" height="6" rx="3" fill={INK} fillOpacity="0.12" />
    <rect x="364" y="144" width="40" height="5" rx="2.5" fill={LINE} />
    <rect x="296" y="196" width="136" height="56" rx="8" fill={FILL} stroke={LINE} />
    <rect x="308" y="212" width="80" height="6" rx="3" fill={INK} fillOpacity="0.12" />
    <rect x="308" y="226" width="112" height="5" rx="2.5" fill={LINE} />
    <text x="364" y="36" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
      Interface
    </text>
  </svg>
);

const services: Service[] = [
  {
    id: 'web',
    label: 'Web Apps',
    title: 'Web applications',
    description: 'Build products that grow with your business.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'Cloudflare',
      'Vercel',
    ],
    illustration: <WebIllustration />,
  },
  {
    id: 'mobile',
    label: 'Mobile Apps',
    title: 'Mobile apps',
    description: 'Native experiences across iOS and Android.',
    technologies: ['Flutter', 'React Native', 'Firebase', 'Supabase', 'App Store', 'Google Play'],
    illustration: <MobileIllustration />,
  },
  {
    id: 'backend',
    label: 'Backend',
    title: 'Backend',
    description: 'Systems your product can depend on.',
    technologies: [
      'Node.js',
      'FastAPI',
      'Go',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'REST',
      'CI/CD',
      'GraphQL',
      'Stripe',
    ],
    illustration: <BackendIllustration />,
  },
  {
    id: 'ai',
    label: 'AI',
    title: 'AI & Automation',
    description: 'Useful AI. Not AI for the sake of AI.',
    technologies: [
      'Python',
      'FastAPI',
      'OpenAI',
      'Anthropic',
      'Gemini',
      'MCP',
      'LangGraph',
      'Redis',
    ],
    pillTechnologies: ['RAG', 'Vector Databases'],
    illustration: <AIIllustration />,
  },
  {
    id: 'design',
    label: 'Design',
    title: 'Product Design',
    description: 'Thoughtful products start before development.',
    technologies: ['UXUI', 'Wireframes', 'Prototypes', 'Design Systems', 'Accessibility'],
    usePills: true,
    illustration: <DesignIllustration />,
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeId, setActiveId] = useState(services[0].id);

  const active = services.find((service) => service.id === activeId) ?? services[0];

  return (
    <section id="services" className="section-padding relative">
      <div ref={ref} className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-prose mx-auto text-center section-header"
        >
          <h2 className="section-title text-h3 sm:text-h2">
            Built on modern foundations.
          </h2>
          <p className="section-lead">
            The right technology matters. Choosing it well matters even more.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          className="section-header"
          role="tablist"
          aria-label="Services"
        >
          <div className="service-tablist mx-auto max-w-5xl">
            {services.map((service) => {
              const isActive = service.id === activeId;

              return (
                <button
                  key={service.id}
                  type="button"
                  id={`service-tab-${service.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-${service.id}`}
                  onClick={() => setActiveId(service.id)}
                  className={cn(
                    'service-tab',
                    isActive && 'service-tab-active',
                  )}
                >
                  {service.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start md:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.id}-illustration`}
              {...contentMotion}
              className="order-1 md:order-2 flex items-center justify-center md:justify-start md:sticky md:top-24"
              aria-hidden
            >
              <div className="w-full max-w-sm sm:max-w-md md:max-w-none mx-auto md:mx-0">{active.illustration}</div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              {...contentMotion}
              id={`service-panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${active.id}`}
              className="order-2 md:order-1 text-center md:text-left"
            >
              <h3 className="text-h4 sm:text-h3 font-display font-bold text-heading mb-4 max-w-lg mx-auto md:mx-0">
                {active.title}
              </h3>

              <p className="text-body text-muted-foreground mb-8 max-w-prose-sm mx-auto md:mx-0">
                {active.description}
              </p>

              <div className="max-w-lg mx-auto md:mx-0 overflow-visible">
                <div className="flex justify-center md:justify-start overflow-visible">
                  {active.usePills ? (
                    <TechPillRow items={active.technologies} animated className="md:justify-start" />
                  ) : (
                    <TechStackRow
                      technologies={active.technologies}
                      pills={active.pillTechnologies ?? []}
                      className="md:justify-start"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Services;
