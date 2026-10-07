import { useEffect, useState } from 'react';

interface ChapterProgressProps {
  chapters: string[];
}

export default function ChapterProgress({ chapters }: ChapterProgressProps) {
  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      chapters.forEach((chapterId, index) => {
        const element = document.getElementById(chapterId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentChapter(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  const handleClick = (index: number) => {
    const element = document.getElementById(chapters[index]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-6"
      aria-label="Навигация по главам"
    >
      {chapters.map((chapter, index) => (
        <button
          key={chapter}
          onClick={() => handleClick(index)}
          className="group relative flex items-center"
          aria-label={`Перейти к главе ${index + 1}`}
          aria-current={index === currentChapter ? 'step' : undefined}
        >
          {/* Dot */}
          <div
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentChapter
                ? 'bg-brass scale-125'
                : 'bg-steel/30 hover:bg-steel/50'
            }`}
          />
          
          {/* Progress line */}
          {index < chapters.length - 1 && (
            <div className="absolute left-1/2 -translate-x-1/2 top-3 w-px h-6 bg-steel/20" />
          )}
          
          {/* Chapter number tooltip */}
          <span className="absolute left-8 text-caption text-steel opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {String(index + 1).padStart(2, '0')}
          </span>
        </button>
      ))}
    </nav>
  );
}
