import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

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

// ============ HOOKS ============
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  
  return { ref, visible };
}

function useCountUp(end: number, start = false) {
  const [v, setV] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    let t0: number;
    const run = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / 2000, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, [end, start]);
  
  return v;
}

// ============ IMAGES ============
const IMG = {
  hero: 'https://image.qwenlm.ai/generated-images/61714e6e-1d6b-48cb-aba7-de7e6f2162b7/_result.png',
  installed: 'https://image.qwenlm.ai/generated-images/a051b243-da3a-45ca-85a4-7be441a4a002/_result.png',
  mesh: 'https://image.qwenlm.ai/generated-images/3d2aa903-eae8-429f-9a47-9e62a1945c89/_result.png',
  product: 'https://image.qwenlm.ai/generated-images/c75109ad-4c99-461e-a19b-783babc61d80/_result.png',
  texture: 'https://image.qwenlm.ai/generated-images/bea8753d-292b-48d5-a58f-b0be8e370dd2/_result.png',
  g1: 'https://sun9-7.vkuserphoto.ru/s/v1/ig2/eispSnwz9X2hrEO3Pbdqn_Lj1gRSMOLXQm6opejaSun3IXeK0grWUgfckGEsfniYsJA59BFxn9Yw7deQ5WrXL1ZA.jpg?quality=95&as=32x16,48x24,72x36,108x55,160x81,240x122,360x183,480x243,540x274,640x324,720x365,1080x548,1280x649,1440x730,2560x1298&from=bu&u=abw07EHPYE9OcjffAY1JjvMHdN9TZUq-ZTNlo4550-E&cs=2560x0',
  g2: 'https://sun9-70.vkuserphoto.ru/s/v1/ig2/NAOdZchuN80mZQJ58HqHteSqfv4BMoMKkaDwWTb3b4zEoseNtZ8vDxEnkra4qfaLsqa5h5Sib5VsdR0VEpb4kCjB.jpg?quality=95&as=32x14,48x22,72x32,108x49,160x72,240x108,360x162,480x216,540x243,640x288,720x324,1080x486,1280x576,1440x648,2560x1152&from=bu&u=cxMX70Bym5-VTuqISqk7KIUpAFq0BR3UIYoiwCL4o_I&cs=2560x0',
  g3: 'https://sun9-65.vkuserphoto.ru/s/v1/ig2/rdaWAna1J2iGcLmUtOhnwo4d4G5y-UnfQQF9a89T_OhGLWzstD312N8xkPsLUb5fcfyIsBv296ozMWRoYHF-xyJE.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&u=n32Y1_-jZQshbq-GvSEMCM76QghSD6BmuLH2GknIy3M&cs=2560x0',
  g4: 'https://sun9-54.vkuserphoto.ru/s/v1/ig2/KK44fuf5HhFQN9wkgZ4Msem2OeOIsFOd79FESZ6D0Q_gK_LjdJmxng0aH7epqicFAhMUx-fNxPHN4gYYWk3SPqwa.jpg?quality=95&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x360,540x304,640x360,720x405,1080x607,1280x720,1440x810,2560x1440&from=bu&u=4RjyCr0zEoOEzUmqHeIRn5B_k9kiWLuzV3syZ0Q3w1c&cs=2560x0',
  g5: 'https://sun9-17.vkuserphoto.ru/s/v1/ig2/NGbjY5kEA4Yxg4k6m-cFWaX1y3SCvw5jCk8renHr5eNpQfOG9qnTQ2NdumkPca-mYmdU25s6Ssc0Hcju8qQDUagn.jpg?quality=95&crop=0,0,1707,2560&from=bu&u=1WfV4OVllsShwmNVnCt3DUBxzjMSGTiDiTHA9ibFrF4&cs=1707x0',
  g6: 'https://sun9-34.vkuserphoto.ru/s/v1/ig2/K8Gwoe4egTnBf3TQ7qGMG20jsWiuX5X2zySdLARIv_drZk-yCpl4Ul7kxOv5Cjn9P3vAGsUKf99uVtHdGOHX4AYg.jpg?quality=95&as=32x45,48x68,72x102,108x153,160x226,240x339,360x509,480x679,540x764,640x905,720x1018,1080x1527,1191x1684&from=bu&u=ozG8KPGAX22-DaXhgozmmbEamFGwgLIodhlaWJzsTnA&cs=1191x0',
};

