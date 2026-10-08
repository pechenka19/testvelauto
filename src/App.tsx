import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import ChapterProgress from './components/ChapterProgress';
import Chapter1Genesis from './components/chapters/Chapter1Genesis';
import Chapter2Heart from './components/chapters/Chapter2Heart';
import Chapter4Craft from './components/chapters/Chapter4Craft';

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
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      aria-label="Глава 3: Тело"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/60 to-transparent" />
      </div>
      
      <div className="container-fluid text-center py-32 relative z-10">
        <p className="text-caption text-brass mb-8">Глава 03 — Тело</p>
        <h2 className="text-chapter text-fog mb-8">
          Вы видите мир.
          <br />
          Мир не видит вас.
        </h2>
        <p className="text-body text-steel max-w-2xl mx-auto">
          Премиум-сетка. Светопропускаемость 10%. Изнутри — панорамный обзор. Снаружи — глубокая тень.
        </p>
      </div>
    </section>
  );
}



function Chapter5Experience() {
  return (
    <section
      id="chapter-5"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      aria-label="Глава 5: Ощущения"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/60 to-transparent" />
      </div>
      
      <div className="container-fluid text-center py-32 relative z-10">
        <p className="text-caption text-brass mb-8">Глава 05 — Ощущения</p>
        <h2 className="text-chapter text-fog mb-8">
          Тишина стала
          <br />
          плотнее.
        </h2>
        <p className="text-body text-steel max-w-2xl mx-auto">
          Вы садитесь в машину. Салон не раскалён. Свет — мягкий, рассеянный, как в пасмурный день.
        </p>
      </div>
    </section>
  );
}

function Chapter6Legacy() {
  return (
    <section
      id="chapter-6"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      aria-label="Глава 6: Наследие"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/60 to-transparent" />
      </div>
      
      <div className="container-fluid text-center py-32 relative z-10">
        <p className="text-caption text-brass mb-8">Глава 06 — Наследие</p>
        <h2 className="text-chapter text-fog mb-8">
          Из Абакана —
          <br />
          в путь.
        </h2>
        <p className="text-body text-steel max-w-2xl mx-auto">
          В Абакане — мастерская. За её пределами — вся Россия. От Калининграда до Владивостока.
        </p>
      </div>
    </section>
  );
}

// ============ AUDIO CONTROL ============
function AudioControl() {
  const [muted, setMuted] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  // TODO: Howler.js integration
  // useEffect(() => {
  //   if (!userInteracted) return;
  //   
  //   const magneticClick = new Howl({
  //     src: ['/audio/magnetic-click.mp3'],
  //     volume: 0.7,
  //   });
  //   
  //   const workshopAmbient = new Howl({
  //     src: ['/audio/workshop-ambient.mp3'],
  //     volume: 0.3,
  //     loop: true,
  //   });
  //   
  //   const orchestralTheme = new Howl({
  //     src: ['/audio/orchestral-theme.mp3'],
  //     volume: 0.5,
  //   });
  //   
  //   // Trigger sounds based on scroll position
  //   ScrollTrigger.create({
  //     trigger: '#chapter-2',
  //     start: 'top center',
  //     onEnter: () => !muted && magneticClick.play(),
  //   });
  //   
  //   ScrollTrigger.create({
  //     trigger: '#chapter-4',
  //     start: 'top center',
  //     onEnter: () => !muted && workshopAmbient.play(),
  //     onLeaveBack: () => workshopAmbient.stop(),
  //   });
  //   
  //   ScrollTrigger.create({
  //     trigger: '#chapter-6',
  //     start: 'top center',
  //     onEnter: () => !muted && orchestralTheme.play(),
  //   });
  // }, [userInteracted, muted]);

  return (
    <button
      onClick={() => setMuted(!muted)}
      className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-void/80 backdrop-blur-xl border border-steel/20 flex items-center justify-center hover:bg-void/90 transition-colors"
      aria-label={muted ? 'Включить звук' : 'Выключить звук'}
    >
      {muted ? (
        <svg className="w-5 h-5 text-steel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
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
      {/* Audio Control */}
      <AudioControl />
      
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
