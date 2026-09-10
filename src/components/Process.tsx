import { useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const ACCENT = '#2f39ba';
const INK = '#101828';
const MUTED = '#98A2B3';
const LINE = '#E4E7EC';
const FILL = '#F9FAFB';
const PAPER = '#FDFCF9';

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Step = {
  number: string;
  title: string;
  description: string;
  visual: ReactNode;
};

const BriefVisual = () => (
  <svg viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" aria-hidden>
    <rect width="640" height="480" fill={PAPER} />
    <rect x="88" y="56" width="464" height="368" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
    <rect x="88" y="56" width="464" height="48" rx="12" fill={FILL} />
    <rect x="88" y="92" width="464" height="12" fill={FILL} />
    <circle cx="116" cy="80" r="4" fill={MUTED} opacity="0.5" />
    <circle cx="132" cy="80" r="4" fill={MUTED} opacity="0.5" />
    <circle cx="148" cy="80" r="4" fill={MUTED} opacity="0.5" />
    <rect x="176" y="74" width="96" height="8" rx="4" fill={INK} fillOpacity="0.12" />
    {[
      { y: 140, label: 'Business', width: 280, active: false },
      { y: 220, label: 'Users', width: 220, active: false },
      { y: 300, label: 'Goals', width: 312, active: true },
    ].map((row) => (
      <g key={row.label}>
        <text x="120" y={row.y} fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
          {row.label}
        </text>
        <rect
          x="120"
          y={row.y + 10}
          width={row.width}
          height={row.active ? 44 : 36}
          rx="8"
          fill={row.active ? ACCENT : FILL}
          fillOpacity={row.active ? 0.1 : 1}
          stroke={row.active ? ACCENT : LINE}
          strokeWidth={row.active ? 1.5 : 1}
        />
        <rect
          x="136"
          y={row.y + (row.active ? 24 : 22)}
          width={row.active ? 180 : 140}
          height="8"
          rx="4"
          fill={row.active ? ACCENT : INK}
          fillOpacity={row.active ? 0.35 : 0.12}
        />
      </g>
    ))}
  </svg>
);

const MapVisual = () => (
  <svg viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" aria-hidden>
    <rect width="640" height="480" fill={PAPER} />
    <rect x="72" y="72" width="200" height="336" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
    <rect x="92" y="96" width="88" height="8" rx="4" fill={INK} fillOpacity="0.14" />
    {[0, 1, 2, 3, 4].map((index) => (
      <rect
        key={index}
        x="92"
        y={128 + index * 48}
        width={index === 1 ? 152 : 128}
        height="32"
        rx="8"
        fill={index === 1 ? ACCENT : FILL}
        fillOpacity={index === 1 ? 0.12 : 1}
        stroke={index === 1 ? ACCENT : LINE}
      />
    ))}
    <path d="M272 248 H328" stroke={ACCENT} strokeWidth="1.5" />
    <path d="M320 242 L328 248 L320 254" fill={ACCENT} />
    <rect x="328" y="88" width="240" height="304" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
    <rect x="348" y="112" width="120" height="8" rx="4" fill={INK} fillOpacity="0.14" />
    <rect x="348" y="148" width="200" height="72" rx="10" fill={FILL} stroke={LINE} />
    <rect x="364" y="168" width="72" height="8" rx="4" fill={ACCENT} fillOpacity="0.3" />
    <rect x="364" y="184" width="120" height="6" rx="3" fill={LINE} />
    <rect x="348" y="240" width="96" height="112" rx="10" fill={FILL} stroke={LINE} />
    <rect x="452" y="240" width="96" height="112" rx="10" fill={FILL} stroke={ACCENT} strokeWidth="1.5" />
    <rect x="468" y="264" width="64" height="8" rx="4" fill={ACCENT} fillOpacity="0.25" />
    <rect x="468" y="280" width="48" height="6" rx="3" fill={LINE} />
  </svg>
);

const WireVisual = () => (
  <svg viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" aria-hidden>
    <rect width="640" height="480" fill={PAPER} />
    <rect x="64" y="72" width="220" height="336" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" strokeDasharray="6 4" />
    <text x="174" y="52" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
      Wireframe
    </text>
    <rect x="88" y="100" width="120" height="8" rx="4" stroke={MUTED} fill="none" />
    <rect x="88" y="120" width="80" height="6" rx="3" stroke={MUTED} fill="none" />
    <rect x="88" y="148" width="172" height="72" rx="8" stroke={MUTED} fill="none" />
    <line x1="88" y1="244" x2="216" y2="244" stroke={MUTED} />
    <line x1="88" y1="264" x2="176" y2="264" stroke={MUTED} />
    <line x1="88" y1="284" x2="200" y2="284" stroke={MUTED} />
    <rect x="88" y="312" width="172" height="64" rx="8" stroke={MUTED} fill="none" />
    <path d="M284 240 H340" stroke={ACCENT} strokeWidth="1.5" />
    <path d="M332 234 L340 240 L332 246" fill={ACCENT} />
    <rect x="356" y="72" width="220" height="336" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
    <text x="466" y="52" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
      Interface
    </text>
    <rect x="380" y="100" width="96" height="8" rx="4" fill={INK} fillOpacity="0.14" />
    <rect x="380" y="120" width="64" height="6" rx="3" fill={MUTED} opacity="0.45" />
    <rect x="380" y="148" width="172" height="72" rx="8" fill={FILL} stroke={LINE} />
    <rect x="396" y="168" width="48" height="32" rx="6" fill={ACCENT} fillOpacity="0.15" stroke={ACCENT} />
    <rect x="456" y="172" width="72" height="8" rx="4" fill={INK} fillOpacity="0.12" />
    <rect x="456" y="188" width="48" height="6" rx="3" fill={LINE} />
    <rect x="380" y="240" width="80" height="136" rx="8" fill={FILL} stroke={LINE} />
    <rect x="476" y="240" width="76" height="136" rx="8" fill={FILL} stroke={ACCENT} strokeWidth="1.5" />
    <rect x="492" y="264" width="44" height="8" rx="4" fill={ACCENT} fillOpacity="0.3" />
    <rect x="492" y="280" width="32" height="6" rx="3" fill={LINE} />
  </svg>
);

const StackVisual = () => (
  <svg viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" aria-hidden>
    <rect width="640" height="480" fill={PAPER} />
    <rect x="88" y="56" width="464" height="368" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
    <rect x="88" y="56" width="464" height="48" rx="12" fill={FILL} />
    <rect x="88" y="92" width="464" height="12" fill={FILL} />
    <circle cx="116" cy="80" r="4" fill={MUTED} opacity="0.5" />
    <circle cx="132" cy="80" r="4" fill={MUTED} opacity="0.5" />
    <circle cx="148" cy="80" r="4" fill={MUTED} opacity="0.5" />
    <rect x="176" y="74" width="72" height="8" rx="4" fill={INK} fillOpacity="0.12" />
    {[
      { y: 132, label: 'Interface', active: false, bars: [168, 120] },
      { y: 228, label: 'Application', active: true, bars: [200, 148] },
      { y: 324, label: 'Data', active: false, bars: [136, 96] },
    ].map((layer) => (
      <g key={layer.label}>
        <text x="120" y={layer.y} fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
          {layer.label}
        </text>
        <rect
          x="120"
          y={layer.y + 10}
          width="400"
          height="56"
          rx="10"
          fill={layer.active ? ACCENT : FILL}
          fillOpacity={layer.active ? 0.08 : 1}
          stroke={layer.active ? ACCENT : LINE}
          strokeWidth={layer.active ? 1.5 : 1}
        />
        <rect
          x="140"
          y={layer.y + 28}
          width={layer.bars[0]}
          height="8"
          rx="4"
          fill={layer.active ? ACCENT : INK}
          fillOpacity={layer.active ? 0.3 : 0.12}
        />
        <rect x="140" y={layer.y + 44} width={layer.bars[1]} height="6" rx="3" fill={LINE} />
      </g>
    ))}
  </svg>
);

const ReviewVisual = () => (
  <svg viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" aria-hidden>
    <rect width="640" height="480" fill={PAPER} />
    <rect x="72" y="72" width="288" height="336" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
    <rect x="92" y="96" width="104" height="8" rx="4" fill={INK} fillOpacity="0.14" />
    <rect x="92" y="120" width="72" height="6" rx="3" fill={MUTED} opacity="0.45" />
    <rect x="92" y="148" width="248" height="88" rx="10" fill={FILL} stroke={LINE} />
    <rect x="108" y="168" width="56" height="8" rx="4" fill={INK} fillOpacity="0.12" />
    <rect x="108" y="184" width="168" height="6" rx="3" fill={LINE} />
    <rect x="108" y="200" width="128" height="6" rx="3" fill={LINE} />
    <circle cx="324" cy="164" r="10" fill="#fff" stroke={ACCENT} strokeWidth="1.5" />
    <path d="M320 164 L323 167 L330 159" stroke={ACCENT} strokeWidth="1.5" fill="none" />
    <rect x="92" y="256" width="248" height="120" rx="10" fill={FILL} stroke={LINE} />
    <rect x="108" y="276" width="80" height="8" rx="4" fill={INK} fillOpacity="0.12" />
    <rect x="108" y="296" width="200" height="6" rx="3" fill={LINE} />
    <rect x="108" y="312" width="160" height="6" rx="3" fill={LINE} />
    <rect x="108" y="336" width="72" height="20" rx="6" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} />
    <rect x="392" y="88" width="176" height="304" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
    <rect x="412" y="112" width="64" height="8" rx="4" fill={INK} fillOpacity="0.14" />
    {[
      { y: 148, done: true },
      { y: 208, done: true },
      { y: 268, done: false },
    ].map((item, index) => (
      <g key={index}>
        <rect x="412" y={item.y} width="136" height="44" rx="8" fill={FILL} stroke={item.done ? ACCENT : LINE} />
        {item.done ? (
          <>
            <circle cx="432" cy={item.y + 22} r="7" stroke={ACCENT} fill={ACCENT} fillOpacity="0.12" />
            <path
              d={`M429 ${item.y + 22} L431 ${item.y + 25} L437 ${item.y + 18}`}
              stroke={ACCENT}
              strokeWidth="1.5"
              fill="none"
            />
          </>
        ) : (
          <circle cx="432" cy={item.y + 22} r="7" stroke={LINE} fill="#fff" />
        )}
        <rect x="448" y={item.y + 14} width={item.done ? 80 : 64} height="6" rx="3" fill={item.done ? INK : MUTED} fillOpacity={item.done ? 0.14 : 0.5} />
        <rect x="448" y={item.y + 26} width={item.done ? 48 : 72} height="5" rx="2.5" fill={LINE} />
      </g>
    ))}
  </svg>
);

