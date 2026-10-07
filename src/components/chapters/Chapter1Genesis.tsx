import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter1Genesis() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax zoom on background
      gsap.to('.chapter1-bg', {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Letter-by-letter reveal for title
      const title = titleRef.current;
      if (title) {
        const text = title.textContent || '';
        
        // Create accessible hidden text for screen readers
        const accessibleText = document.createElement('span');
        accessibleText.className = 'sr-only';
        accessibleText.textContent = text;
        
        // Create animated container
        const animatedContainer = document.createElement('div');
        animatedContainer.className = 'letter-reveal';
        animatedContainer.setAttribute('aria-hidden', 'true');
        
        // Clear and rebuild title
        title.innerHTML = '';
        title.appendChild(accessibleText);
        title.appendChild(animatedContainer);
        
        text.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(100%)';
          animatedContainer.appendChild(span);

          gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.05,
            scrollTrigger: {
              trigger: title,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      }

      // Quote fade in
      if (quoteRef.current) {
        gsap.from(quoteRef.current, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Subtitle fade in
      gsap.from('.chapter1-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.chapter1-subtitle',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      // Narrative text fade in
      gsap.from('.chapter1-narrative', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.chapter1-narrative',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-1"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}
      aria-label="Глава 1: Истоки"
    >
      {/* Background with parallax zoom */}
      <div className="absolute inset-0">
        <div className="chapter1-bg absolute inset-0 bg-gradient-to-br from-void via-abyss to-void" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,106,0.08)_0%,_transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-fluid text-center max-w-5xl">
        {/* Chapter number */}
        <p className="text-caption text-brass mb-8 animate-fade-in delay-300">
          Глава 01 — Истоки
        </p>

        {/* Main title with letter reveal */}
        <h1
          ref={titleRef}
          className="text-chapter text-fog mb-12"
        >
          СВЕТ
        </h1>

        {/* Philosophical quote */}
        <blockquote
          ref={quoteRef}
          className="text-quote text-fog/80 mb-12 max-w-3xl mx-auto"
        >
          Свет — это то, что мы видим. Тень — это то, что мы чувствуем.
          <br />
          Между ними — пространство, в котором живёт комфорт.
        </blockquote>

        {/* Subtitle */}
        <p className="chapter1-subtitle text-h2 text-fog/60 mb-16">
          Мы не боремся со светом. Мы им управляем.
        </p>

        {/* Narrative */}
        <div className="chapter1-narrative text-body text-steel max-w-2xl mx-auto leading-relaxed">
          <p className="mb-6">
            Каждый день миллионы автовладельцев сталкиваются с одной и той же проблемой:
            солнце слепит, салон раскаляется, насекомые летят в лицо.
          </p>
          <p className="mb-6">
            Тонировка — незаконна и необратима. Присоски — отваливаются.
            Шторки на липучках — выглядят дёшево.
          </p>
          <p>
            Мы задали вопрос: почему не существует решения, которое было бы одновременно
            законным, съёмным, красивым и эффективным?
          </p>
          <p className="mt-8 text-fog font-medium">
            Так родился VELES.
          </p>
        </div>

        {/* Visual accent line */}
        <div className="mt-16 w-px h-24 bg-gradient-to-b from-brass/50 to-transparent mx-auto" />
      </div>
    </section>
  );
}
