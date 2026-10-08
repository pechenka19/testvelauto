import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter3Body() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax layers with different speeds
      gsap.to('.mesh-layer', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.frame-layer', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.leather-layer', {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content fade in
      gsap.from('.chapter3-content', {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.chapter3-content',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-3"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Глава 3: Тело"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 1920px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/60 to-transparent" />
      </div>

      {/* Parallax layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="mesh-layer absolute top-1/4 left-1/4 w-64 h-64 bg-brass/10 rounded-full blur-3xl" />
        <div className="frame-layer absolute top-1/2 right-1/4 w-96 h-96 bg-steel/10 rounded-full blur-3xl" />
        <div className="leather-layer absolute bottom-1/4 left-1/3 w-80 h-80 bg-brass/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="chapter3-content container-fluid text-center relative z-10 py-32">
        <p className="text-caption text-brass mb-8">Глава 03 — Тело</p>
        <h2 className="text-chapter text-fog mb-8">
          Вы видите мир.
          <br />
          Мир не видит вас.
        </h2>
        <p className="text-body text-steel max-w-2xl mx-auto mb-12">
          Премиум-сетка. Светопропускаемость 10%. Изнутри — панорамный обзор. Снаружи — глубокая тень.
        </p>

        {/* Material specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-h2 text-brass mb-2">10%</div>
            <p className="text-caption text-steel mb-2">светопропускаемость</p>
            <p className="text-sm text-fog/60">Панорамный обзор изнутри</p>
          </div>
          <div className="text-center">
            <div className="text-h2 text-brass mb-2">UV</div>
            <p className="text-caption text-steel mb-2">стойкость</p>
            <p className="text-sm text-fog/60">Премиум полиэстер</p>
          </div>
          <div className="text-center">
            <div className="text-h2 text-brass mb-2">2x</div>
            <p className="text-caption text-steel mb-2">армированный шов</p>
            <p className="text-sm text-fog/60">Двойная строчка</p>
          </div>
        </div>
      </div>
    </section>
  );
}