const LiveVisual = () => (
  <svg viewBox="0 0 640 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" aria-hidden>
    <rect width="640" height="480" fill={PAPER} />
    <rect x="72" y="64" width="320" height="352" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
    <rect x="72" y="64" width="320" height="44" rx="12" fill={FILL} />
    <rect x="72" y="96" width="320" height="12" fill={FILL} />
    <circle cx="100" cy="86" r="4" fill={MUTED} opacity="0.5" />
    <circle cx="116" cy="86" r="4" fill={MUTED} opacity="0.5" />
    <circle cx="132" cy="86" r="4" fill={MUTED} opacity="0.5" />
    <rect x="160" y="80" width="88" height="8" rx="4" fill={INK} fillOpacity="0.12" />
    <circle cx="348" cy="86" r="4" fill={ACCENT} />
    <rect x="96" y="132" width="160" height="10" rx="5" fill={INK} fillOpacity="0.14" />
    <rect x="96" y="152" width="112" height="6" rx="3" fill={MUTED} opacity="0.45" />
    <rect x="96" y="180" width="272" height="88" rx="10" fill={FILL} stroke={LINE} />
    <rect x="112" y="200" width="72" height="8" rx="4" fill={ACCENT} fillOpacity="0.3" />
    <rect x="112" y="216" width="184" height="6" rx="3" fill={LINE} />
    <rect x="112" y="232" width="136" height="6" rx="3" fill={LINE} />
    <rect x="96" y="288" width="128" height="96" rx="10" fill={FILL} stroke={LINE} />
    <rect x="240" y="288" width="128" height="96" rx="10" fill={FILL} stroke={LINE} />
    <rect x="112" y="312" width="64" height="8" rx="4" fill={INK} fillOpacity="0.12" />
    <rect x="256" y="312" width="64" height="8" rx="4" fill={INK} fillOpacity="0.12" />
    <rect x="424" y="88" width="144" height="304" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
    <text x="496" y="120" textAnchor="middle" fill={MUTED} fontSize="11" fontFamily="system-ui, sans-serif">
      After launch
    </text>
    {[0, 1, 2, 3].map((index) => (
      <g key={index}>
        <circle cx="448" cy={156 + index * 52} r="4" fill={index < 3 ? ACCENT : LINE} />
        {index < 3 && <line x1="448" y1={160 + index * 52} x2="448" y2={204 + index * 52} stroke={LINE} />}
        <rect
          x="464"
          y={144 + index * 52}
          width={index === 0 ? 80 : 64}
          height="24"
          rx="6"
          fill={index === 0 ? ACCENT : FILL}
          fillOpacity={index === 0 ? 0.12 : 1}
          stroke={index === 0 ? ACCENT : LINE}
        />
      </g>
    ))}
  </svg>
);

