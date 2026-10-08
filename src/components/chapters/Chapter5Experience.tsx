import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter5Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Soft parallax on background
      gsap.to('.chapter5-bg', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content fade in
      gsap.from('.chapter5-content', {
        opacity: 0,
        y: 60,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.chapter5-content',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-5"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Глава 5: Ощущения"
    >
      {/* Background photo with parallax */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="chapter5-bg w-full h-full object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 1920px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="chapter5-content container-fluid text-center relative z-10 py-32">
        <p className="text-caption text-brass mb-8">Глава 05 — Ощущения</p>
        <h2 className="text-chapter text-fog mb-8">
          Тишина стала
          <br />
          плотнее.
        </h2>
        <p className="text-body text-steel max-w-2xl mx-auto mb-12">
          Вы садитесь в машину. Салон не раскалён. Свет — мягкий, рассеянный, как в пасмурный день.
        </p>

        {/* Experience details */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-brass/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-h2 text-fog mb-2">Комфорт</h3>
              <p className="text-body text-steel">Салон не раскалён. Кондиционер работает эффективнее. Экономия топлива до 15%.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-brass/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <h3 className="text-h2 text-fog mb-2">Покой</h3>
              <p className="text-body text-steel">Свет мягкий, рассеянный. Как в пасмурный день. Идеально для дальних поездок.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-brass/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-h2 text-fog mb-2">Чистота</h3>
              <p className="text-body text-steel">Насекомые не летят в лицо. Пыль не попадает в салон. Только свежий воздух.</p>
            </div>
          </div>
        </div>

        <p className="text-quote text-fog/80 mt-16 max-w-2xl mx-auto">
          Вы не думаете о шторках. Вы думаете о дороге. Именно так и должно быть.
        </p>
      </div>
    </section>
  );
}