// ============ COOKIE BANNER ============
function CookieBanner() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const accepted = localStorage.getItem('cookies_accepted');
    if (!accepted) {
      setTimeout(() => setVisible(true), 2000);
    }
  }, []);
  
  const accept = () => {
    localStorage.setItem('cookies_accepted', 'true');
    setVisible(false);
  };
  
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-black/95 backdrop-blur-xl border-t border-white/10">
      <div className="container-fluid flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/70 text-xs md:text-sm text-center md:text-left">
          Мы используем cookies для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с{' '}
          <a href="#" className="underline hover:text-white">политикой конфиденциальности</a>.
        </p>
        <button
          onClick={accept}
          className="btn-primary whitespace-nowrap text-sm"
        >
          Принять
        </button>
      </div>
    </div>
  );
}

// ============ NAVIGATION ============
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-3 bg-black/90 backdrop-blur-2xl' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="container-fluid flex items-center justify-between" aria-label="Главная навигация">
        <a href="#hero" className="flex items-center gap-3" aria-label="VELES - На главную">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">VELES</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {[
            ['Продукт', '#product'],
            ['Технологии', '#tech'],
            ['Каталог', '#catalog'],
            ['Отзывы', '#reviews'],
          ].map(([l, h]) => (
            <a
              key={h}
              href={h}
              className="text-[13px] text-white/70 hover:text-white transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        
        <a
          href="#order"
          className="hidden md:block btn-primary text-[13px]"
        >
          Заказать
        </a>
        
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Меню"
          aria-expanded={open}
        >
          <span className={`w-5 h-[1.5px] bg-white transition-all ${open ? 'rotate-45 translate-y-[4px]' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-white transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-white transition-all ${open ? '-rotate-45 -translate-y-[4px]' : ''}`} />
        </button>
      </nav>
      
      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black z-40 transition-all duration-500 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {[
            ['Продукт', '#product'],
            ['Технологии', '#tech'],
            ['Каталог', '#catalog'],
            ['Отзывы', '#reviews'],
            ['Заказать', '#order'],
          ].map(([l, h]) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="text-2xl text-white/80"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

// ============ HERO SECTION ============
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const ctx = gsap.context(() => {
      // Ken Burns effect on hero image
      gsap.to('.hero-image', {
        scale: 1.1,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });
      
      // Parallax on scroll
      gsap.to('.hero-content', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      
      // Fade out on scroll
      gsap.to('.hero-overlay', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden"
      aria-label="Главный баннер"
    >
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0">
        <img
          src={IMG.hero}
          alt="Каркасные автошторки VELES премиум-класса"
          className="hero-image w-full h-full object-cover opacity-60"
          fetchPriority="high"
        />
      </div>
      
      {/* Gradient overlay */}
      <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      
      {/* Content */}
      <div className="hero-content relative z-10 text-center px-5 md:px-10 max-w-4xl">
        <p className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in-up delay-300">
          Каркасные автошторки премиум-класса
        </p>
        
        <h1 className="text-display mb-6 animate-fade-in-up delay-500">
          VELES
        </h1>
        
        <p className="text-white/70 text-body max-w-2xl mx-auto leading-relaxed mb-8 animate-fade-in-up delay-700">
          Премиальные шторки на магнитном креплении. Защита от солнца, пыли и насекомых.
          Установка за 5 секунд. Производство в Абакане.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up delay-1000">
          <a href="#order" className="btn-primary">
            Заказать шторки
          </a>
          <a href="#catalog" className="btn-secondary">
            Каталог моделей
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-1400 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}

// ============ ENGINEERING SECTION (Complex Scroll Animations) ============
function Engineering() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;
    
    const ctx = gsap.context(() => {
      // SVG path drawing animation
      const path = svgRef.current?.querySelector('.wireframe-path') as SVGPathElement | null;
      if (path && svgRef.current) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top 60%',
            end: 'center center',
            scrub: 1,
          },
        });
      }
      
      // Parallax on specs
      const specItems = gsap.utils.toArray<HTMLElement>('.spec-item');
      specItems.forEach((item, i) => {
        gsap.from(item, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          delay: i * 0.1,
        });
      });
      
      // Floating animation on diagram
      gsap.to('.floating-diagram', {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section
      id="tech"
      ref={sectionRef}
      className="section-padding bg-secondary"
      aria-label="Технические характеристики"
    >
      <div className="container-fluid">
        <header className="text-center mb-16 md:mb-24">
          <p className="text-caption text-white/30 mb-4">Инженерия</p>
          <h2 className="text-h1 mb-6">Точность в каждой детали</h2>
          <p className="text-body text-white/60 max-w-2xl mx-auto">
            Каждый элемент продуман до миллиметра. Стальной каркас, неодимовые магниты,
            премиум-сетка — всё работает как единый механизм.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* SVG Wireframe */}
          <div className="relative aspect-square max-w-lg mx-auto">
            <svg
              ref={svgRef}
              viewBox="0 0 400 400"
              className="w-full h-full floating-diagram"
              aria-label="Схема каркасной автошторки"
            >
              {/* Frame outline */}
              <path
                className="wireframe-path"
                d="M 50 50 L 350 50 L 350 350 L 50 350 Z"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              
              {/* Mesh pattern */}
              <path
                className="wireframe-path"
                d="M 50 100 L 350 100 M 50 150 L 350 150 M 50 200 L 350 200 M 50 250 L 350 250 M 50 300 L 350 300"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              
              <path
                className="wireframe-path"
                d="M 100 50 L 100 350 M 150 50 L 150 350 M 200 50 L 200 350 M 250 50 L 250 350 M 300 50 L 300 350"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              
              {/* Magnets */}
              <circle cx="50" cy="100" r="8" fill="rgba(255,255,255,0.6)" />
              <circle cx="50" cy="200" r="8" fill="rgba(255,255,255,0.6)" />
              <circle cx="50" cy="300" r="8" fill="rgba(255,255,255,0.6)" />
              <circle cx="350" cy="100" r="8" fill="rgba(255,255,255,0.6)" />
              <circle cx="350" cy="200" r="8" fill="rgba(255,255,255,0.6)" />
              <circle cx="350" cy="300" r="8" fill="rgba(255,255,255,0.6)" />
              
              {/* Labels */}
              <text x="200" y="30" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12">
                Стальной каркас 4мм
              </text>
              <text x="20" y="200" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12" transform="rotate(-90 20 200)">
                Магниты N35
              </text>
            </svg>
          </div>
          
          {/* Specs */}
          <div className="space-y-8">
            {[
              { label: 'Каркас', value: 'Стальная проволока 4 мм' },
              { label: 'Сетка', value: 'Премиум полиэстер, UV-стойкая' },
              { label: 'Магниты', value: 'Неодимовые N35' },
              { label: 'Хлястики', value: 'Натуральная кожа' },
              { label: 'Швы', value: 'Армированные нити, двойная строчка' },
              { label: 'Светопропускаемость', value: '10%' },
            ].map((spec, i) => (
              <div key={i} className="spec-item flex items-baseline gap-4 border-b border-white/5 pb-4">
                <span className="text-white/30 text-sm w-40 flex-shrink-0">{spec.label}</span>
                <span className="text-white text-base font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ REST OF SECTIONS (simplified for brevity) ============
function AboutCompany() {
  const { ref, visible } = useReveal();
  return (
    <section className="section-padding bg-primary" aria-label="О компании">
      <div ref={ref} className={`container-fluid reveal ${visible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-caption text-white/30 mb-4">О компании</p>
            <h2 className="text-h1 mb-6">Производство в Абакане</h2>
            <p className="text-body text-white/60 mb-4">
              Компания VELES специализируется на производстве каркасных автошторок премиум-класса с 2019 года.
              Каждое изделие создаётся вручную с использованием качественных материалов.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div>
                <div className="text-h3 font-bold">5+</div>
                <p className="text-white/40 text-xs mt-1">лет на рынке</p>
              </div>
              <div>
                <div className="text-h3 font-bold">2000+</div>
                <p className="text-white/40 text-xs mt-1">клиентов</p>
              </div>
              <div>
                <div className="text-h3 font-bold">500+</div>
                <p className="text-white/40 text-xs mt-1">моделей авто</p>
              </div>
            </div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img src={IMG.g6} alt="Производство VELES" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Catalog() {
  const { ref, visible } = useReveal();
  const [patterns, setPatterns] = useState<any>(null);

  useEffect(() => {
    fetch('/patterns.json')
      .then(res => res.json())
      .then(data => setPatterns(data))
      .catch(err => console.error('Failed to load patterns:', err));
  }, []);

  const brands = patterns ? Object.keys(patterns.brands) : [];

  return (
    <section id="catalog" className="section-padding bg-secondary" aria-label="Каталог моделей">
      <div ref={ref} className={`container-fluid reveal ${visible ? 'visible' : ''}`}>
        <header className="mb-12 md:mb-16">
          <p className="text-caption text-white/30 mb-4">Каталог</p>
          <h2 className="text-h1 mb-6">Более 500 моделей</h2>
          <p className="text-body text-white/60 max-w-2xl">
            Изготавливаем шторки индивидуально под каждую модель автомобиля.
          </p>
        </header>
        
        <div className="flex flex-wrap gap-3">
          {brands.map((brand: string) => (
            <span key={brand} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrderForm() {
  const { ref, visible } = useReveal();
  const [patterns, setPatterns] = useState<any>(null);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [hasPattern, setHasPattern] = useState<boolean | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', comment: '' });
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch('/patterns.json')
      .then(res => res.json())
      .then(data => setPatterns(data))
      .catch(err => console.error('Failed to load patterns:', err));
  }, []);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    if (patterns && selectedBrand && selectedModel) {
      const modelData = patterns.brands[selectedBrand]?.models[selectedModel];
      setHasPattern(modelData?.hasPattern || false);
    }
  };

  const submit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => setDone(false), 5000);
    setForm({ name: '', phone: '', comment: '' });
  }, []);

  const brands = patterns ? Object.keys(patterns.brands) : [];
  const models = selectedBrand && patterns ? Object.keys(patterns.brands[selectedBrand]?.models || {}) : [];
  const years = selectedBrand && selectedModel && patterns
    ? patterns.brands[selectedBrand]?.models[selectedModel]?.years || []
    : [];

  return (
    <section id="order" className="section-padding bg-primary" aria-label="Форма заказа">
      <div ref={ref} className={`container-fluid max-w-3xl reveal ${visible ? 'visible' : ''}`}>
        <header className="text-center mb-10">
          <p className="text-caption text-white/30 mb-4">Заказ</p>
          <h2 className="text-h1 mb-4">Закажите шторки VELES</h2>
          <p className="text-body text-white/40">Выберите ваш автомобиль — система проверит наличие лекала</p>
        </header>

        {done ? (
          <div className="text-center py-16 rounded-2xl border border-white/10">
            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-h3 mb-1">Заявка отправлена</h3>
            <p className="text-white/40 text-sm">Мы свяжемся с вами в течение 30 минут</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              <select
                value={selectedBrand}
                onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(''); setSelectedYear(''); setHasPattern(null); }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 focus:outline-none text-sm"
                aria-label="Выберите марку"
              >
                <option value="" className="bg-black">Выберите марку</option>
                {brands.map((brand: string) => (
                  <option key={brand} value={brand} className="bg-black">{brand}</option>
                ))}
              </select>

              {selectedBrand && (
                <select
                  value={selectedModel}
                  onChange={(e) => { setSelectedModel(e.target.value); setSelectedYear(''); setHasPattern(null); }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 focus:outline-none text-sm"
                  aria-label="Выберите модель"
                >
                  <option value="" className="bg-black">Выберите модель</option>
                  {models.map((model: string) => (
                    <option key={model} value={model} className="bg-black">{model}</option>
                  ))}
                </select>
              )}

              {selectedModel && (
                <select
                  value={selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 focus:outline-none text-sm"
                  aria-label="Выберите год выпуска"
                >
                  <option value="" className="bg-black">Выберите год выпуска</option>
                  {years.map((year: string) => (
                    <option key={year} value={year} className="bg-black">{year}</option>
                  ))}
                </select>
              )}
            </div>

            {hasPattern !== null && (
              <div className={`p-4 rounded-xl border ${hasPattern ? 'border-green-500/30 bg-green-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
                {hasPattern ? (
                  <p className="text-green-400 text-sm">✓ Лекало найдено. Доступен стандартный комплект.</p>
                ) : (
                  <p className="text-yellow-400 text-sm">⚠ Лекало не найдено. Возможно индивидуальное изготовление.</p>
                )}
              </div>
            )}

            {hasPattern !== null && (
              <form onSubmit={submit} className="space-y-3">
                <input
                  type="text" required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-white/30 focus:outline-none text-sm"
                  placeholder="Ваше имя"
                />
                <input
                  type="tel" required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-white/30 focus:outline-none text-sm"
                  placeholder="Телефон"
                />
                {!hasPattern && (
                  <textarea
                    value={form.comment}
                    onChange={e => setForm({ ...form, comment: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-white/30 focus:outline-none text-sm min-h-[100px] resize-none"
                    placeholder="Дополнительная информация (необязательно)"
                  />
                )}
                <button
                  type="submit"
                  id={hasPattern ? 'order-standard' : 'order-custom'}
                  className="btn-primary w-full mt-2"
                >
                  {hasPattern ? 'Заказать стандартный комплект' : 'Запросить индивидуальное изготовление'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-white/5" role="contentinfo">
      <div className="container-fluid flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="text-white font-semibold text-sm">VELES</span>
          <span className="text-white/20 text-xs">Каркасные автошторки</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://vk.com/avtoshtorki_abakan" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white text-xs transition-colors">
            VK
          </a>
          <a href="tel:+79134421234" className="text-white/30 hover:text-white text-xs transition-colors">
            +7 (913) 442-12-34
          </a>
        </div>
        <p className="text-white/15 text-[10px]">© 2024 VELES. Все права защищены.</p>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function App() {
  useLenis(); // Initialize smooth scroll
  
  return (
    <div className="overflow-x-hidden smooth-scroll">
      <CookieBanner />
      <Nav />
      <main>
        <Hero />
        <AboutCompany />
        <Engineering />
        <Catalog />
        <OrderForm />
      </main>
      <Footer />
    </div>
  );
}
