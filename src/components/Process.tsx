import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Understand',
    description:
      'Every successful product starts with clarity. We take the time to understand your business, users, and goals before discussing solutions.',
  },
  {
    number: '02',
    title: 'Shape',
    description:
      'Together, we define the product, map priorities, and make the technical decisions that will support long-term growth.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'We explore ideas through wireframes and prototypes, refining the experience early so development starts with confidence instead of assumptions.',
  },
  {
    number: '04',
    title: 'Engineer',
    description:
      "We build with scalability, performance, and maintainability in mind. Every decision is made to support the product you'll have years from now.",
  },
  {
    number: '05',
    title: 'Refine',
    description:
      "Quality isn't something we add at the end. Every release is reviewed, tested, and improved until it meets the standard we'd expect from our own products.",
  },
  {
    number: '06',
    title: 'Launch & Partner',
    description:
      "Launching isn't the finish line. We stay involved after release to support your team, improve the product, and help it evolve as your business grows.",
  },
];

const LINE_OVERHANG = 14;
const TIMELINE_RAIL_WIDTH = 14;
const TIMELINE_LINE_LEFT = TIMELINE_RAIL_WIDTH / 2;

const LeftPanelContent = () => (
  <>
    <h2 className="text-5xl md:text-6xl font-display font-bold text-heading mb-6 text-balance leading-[1.1]">
      How We Work
    </h2>
    <p className="text-xl md:text-2xl text-heading font-medium mb-5 leading-snug">
      Thoughtful by design. Reliable by engineering.
    </p>
    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
      Every product is different, but our approach stays the same.
    </p>
  </>
);

const MobileIntroHeader = () => (
  <div className="text-center max-w-md mx-auto space-y-2">
    <h2 className="text-3xl sm:text-4xl font-display font-bold text-heading leading-tight text-balance">
      How We Work
    </h2>
    <p className="text-base sm:text-lg text-heading font-medium leading-snug">
      Thoughtful by design. Reliable by engineering.
    </p>
    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
      Every product is different, but our approach stays the same.
    </p>
  </div>
);

