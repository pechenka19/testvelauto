import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import ChapterProgress from './components/ChapterProgress';
import AudioControl from './components/AudioControl';
import CookieBanner from './components/CookieBanner';
import Logo from './components/Logo';
import Chapter1Genesis from './components/chapters/Chapter1Genesis';
import Chapter2Heart from './components/chapters/Chapter2Heart';
import Chapter3Body from './components/chapters/Chapter3Body';
import Chapter4Craft from './components/chapters/Chapter4Craft';
import Chapter5Experience from './components/chapters/Chapter5Experience';
import Chapter6Legacy from './components/chapters/Chapter6Legacy';

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

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);
}

// ============ MAIN APP ============
export default function App() {
  useLenis();

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
      <Logo />
      <AudioControl />
      <CookieBanner />
      <ChapterProgress chapters={chapters} />

      <main>
        <Chapter1Genesis />
        <Chapter2Heart />
        <Chapter3Body />
        <Chapter4Craft />
        <Chapter5Experience />
        <Chapter6Legacy />
      </main>
    </div>
  );
}
