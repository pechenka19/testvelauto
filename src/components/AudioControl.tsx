import { useEffect, useState } from 'react';
import { Howl } from 'howler';

export default function AudioControl() {
  const [muted, setMuted] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  // Track user interaction for audio permission
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

  // Initialize sounds
  useEffect(() => {
    if (!userInteracted) return;

    // TODO: Add actual audio files
    const magneticClick = new Howl({
      src: ['/audio/magnetic-click.mp3'],
      volume: 0.7,
      preload: false,
    });

    const workshopAmbient = new Howl({
      src: ['/audio/workshop-ambient.mp3'],
      volume: 0.3,
      loop: true,
      preload: false,
    });

    const orchestralTheme = new Howl({
      src: ['/audio/orchestral-theme.mp3'],
      volume: 0.5,
      preload: false,
    });

    // Store sounds in window for scroll triggers
    (window as any).audioSounds = {
      magneticClick,
      workshopAmbient,
      orchestralTheme,
    };

    return () => {
      magneticClick.unload();
      workshopAmbient.unload();
      orchestralTheme.unload();
    };
  }, [userInteracted]);

  // Update mute state for all sounds
  useEffect(() => {
    if (!(window as any).audioSounds) return;

    const { magneticClick, workshopAmbient, orchestralTheme } = (window as any).audioSounds;
    magneticClick.mute(muted);
    workshopAmbient.mute(muted);
    orchestralTheme.mute(muted);
  }, [muted]);

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <button
      onClick={toggleMute}
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
