import {
  siAnthropic,
  siDocker,
  siFastapi,
  siFirebase,
  siFlutter,
  siGo,
  siGooglegemini,
  siGraphql,
  siLanggraph,
  siModelcontextprotocol,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from 'simple-icons';
import { AppStoreIcon, CiCdIcon, CloudflareIcon, GooglePlayIcon, RestApiIcon, StripeIcon } from '@/components/officialBrandIcons';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TechIconProps = { className?: string };

const iconClass = 'w-7 h-7';

const BrandIcon = ({
  icon,
  className = iconClass,
}: {
  icon: SimpleIcon;
  className?: string;
}) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={icon.path} fill={`#${icon.hex}`} />
  </svg>
);

/** OpenAI Blossom symbol — openai.com/brand (Feb 2025) */
const OpenAIIcon = ({ className = iconClass }: TechIconProps) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#000000"
      d="M11.248 18.25q-.825 0-1.568-.314a4.3 4.3 0 0 1-1.32-.874 4 4 0 0 1-1.304.214 4 4 0 0 1-2.046-.544 4.27 4.27 0 0 1-1.518-1.485 4 4 0 0 1-.56-2.095q0-.48.131-1.04A4.4 4.4 0 0 1 2.04 10.71a4.07 4.07 0 0 1 .017-3.4 4.2 4.2 0 0 1 1.056-1.418 3.8 3.8 0 0 1 1.6-.842 3.9 3.9 0 0 1 .76-1.683q.593-.759 1.451-1.188a4.04 4.04 0 0 1 1.832-.429q.825 0 1.567.313.742.314 1.32.875a4 4 0 0 1 1.304-.215q1.106 0 2.046.545a4.14 4.14 0 0 1 1.501 1.485q.578.941.578 2.095 0 .48-.132 1.04.66.61 1.023 1.419.363.792.363 1.666 0 .892-.38 1.717a4.3 4.3 0 0 1-1.072 1.435 3.8 3.8 0 0 1-1.584.825 3.8 3.8 0 0 1-.775 1.683 4.06 4.06 0 0 1-1.436 1.188 4.04 4.04 0 0 1-1.832.429m-4.076-2.062q.825 0 1.435-.347l3.103-1.782a.36.36 0 0 0 .164-.313v-1.42L7.881 14.62a.67.67 0 0 1-.726 0l-3.118-1.798a.5.5 0 0 1-.017.115v.198q0 .841.396 1.551.413.693 1.139 1.089a3.2 3.2 0 0 0 1.617.412m.165-2.69a.4.4 0 0 0 .181.05q.083 0 .165-.05l1.238-.71-3.977-2.31a.7.7 0 0 1-.363-.643v-3.58q-.825.362-1.32 1.122a2.9 2.9 0 0 0-.495 1.65q0 .809.413 1.55.412.743 1.072 1.123zm3.91 3.663q.875 0 1.585-.396a2.96 2.96 0 0 0 1.534-2.64v-3.564a.32.32 0 0 0-.165-.297l-1.254-.726v4.604a.7.7 0 0 1-.363.643l-3.119 1.799a3 3 0 0 0 1.783.577m.627-6.039V8.878L10.01 7.822 8.129 8.878v2.244l1.881 1.056zM7.057 5.859a.7.7 0 0 1 .363-.644l3.119-1.798a3 3 0 0 0-1.782-.578q-.874 0-1.584.396A2.96 2.96 0 0 0 6.05 4.324a3.07 3.07 0 0 0-.396 1.551v3.547q0 .199.165.314l1.237.726zm8.383 7.887q.825-.364 1.303-1.123.495-.758.495-1.65a3.15 3.15 0 0 0-.412-1.55q-.413-.743-1.073-1.123l-3.086-1.782q-.099-.065-.181-.049a.3.3 0 0 0-.165.05l-1.238.692 3.993 2.327a.6.6 0 0 1 .264.264.64.64 0 0 1 .1.363zm-3.317-8.382a.63.63 0 0 1 .726 0l3.135 1.831v-.297q0-.792-.396-1.501a2.86 2.86 0 0 0-1.105-1.155q-.71-.43-1.65-.43-.825 0-1.436.347L8.294 5.941a.36.36 0 0 0-.165.314v1.418z"
    />
  </svg>
);

/** React Native atom logo — reactnative.dev */
const ReactNativeIcon = ({ className = iconClass }: TechIconProps) => (
  <svg viewBox="0 0 112 102" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path
      d="m56 61.832c5.891 0 10.667-4.776 10.667-10.667s-4.777-10.667-10.667-10.667-10.666 4.776-10.666 10.667 4.774 10.667 10.666 10.667z"
      fill="#61DAFB"
    />
    <g stroke="#61DAFB" strokeWidth="5.333" fill="none">
      <path d="m56 75.165c29.455 0 53.333-10.745 53.333-24s-23.878-24-53.333-24-53.334 10.745-53.334 24 23.879 24 53.334 24z" />
      <path d="m35.215 63.165c14.728 25.509 35.972 40.815 47.451 34.188 11.48-6.628 8.846-32.68-5.882-58.188-14.727-25.51-35.972-40.816-47.45-34.188-11.48 6.627-8.846 32.679 5.881 58.188z" />
      <path d="m35.215 39.165c-14.727 25.509-17.36 51.56-5.882 58.188 11.48 6.627 32.724-8.68 47.451-34.188 14.728-25.51 17.362-51.56 5.883-58.188-11.48-6.628-32.724 8.679-47.452 34.188z" />
    </g>
  </svg>
);

