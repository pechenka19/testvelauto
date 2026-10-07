import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter2Heart() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      // SVG path drawing animation
      const paths = svgRef.current?.querySelectorAll('.blueprint-path');
      if (paths) {
        paths.forEach((path) => {
          const svgPath = path as SVGPathElement;
          const length = svgPath.getTotalLength();
          
          gsap.set(svgPath, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          gsap.to(svgPath, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: svgRef.current,
              start: 'top 70%',
              end: 'center center',
              scrub: 1,
            },
          });
        });
      }

      // Numbers count up
      const numbers = document.querySelectorAll('.stat-number');
      numbers.forEach((num) => {
        const target = parseInt(num.getAttribute('data-target') || '0');
        
        gsap.from(num, {
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: num,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: function() {
            num.textContent = Math.floor(this.progress() * target).toString();
          },
        });
      });

      // Specs fade in staggered
      gsap.from('.spec-item', {
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.specs-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // TODO: Howler.js audio trigger
      // const magneticClickSound = new Howl({
      //   src: ['/audio/magnetic-click.mp3'],
      //   volume: 0.7,
      // });
      // 
      // ScrollTrigger.create({
      //   trigger: '.magnetic-moment',
      //   start: 'top center',
      //   onEnter: () => magneticClickSound.play(),
      // });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-2"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-abyss"
      style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}
      aria-label="Глава 2: Сердце технологии"
    >
      <div className="container-fluid">
        {/* Chapter header */}
        <header className="text-center mb-24">
          <p className="text-caption text-brass mb-8">
            Глава 02 — Сердце технологии
          </p>
          <h2 className="text-chapter text-fog mb-8">
            4 мм
          </h2>
          <p className="text-h2 text-fog/60 max-w-3xl mx-auto">
            35 мегаэрстед. 200 прототипов.
          </p>
        </header>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="text-center">
            <div className="stat-number text-display text-brass mb-4" data-target="4">
              0
            </div>
            <p className="text-caption text-steel">миллиметра</p>
            <p className="text-body text-fog/60 mt-4">
              Стальной каркас. Не 3 — потому что гнётся. Не 5 — потому что тяжелит дверь.
            </p>
          </div>
          
          <div className="text-center">
            <div className="stat-number text-display text-brass mb-4" data-target="35">
              0
            </div>
            <p className="text-caption text-steel">мегаэрстед</p>
            <p className="text-body text-fog/60 mt-4">
              Коэрцитивная сила неодимового магнита класса N35.
            </p>
          </div>
          
          <div className="text-center">
            <div className="stat-number text-display text-brass mb-4" data-target="200">
              0
            </div>
            <p className="text-caption text-steel">прототипов</p>
            <p className="text-body text-fog/60 mt-4">
              Баланс найден через 200 итераций. 4 — это совершенство.
            </p>
          </div>
        </div>

        {/* SVG Blueprint */}
        <div className="max-w-4xl mx-auto mb-24">
          <svg
            ref={svgRef}
            viewBox="0 0 800 400"
            className="w-full h-auto"
            aria-label="Чертёж магнитного каркаса"
          >
            {/* Frame outline */}
            <path
              className="blueprint-path"
              d="M 50 50 L 750 50 L 750 350 L 50 350 Z"
              fill="none"
              stroke="rgba(201,168,106,0.6)"
              strokeWidth="2"
            />
            
            {/* Inner frame */}
            <path
              className="blueprint-path"
              d="M 70 70 L 730 70 L 730 330 L 70 330 Z"
              fill="none"
              stroke="rgba(138,141,145,0.4)"
              strokeWidth="1"
            />
            
            {/* Mesh pattern horizontal */}
            <path
              className="blueprint-path"
              d="M 70 100 L 730 100 M 70 130 L 730 130 M 70 160 L 730 160 M 70 190 L 730 190 M 70 220 L 730 220 M 70 250 L 730 250 M 70 280 L 730 280 M 70 310 L 730 310"
              fill="none"
              stroke="rgba(138,141,145,0.2)"
              strokeWidth="0.5"
            />
            
            {/* Mesh pattern vertical */}
            <path
              className="blueprint-path"
              d="M 100 70 L 100 330 M 150 70 L 150 330 M 200 70 L 200 330 M 250 70 L 250 330 M 300 70 L 300 330 M 350 70 L 350 330 M 400 70 L 400 330 M 450 70 L 450 330 M 500 70 L 500 330 M 550 70 L 550 330 M 600 70 L 600 330 M 650 70 L 650 330 M 700 70 L 700 330"
              fill="none"
              stroke="rgba(138,141,145,0.2)"
              strokeWidth="0.5"
            />
            
            {/* Magnets */}
            <circle cx="50" cy="100" r="12" fill="rgba(201,168,106,0.8)" />
            <circle cx="50" cy="200" r="12" fill="rgba(201,168,106,0.8)" />
            <circle cx="50" cy="300" r="12" fill="rgba(201,168,106,0.8)" />
            <circle cx="750" cy="100" r="12" fill="rgba(201,168,106,0.8)" />
            <circle cx="750" cy="200" r="12" fill="rgba(201,168,106,0.8)" />
            <circle cx="750" cy="300" r="12" fill="rgba(201,168,106,0.8)" />
            
            {/* Dimension lines */}
            <path
              className="blueprint-path"
              d="M 50 380 L 750 380"
              fill="none"
              stroke="rgba(201,168,106,0.4)"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
            
            {/* Labels */}
            <text x="400" y="395" textAnchor="middle" fill="rgba(201,168,106,0.6)" fontSize="14" fontFamily="Manrope">
              Стальной каркас 4мм
            </text>
            
            <text x="30" y="200" textAnchor="middle" fill="rgba(201,168,106,0.6)" fontSize="12" fontFamily="Manrope" transform="rotate(-90 30 200)">
              Магниты N35
            </text>
          </svg>
        </div>

        {/* Narrative */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-body text-steel leading-relaxed mb-8">
            Всё начинается с магнита. Не обычного, а неодимового N35 — одного из самых мощных в мире.
            Мы вшиваем его в каркас так, что вы не видите крепления, но чувствуете его силу.
          </p>
          
          <div className="magnetic-moment">
            <p className="text-quote text-fog/80 mb-8">
              Один щелчок — и шторка на месте.
            </p>
          </div>
          
          <p className="text-body text-steel leading-relaxed">
            Никакого клея. Никакого скотча. Никаких следов на краске.
            <br />
            Этот щелчок — звук того, что всё сделано правильно.
          </p>
        </div>

        {/* Technical specs */}
        <div className="specs-container mt-24 max-w-2xl mx-auto">
          <div className="spec-item flex items-baseline gap-4 border-b border-steel/20 pb-4 mb-4">
            <span className="text-caption text-brass w-32">Материал</span>
            <span className="text-body text-fog">Стальная проволока 4 мм</span>
          </div>
          <div className="spec-item flex items-baseline gap-4 border-b border-steel/20 pb-4 mb-4">
            <span className="text-caption text-brass w-32">Магниты</span>
            <span className="text-body text-fog">Неодимовые N35, 35 мегаэрстед</span>
          </div>
          <div className="spec-item flex items-baseline gap-4 border-b border-steel/20 pb-4 mb-4">
            <span className="text-caption text-brass w-32">Сетка</span>
            <span className="text-body text-fog">Премиум полиэстер, UV-стойкая</span>
          </div>
          <div className="spec-item flex items-baseline gap-4">
            <span className="text-caption text-brass w-32">Прототипов</span>
            <span className="text-body text-fog">200 итераций до совершенства</span>
          </div>
        </div>
      </div>
    </section>
  );
}
