import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter6Legacy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !galleryRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      // Horizontal scroll gallery
      const gallery = galleryRef.current;
      if (!gallery) return;
      
      const scrollWidth = gallery.scrollWidth - window.innerWidth;

      gsap.to(gallery, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const cities = [
    { name: 'Калининград', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80&auto=format&fit=crop' },
    { name: 'Москва', img: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80&auto=format&fit=crop' },
    { name: 'Казань', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80&auto=format&fit=crop' },
    { name: 'Екатеринбург', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80&auto=format&fit=crop' },
    { name: 'Новосибирск', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80&auto=format&fit=crop' },
    { name: 'Красноярск', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop' },
    { name: 'Иркутск', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80&auto=format&fit=crop' },
    { name: 'Владивосток', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80&auto=format&fit=crop' },
  ];

  // Mobile version - vertical scroll
  if (isMobile) {
    return (
      <section
        id="chapter-6"
        className="relative min-h-[60vh] flex items-center justify-center bg-abyss"
        aria-label="Глава 6: Наследие"
      >
        <div className="container-fluid text-center py-32">
          <p className="text-caption text-brass mb-8">Глава 06 — Наследие</p>
          <h2 className="text-chapter text-fog mb-8">
            Из Абакана —
            <br />
            в путь.
          </h2>
          <p className="text-body text-steel max-w-2xl mx-auto mb-12">
            В Абакане — мастерская. За её пределами — вся Россия. От Калининграда до Владивостока.
          </p>

          {/* Vertical gallery for mobile */}
          <div className="grid grid-cols-2 gap-4 mt-16">
            {cities.map((city, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src={city.img}
                  alt={city.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <p className="text-caption text-fog/60 mt-2">{city.name}</p>
              </div>
            ))}
          </div>

          <p className="text-quote text-fog/80 mt-16 max-w-xl mx-auto">
            Мы не говорим о тысячах продаж. Мы говорим о каждом окне, которое теперь в тени.
          </p>
        </div>
      </section>
    );
  }

  // Desktop version - horizontal scroll gallery
  return (
    <section
      id="chapter-6"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-abyss"
      aria-label="Глава 6: Наследие"
    >
      {/* Intro panel */}
      <div className="absolute inset-0 flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 1920px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-void/95 via-void/70 to-transparent" />
        </div>
        <div className="container-fluid relative z-10 max-w-2xl">
          <p className="text-caption text-brass mb-6">Глава 06 — Наследие</p>
          <h2 className="text-chapter text-fog mb-8">
            Из Абакана —
            <br />
            в путь.
          </h2>
          <p className="text-body text-steel max-w-lg">
            В Абакане — мастерская. За её пределами — вся Россия. От Калининграда до Владивостока.
          </p>
          <p className="text-caption text-brass mt-8">
            Прокрутите дальше →
          </p>
        </div>
      </div>

      {/* Horizontal gallery */}
      <div ref={galleryRef} className="absolute inset-0 flex items-center gap-8 pl-[100vw]">
        {cities.map((city, i) => (
          <div key={i} className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw]">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4">
              <img 
                src={city.img}
                alt={city.name}
                className="w-full h-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 1920px"
              />
            </div>
            <p className="text-caption text-fog/60">{city.name}</p>
          </div>
        ))}

        {/* Final panel */}
        <div className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] flex items-center justify-center">
          <div className="text-center max-w-lg">
            <p className="text-quote text-fog/80">
              Мы не говорим о тысячах продаж. Мы говорим о каждом окне, которое теперь в тени.
            </p>
            <p className="text-chapter text-brass mt-12">
              VELES
            </p>
            <p className="text-caption text-steel mt-4">
              Свет под контролем.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