const Process = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [progressLine, setProgressLine] = useState({ trackTop: 0, trackHeight: 0, fillTop: 0, fillHeight: 0 });
  const [milestoneReached, setMilestoneReached] = useState<boolean[]>(() => steps.map(() => false));

  const sectionRef = useRef<HTMLElement>(null);
  const leftSlotRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRafRef = useRef<number | null>(null);

  const updateLeftPanelPosition = useCallback(() => {
    const panel = leftPanelRef.current;
    const slot = leftSlotRef.current;
    const desktop = window.matchMedia('(min-width: 1024px)').matches;

    if (!panel || !slot || !desktop) {
      if (panel) {
        panel.style.position = '';
        panel.style.top = '';
        panel.style.left = '';
        panel.style.width = '';
        panel.style.zIndex = '';
      }
      return;
    }

    const viewportCenter = window.innerHeight * 0.5;
    const panelHeight = panel.offsetHeight;
    const centeredTop = viewportCenter - panelHeight / 2;
    const slotRect = slot.getBoundingClientRect();

    let top = centeredTop;
    if (slotRect.top > centeredTop) {
      top = slotRect.top;
    } else if (slotRect.bottom < centeredTop + panelHeight) {
      top = slotRect.bottom - panelHeight;
    }

    panel.style.position = 'fixed';
    panel.style.top = `${top}px`;
    panel.style.left = `${slotRect.left}px`;
    panel.style.width = `${slotRect.width}px`;
    panel.style.zIndex = '20';
  }, []);

  const updateTimelineState = useCallback(() => {
    const viewportCenter = window.innerHeight * 0.5;
    let nextActive = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    stepRefs.current.forEach((element, index) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - viewportCenter);
      if (distance < minDistance) {
        minDistance = distance;
        nextActive = index;
      }
    });

    setActiveIndex(nextActive);

    const timeline = timelineRef.current;
    const milestones = milestoneRefs.current.filter(Boolean) as HTMLDivElement[];

    if (timeline && milestones.length > 0) {
      const timelineRect = timeline.getBoundingClientRect();
      const milestoneYs = milestones.map(
        (milestone) => milestone.getBoundingClientRect().top + milestone.offsetHeight / 2 - timelineRect.top,
      );
      const firstY = milestoneYs[0];
      const lastY = milestoneYs[milestoneYs.length - 1];
      const scrollY = viewportCenter - timelineRect.top;
      let fillHeight = Math.min(Math.max(scrollY - firstY, 0), lastY - firstY);
      if (fillHeight > 0) {
        fillHeight = Math.min(fillHeight + LINE_OVERHANG, lastY - firstY + LINE_OVERHANG);
      }

      setProgressLine({
        trackTop: firstY,
        trackHeight: Math.max(lastY - firstY + LINE_OVERHANG, 0),
        fillTop: firstY,
        fillHeight,
      });

      setMilestoneReached(milestoneYs.map((y) => scrollY >= y - 1));
    }
  }, []);

  const updateLayout = useCallback(() => {
    updateLeftPanelPosition();
    updateTimelineState();
  }, [updateLeftPanelPosition, updateTimelineState]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduceMotion(media.matches);
    syncMotion();
    media.addEventListener('change', syncMotion);
    return () => media.removeEventListener('change', syncMotion);
  }, []);

  useEffect(() => {
    const scheduleUpdate = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        updateLayout();
      });
    };

    updateLayout();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [updateLayout]);

  return (
    <section id="process" ref={sectionRef} className="py-12 md:py-20 lg:py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Mobile only — sticky intro stays below site header while steps scroll */}
        <div className="lg:hidden sticky top-14 z-20 -mx-6 px-6 py-5 mb-6 bg-background/95 backdrop-blur-sm border-b border-border/40">
          <MobileIntroHeader />
        </div>

        <div className="mx-auto w-full max-w-5xl xl:max-w-6xl lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-12 xl:gap-20 lg:items-stretch">
          <div ref={leftSlotRef} className="relative max-w-2xl self-stretch hidden lg:block">
            <div className="invisible pointer-events-none select-none" aria-hidden="true">
              <div className="max-w-2xl">
                <LeftPanelContent />
              </div>
            </div>

            <div ref={leftPanelRef} className="max-w-2xl">
              <LeftPanelContent />
            </div>
          </div>

          <div ref={timelineRef} className="relative">
            <div
              className="absolute w-px -translate-x-1/2 bg-border"
              style={{ left: TIMELINE_LINE_LEFT, top: progressLine.trackTop, height: progressLine.trackHeight }}
              aria-hidden="true"
            />
            <div
              className="absolute w-px -translate-x-1/2 bg-primary"
              style={{ left: TIMELINE_LINE_LEFT, top: progressLine.fillTop, height: progressLine.fillHeight }}
              aria-hidden="true"
            />

            <ol className="relative list-none m-0 p-0">
              {steps.map((step, index) => {
                const isActive = activeIndex === index;
                const isReached = milestoneReached[index] && !isActive;

                return (
                  <li key={step.number}>
                    <div
                      ref={(element) => {
                        stepRefs.current[index] = element;
                      }}
                      className={cn(
                        'grid grid-cols-[14px_minmax(0,1fr)] gap-x-6 sm:gap-x-8 lg:gap-x-12',
                        index === 0
                          ? 'items-start pb-8 lg:pb-24 max-lg:min-h-[45vh] max-lg:items-center'
                          : 'min-h-[45vh] md:min-h-[52vh] lg:min-h-[56vh] items-center',
                      )}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <div
                        className={cn(
                          'relative flex self-stretch',
                          index === 0 ? 'items-start pt-10 md:pt-12 max-lg:items-center max-lg:pt-0' : 'items-center justify-center',
                        )}
                      >
                        <div
                          ref={(element) => {
                            milestoneRefs.current[index] = element;
                          }}
                          className={cn(
                            'relative z-10 shrink-0 rounded-full border border-[#FAF7F5] transition-all duration-300 ease-out',
                            isActive && 'size-2.5 bg-primary shadow-[0_0_0_4px_rgb(var(--primary)/0.15)]',
                            !isActive && isReached && 'size-2 bg-primary',
                            !isActive && !isReached && 'size-1.5 bg-border',
                          )}
                          aria-hidden="true"
                        />
                      </div>

                      <div
                        className={cn(
                          'max-w-2xl rounded-3xl bg-[#FAF7F5] p-6 sm:p-8 md:p-10 lg:p-12 transition-all duration-500 ease-out will-change-[filter,opacity,transform]',
                          index === 0 ? 'mb-2' : 'my-3',
                          !reduceMotion && !isActive && 'opacity-40 blur-[3px] scale-[0.99]',
                          !reduceMotion && isActive && 'opacity-100 blur-0 scale-100',
                          reduceMotion && 'opacity-100 blur-0',
                        )}
                      >
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-heading mb-3 md:mb-5 leading-tight">
                          <span className="text-muted-foreground/80 font-medium mr-3 sm:mr-4 text-xl sm:text-2xl md:text-3xl">
                            {step.number}
                          </span>
                          {step.title}
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