const TECH_ICON_MAP: Record<string, () => ReactNode> = {
  React: () => <BrandIcon icon={siReact} />,
  'Next.js': () => <BrandIcon icon={siNextdotjs} />,
  TypeScript: () => <BrandIcon icon={siTypescript} />,
  'Tailwind CSS': () => <BrandIcon icon={siTailwindcss} />,
  'Node.js': () => <BrandIcon icon={siNodedotjs} />,
  PostgreSQL: () => <BrandIcon icon={siPostgresql} />,
  MongoDB: () => <BrandIcon icon={siMongodb} />,
  Cloudflare: () => <CloudflareIcon className={iconClass} />,
  Vercel: () => <BrandIcon icon={siVercel} />,
  Flutter: () => <BrandIcon icon={siFlutter} />,
  'React Native': () => <ReactNativeIcon />,
  Firebase: () => <BrandIcon icon={siFirebase} />,
  Supabase: () => <BrandIcon icon={siSupabase} />,
  'App Store': () => <AppStoreIcon className={iconClass} />,
  'Google Play': () => <GooglePlayIcon className={iconClass} />,
  FastAPI: () => <BrandIcon icon={siFastapi} />,
  Go: () => <BrandIcon icon={siGo} />,
  Redis: () => <BrandIcon icon={siRedis} />,
  Docker: () => <BrandIcon icon={siDocker} />,
  GraphQL: () => <BrandIcon icon={siGraphql} />,
  Stripe: () => <StripeIcon className={iconClass} />,
  REST: () => <RestApiIcon className={iconClass} />,
  'CI/CD': () => <CiCdIcon className={iconClass} />,
  Python: () => <BrandIcon icon={siPython} />,
  OpenAI: () => <OpenAIIcon />,
  Anthropic: () => <BrandIcon icon={siAnthropic} />,
  Gemini: () => <BrandIcon icon={siGooglegemini} />,
  MCP: () => <BrandIcon icon={siModelcontextprotocol} />,
  LangGraph: () => <BrandIcon icon={siLanggraph} />,
};

const PILL_LABELS: Record<string, string> = {
  UXUI: 'UX/UI',
};

export const TechIcon = ({ name }: { name: string }) => {
  const Icon = TECH_ICON_MAP[name];
  if (!Icon) return null;
  return <Icon />;
};

export const TechPillRow = ({
  items,
  compact = false,
  animated = false,
  className,
}: {
  items: string[];
  compact?: boolean;
  animated?: boolean;
  className?: string;
}) => (
  <ul
    className={cn(
      'flex flex-wrap items-center justify-center',
      compact ? 'gap-1.5' : 'gap-2',
      className,
    )}
  >
    {items.map((item) => (
      <li key={item}>
        {animated ? (
          <span className="design-pill">
            <span
              className={`design-pill-inner ${compact ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'}`}
            >
              {PILL_LABELS[item] ?? item}
            </span>
          </span>
        ) : (
          <span
            className={
              compact
                ? 'inline-flex rounded-full border border-border bg-white px-2.5 py-0.5 text-[11px] font-medium text-foreground/75'
                : 'inline-flex rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-foreground/75'
            }
          >
            {PILL_LABELS[item] ?? item}
          </span>
        )}
      </li>
    ))}
  </ul>
);

export const TechStackRow = ({
  technologies,
  pills = [],
  className,
}: {
  technologies: string[];
  pills?: string[];
  className?: string;
}) => (
  <div
    className={cn(
      'flex flex-wrap items-center justify-center gap-x-3 gap-y-3 md:gap-x-4 overflow-visible',
      className,
    )}
  >
    <TechIconRow technologies={technologies} className={className} />
    {pills.length > 0 ? <TechPillRow items={pills} compact className={className} /> : null}
  </div>
);

export const TechIconRow = ({
  technologies,
  className,
}: {
  technologies: string[];
  className?: string;
}) => (
  <ul className={cn('flex flex-wrap items-center justify-center gap-3 md:gap-4 overflow-visible', className)}>
    {technologies.map((tech) => (
      <li
        key={tech}
        className="relative overflow-visible [&:hover_[data-tech-label]]:opacity-100 [&:focus-within_[data-tech-label]]:opacity-100"
      >
        <span
          tabIndex={0}
          aria-label={tech}
          title={tech}
          className="inline-flex cursor-default items-center justify-center rounded-md p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <TechIcon name={tech} />
        </span>
        <span
          data-tech-label
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-[calc(100%+6px)] z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#101828] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-150"
        >
          {tech}
        </span>
      </li>
    ))}
  </ul>
);
