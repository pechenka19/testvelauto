import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import ChapterProgress from './components/ChapterProgress';
import Chapter1Genesis from './components/chapters/Chapter1Genesis';
import Chapter2Heart from './components/chapters/Chapter2Heart';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============ LENIS SMOOTH SCROLL ============
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);
}

// ============ CHAPTER SKELETONS (Chapters 3-6) ============
function Chapter3Body() {
  return (
    <section
      id="chapter-3"
      className="min-h-screen flex items-center justify-center bg-void section-padding"
      aria-label="Глава 3: Тело"
    >
      <div className="container-fluid text-center">
        <p className="text-caption text-brass mb-8">Глава 03 — Тело</p>
        <h2 className="text-chapter text-fog mb-8">
          Вы видите мир.
          <br />
          Мир не видит вас.
        </h2>
        <p className="text-body text-steel max-w-2xl mx-auto">
          [Placeholder for Chapter 3 content]
        </p>
      </div>
    </section>
  );
}

function Chapter4Craft() {
  return (
    <section
      id="chapter-4"
      className="min-h-screen flex items-center justify-center bg-abyss section-padding"
      aria-label="Глава 4: Мастерство"
    >
      <div className="container-fluid text-center">
        <p className="text-caption text-brass mb-8">Глава 04 — Мастерство</p>
        <h2 className="text-chapter text-fog mb-8">
          Одно окно.
          <br />
          Одно лекало.
          <br />
          Один мастер.
        </h2>
        <p className="text-body text-steel max-w-2xl mx-auto">
          [Placeholder for Chapter 4 content]
        </p>
      </div>
    </section>
  );
}

function Chapter5Experience() {
  return (
    <section
      id="chapter-5"
      className="min-h-screen flex items-center justify-center bg-void section-padding"
      aria-label="Глава 5: Ощущения"
    >
      <div className="container-fluid text-center">
        <p className="text-caption text-brass mb-8">Глава 05 — Ощущения</p>
        <h2 className="text-chapter text-fog mb-8">
          Тишина стала
          <br />
          плотнее.
        </h2>
        <p className="text-body text-steel max-w-2xl mx-auto">
          [Placeholder for Chapter 5 content]
        </p>
      </div>
    </section>
  );
}

function Chapter6Legacy() {
  return (
    <section
      id="chapter-6"
      className="min-h-screen flex items-center justify-center bg-abyss section-padding"
      aria-label="Глава 6: Наследие"
    >
      <div className="container-fluid text-center">
        <p className="text-caption text-brass mb-8">Глава 06 — Наследие</p>
        <h2 className="text-chapter text-fog mb-8">
          Из Абакана —
          <br />
          в путь.
        </h2>
        <p className="text-body text-steel max-w-2xl mx-auto">
          [Placeholder for Chapter 6 content]
        </p>
      </div>
    </section>
  );
}

// ============ MAIN APP ============
export default function App() {
  useLenis(); // Initialize smooth scroll

  const chapters = [
    'chapter-1',
    'chapter-2',
    'chapter-3',
    'chapter-4',
    'chapter-5',
    'chapter-6',
  ];

  return (
    <div className="overflow-x-hidden smooth-scroll">
      {/* Chapter Progress Navigation */}
      <ChapterProgress chapters={chapters} />

      <main>
        {/* Chapter 1: THE GENESIS */}
        <Chapter1Genesis />

        {/* Chapter 2: THE HEART */}
        <Chapter2Heart />

        {/* Chapter 3: THE BODY */}
        <Chapter3Body />

        {/* Chapter 4: THE CRAFT */}
        <Chapter4Craft />

        {/* Chapter 5: THE EXPERIENCE */}
        <Chapter5Experience />

        {/* Chapter 6: THE LEGACY */}
        <Chapter6Legacy />
      </main>
    </div>
  );
}