const steps: Step[] = [
  {
    number: '01',
    title: 'Understand',
    description:
      'Every successful product starts with clarity. We take the time to understand your business, users, and goals before discussing solutions.',
    visual: <BriefVisual />,
  },
  {
    number: '02',
    title: 'Shape',
    description:
      'Together, we define the product, map priorities, and make the technical decisions that will support long-term growth.',
    visual: <MapVisual />,
  },
  {
    number: '03',
    title: 'Design',
    description:
      'We explore ideas through wireframes and prototypes, refining the experience early so development starts with confidence instead of assumptions.',
    visual: <WireVisual />,
  },
  {
    number: '04',
    title: 'Engineer',
    description:
      "We build with scalability, performance, and maintainability in mind. Every decision is made to support the product you'll have years from now.",
    visual: <StackVisual />,
  },
  {
    number: '05',
    title: 'Refine',
    description:
      "Quality isn't something we add at the end. Every release is reviewed, tested, and improved until it meets the standard we'd expect from our own products.",
    visual: <ReviewVisual />,
  },
  {
    number: '06',
    title: 'Launch & Partner',
    description:
      "Launching isn't the finish line. We stay involved after release to support your team, improve the product, and help it evolve as your business grows.",
    visual: <LiveVisual />,
  },
];

const StepChapter = ({ step, index }: { step: Step; index: number }) => {
  const reduceMotion = useReducedMotion();

  return (
    <li
      className={`sticky top-0 flex min-h-svh items-center bg-background ${index > 0 ? 'border-t border-border' : ''}`}
      style={{ zIndex: index + 1 }}
    >
      <div className="container mx-auto w-full max-w-6xl px-6 py-10 md:py-0">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-10 lg:gap-16">
          <div>
            <p className="mb-4 text-sm tabular-nums tracking-wide text-muted-foreground">{step.number}</p>
            <h3 className="font-display text-h4 font-bold text-balance text-heading sm:text-h3">{step.title}</h3>
            <p className="mt-4 max-w-prose-sm text-body text-muted-foreground">{step.description}</p>
          </div>

          <motion.div
            className="min-w-0"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            <div className="aspect-[4/3] max-h-[min(52svh,28rem)] overflow-hidden rounded-xl border border-border bg-muted w-full">
              {step.visual}
            </div>
          </motion.div>
        </div>
      </div>
    </li>
  );
};

const Process = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="process" className="relative">
      <div className="container relative mx-auto max-w-6xl px-6 pt-16 md:pt-20">
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: 12 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="section-header mx-auto max-w-prose text-center"
        >
          <h2 className="section-title text-h3 sm:text-h2">
            How We Work
          </h2>
          <p className="mb-3 text-body font-medium text-heading sm:text-lead">
            Thoughtful by design. Reliable by engineering.
          </p>
          <p className="section-lead">
            Every product is different, but our approach stays the same.
          </p>
        </motion.header>
      </div>

      <ol className="relative m-0 list-none p-0">
        {steps.map((step, index) => (
          <StepChapter key={step.number} step={step} index={index} />
        ))}
      </ol>
    </section>
  );
};

export default Process;
