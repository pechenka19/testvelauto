import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter4Craft() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.craft-panel');
      
      // Initial state
      panels.forEach((panel, i) => {
        gsap.set(panel, { 
          opacity: i === 0 ? 1 : 0,
          zIndex: i === 0 ? 1 : 0
        });
      });

      // Timeline with pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
        }
      });

      // Panel 1 → 2
      tl.to(panels[0], { opacity: 0, duration: 1 }, 0)
        .to(panels[1], { opacity: 1, zIndex: 1, duration: 1 }, 0);

      // Panel 2 → 3
      tl.to(panels[1], { opacity: 0, zIndex: 0, duration: 1 }, 1)
        .to(panels[2], { opacity: 1, zIndex: 1, duration: 1 }, 1);
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile version - simple scroll
  if (isMobile) {
    return (
      <section
        id="chapter-4"
        className="relative min-h-[60vh] flex items-center justify-center bg-abyss"
        aria-label="Глава 4: Мастерство"
      >
        <div className="container-fluid text-center py-32">
          <p className="text-caption text-brass mb-8">Глава 04 — Мастерство</p>
          <h2 className="text-chapter text-fog mb-8">
            Одно окно.
            <br />
            Одно лекало.
            <br />
            Один мастер.
          </h2>
          <div className="space-y-12 mt-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80&auto=format&fit=crop"
                alt="Мастер за работой"
                className="w-full aspect-video object-cover rounded-2xl mb-6"
                loading="lazy"
              />
              <p className="text-body text-steel">
                В Абакане, в мастерской, мастер берёт стальной пруток. Не конвейер. Верстак. Тиски. Лекало.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80&auto=format&fit=crop"
                alt="Лекало"
                className="w-full aspect-video object-cover rounded-2xl mb-6"
                loading="lazy"
              />
              <p className="text-body text-steel">
                Мы не делаем шторки "на модель". Мы делаем лекало под конкретную дверь.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80&auto=format&fit=crop"
                alt="Гравировка"
                className="w-full aspect-video object-cover rounded-2xl mb-6"
                loading="lazy"
              />
              <p className="text-body text-steel">
                Когда шторка готова, мастер гравирует номер партии. Это не фабрика. Это ремесло.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop version - sticky scroll with timeline
  return (
    <section
      id="chapter-4"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-abyss"
      aria-label="Глава 4: Мастерство"
    >
      {/* Panel 1: Master at work */}
      <div className="craft-panel absolute inset-0 flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=80&auto=format&fit=crop"
            alt="Мастер за работой"
            className="w-full h-full object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 1920px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/60 to-transparent" />
        </div>
        <div className="container-fluid relative z-10 max-w-2xl">
          <p className="text-caption text-brass mb-6">Глава 04 — Мастерство</p>
          <h2 className="text-chapter text-fog mb-8">
            Одно окно.
            <br />
            Одно лекало.
          </h2>
          <p className="text-body text-steel max-w-lg">
            В Абакане, в мастерской, мастер берёт стальной пруток. Не конвейер. Верстак. Тиски. Лекало.
          </p>
        </div>
      </div>

      {/* Panel 2: Patterns */}
      <div className="craft-panel absolute inset-0 flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80&auto=format&fit=crop"
            alt="Лекала"
            className="w-full h-full object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 1920px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/60 to-transparent" />
        </div>
        <div className="container-fluid relative z-10 max-w-2xl">
          <h2 className="text-h1 text-fog mb-8">
            Одно лекало.
          </h2>
          <p className="text-body text-steel max-w-lg mb-6">
            Мы не делаем шторки "на модель". Мы делаем лекало под конкретную дверь. Потому что окна у двух одинаковых машин отличаются на доли миллиметра.
          </p>
          <p className="text-body text-brass">
            500+ моделей. 500+ лекал. Каждое — хранится в архиве мастерской.
          </p>
        </div>
      </div>

      {/* Panel 3: Engraving */}
      <div className="craft-panel absolute inset-0 flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80&auto=format&fit=crop"
            alt="Гравировка номера партии"
            className="w-full h-full object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 1920px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/60 to-transparent" />
        </div>
        <div className="container-fluid relative z-10 max-w-2xl">
          <h2 className="text-h1 text-fog mb-8">
            Один мастер.
          </h2>
          <p className="text-body text-steel max-w-lg mb-6">
            Когда шторка готова, мастер гравирует на стальном хлястике номер партии. Не серийный номер. Личный. Как подпись.
          </p>
          <p className="text-quote text-fog/80">
            Это не фабрика. Это ремесло.
          </p>
        </div>
      </div>
    </section>
  );
}
