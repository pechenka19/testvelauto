import { useEffect, useRef, useState, useCallback } from 'react';

// ============ HOOKS ============

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function useCountUp(end: number, duration = 2500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  return count;
}

function useWordReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll('.word');
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.8;
      const end = windowH * 0.2;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      const activeCount = Math.floor(progress * words.length);
      words.forEach((word, i) => {
        if (i < activeCount) word.classList.add('active');
        else word.classList.remove('active');
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return ref;
}

function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !wrapperRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const containerH = containerRef.current.offsetHeight;
      const scrollable = containerH - windowH;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const wrapperW = wrapperRef.current.scrollWidth - window.innerWidth;
      wrapperRef.current.style.transform = `translateX(${-progress * wrapperW}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { containerRef, wrapperRef };
}

function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      const offset = (center - windowCenter) * speed;
      const img = ref.current.querySelector('.parallax-img') as HTMLElement;
      if (img) img.style.transform = `translateY(${offset}px) scale(1.1)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  return ref;
}

// ============ PHOTOS ============
const P = {
  hero: 'https://sun9-13.vkuserphoto.ru/s/v1/ig2/zFbcuceL2RhzNyaDMQfQLb6PUkMp-zJ782RHnx4ydYtDzaD6qexltBgqr-ErhUGnqOcTr5Y9OBAOaTzj-Ot_owp3.jpg?quality=95&crop=256,0,2048,1152&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720,1440x810,2048x1152&from=bu&u=K3w7mhYXJHgK4ldAnxuT9yEX1gyRRfZkSPNih-2BTYY&cs=2048x0',
  p1: 'https://sun9-7.vkuserphoto.ru/s/v1/ig2/uzMbsL18hLFPQsNqx60WYvTlwVKFelNy4bRDk2fWabopIEuOmqA2wxx-114qrbPsAcPkPNRFMEVb6SptCUmAldd1.jpg?quality=95&crop=0,0,2560,1920&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&u=SRNzGGrdCJyOmQ5tFs1BiC4UnzZwoCbJqwfRa4SrOKk&cs=2560x0',
  p2: 'https://sun9-59.vkuserphoto.ru/s/v1/ig2/73wlTEHSUOJFeStg7NqlwbVp_wK7iWmC-Zsyn1kzuby4fSpl9iuaxhpRx0f-bz0NBd8k3s4VG798o9dfytlyjnfn.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu&u=QbiYUxVCg1xucOgyQCsge1l_aez8VJGdUR6HEFx_lR4&cs=1920x0',
  p3: 'https://sun9-68.vkuserphoto.ru/s/v1/ig2/u2Yep-q10rjkasBC84VyBrgB5NlUUMkI4hz2f-bHRHusrDFoBR4hmGhpvqDlDXBvY6rkrxoW-qC1oPhtWmtY2jhq.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu&u=3psrzXdNT7wb7CjPs6oDM6g8S75qYbHdMtnc9_r5sBg&cs=1920x0',
  g1: 'https://sun9-7.vkuserphoto.ru/s/v1/ig2/eispSnwz9X2hrEO3Pbdqn_Lj1gRSMOLXQm6opejaSun3IXeK0grWUgfckGEsfniYsJA59BFxn9Yw7deQ5WrXL1ZA.jpg?quality=95&as=32x16,48x24,72x36,108x55,160x81,240x122,360x183,480x243,540x274,640x324,720x365,1080x548,1280x649,1440x730,2560x1298&from=bu&u=abw07EHPYE9OcjffAY1JjvMHdN9TZUq-ZTNlo4550-E&cs=2560x0',
  g2: 'https://sun9-70.vkuserphoto.ru/s/v1/ig2/NAOdZchuN80mZQJ58HqHteSqfv4BMoMKkaDwWTb3b4zEoseNtZ8vDxEnkra4qfaLsqa5h5Sib5VsdR0VEpb4kCjB.jpg?quality=95&as=32x14,48x22,72x32,108x49,160x72,240x108,360x162,480x216,540x243,640x288,720x324,1080x486,1280x576,1440x648,2560x1152&from=bu&u=cxMX70Bym5-VTuqISqk7KIUpAFq0BR3UIYoiwCL4o_I&cs=2560x0',
  g3: 'https://sun9-9.vkuserphoto.ru/s/v1/ig2/qVgVA4MgeRC_kC8LjGFxtfwmF3m-3nl290Jo0Xd33K_3uXr-NgxxSHvemqH1W6WB4Ui5uo0Yjj1NC-XjzmB8y51z.jpg?quality=95&as=32x14,48x22,72x32,108x49,160x72,240x108,360x162,480x216,540x243,640x288,720x324,1080x486,1280x576,1440x648,2560x1152&from=bu&u=opi_XlzFHTeBVWvcyAWT8ApY3kqMFP-SiOAQ1Co33f4&cs=2560x0',
  g4: 'https://sun9-45.vkuserphoto.ru/s/v1/ig2/GnuybaSFQweWS-eeypzELlQ-T6evqy8xQagcTCNlgbHnlKAapTOwxA_sNSP2nDdZmBBJ1_tmx8wM5hXiiQYwJTAD.jpg?quality=95&as=32x14,48x22,72x32,108x49,160x72,240x108,360x162,480x216,540x243,640x288,720x324,1080x486,1280x576,1440x648,2560x1152&from=bu&u=7qeRQjF0ZXgaxdjygqeN0CtmsgT_q2CUMpPv6tPSung&cs=2560x0',
  g5: 'https://sun9-65.vkuserphoto.ru/s/v1/ig2/rdaWAna1J2iGcLmUtOhnwo4d4G5y-UnfQQF9a89T_OhGLWzstD312N8xkPsLUb5fcfyIsBv296ozMWRoYHF-xyJE.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&u=n32Y1_-jZQshbq-GvSEMCM76QghSD6BmuLH2GknIy3M&cs=2560x0',
  g6: 'https://sun9-54.vkuserphoto.ru/s/v1/ig2/KK44fuf5HhFQN9wkgZ4Msem2OeOIsFOd79FESZ6D0Q_gK_LjdJmxng0aH7epqicFAhMUx-fNxPHN4gYYWk3SPqwa.jpg?quality=95&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x360,540x304,640x360,720x405,1080x607,1280x720,1440x810,2560x1440&from=bu&u=4RjyCr0zEoOEzUmqHeIRn5B_k9kiWLuzV3syZ0Q3w1c&cs=2560x0',
  g7: 'https://sun9-17.vkuserphoto.ru/s/v1/ig2/NGbjY5kEA4Yxg4k6m-cFWaX1y3SCvw5jCk8renHr5eNpQfOG9qnTQ2NdumkPca-mYmdU25s6Ssc0Hcju8qQDUagn.jpg?quality=95&crop=0,0,1707,2560&as=32x48,48x72,72x108,108x162,160x240,240x360,360x540,480x720,540x810,640x960,720x1080,1080x1620,1280x1920,1440x2160,1707x2560&from=bu&u=1WfV4OVllsShwmNVnCt3DUBxzjMSGTiDiTHA9ibFrF4&cs=1707x0',
  g8: 'https://sun9-34.vkuserphoto.ru/s/v1/ig2/K8Gwoe4egTnBf3TQ7qGMG20jsWiuX5X2zySdLARIv_drZk-yCpl4Ul7kxOv5Cjn9P3vAGsUKf99uVtHdGOHX4AYg.jpg?quality=95&as=32x45,48x68,72x102,108x153,160x226,240x339,360x509,480x679,540x764,640x905,720x1018,1080x1527,1191x1684&from=bu&u=ozG8KPGAX22-DaXhgozmmbEamFGwgLIodhlaWJzsTnA&cs=1191x0',
  g9: 'https://sun9-5.vkuserphoto.ru/s/v1/ig2/8AeAE7ff8ZdAjIPmj9lfGu1BfzaaTcR-4l-v5i5JCSHwwqMlxLSxFHZd71RrI91gsNFZ_SpimT_9Kk4qIN62poAy.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960&from=bu&u=44Dwwp-Ykk5o9gxzqVF4luR4PrXJYWCQdY1HKsWMw4I&cs=1280x0',
  g10: 'https://sun9-41.vkuserphoto.ru/s/v1/ig2/ZVKX_jucXzMo9fJyXcsNhrcMS7-SXKlgBtUBGrn0R85NtQhge0D70Fj6QlMRkrmRjKCGzdGx2tgkzO3_hWL02Ucw.jpg?quality=95&as=32x57,48x85,72x128,108x192,160x284,240x427,360x640,480x853,540x960,640x1138,720x1280,900x1600&from=bu&u=dFwkuajeaHs38gCXQAIl5tn6rkMB92AjMol6bO84Wwk&cs=900x0',
};

// ============ COMPONENTS ============

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100] bg-transparent">
      <div className="h-full bg-white/50 scroll-progress" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-black/80 backdrop-blur-2xl' : 'py-6 bg-transparent'}`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#hero" className="text-xl font-semibold tracking-tight text-white">VELES</a>
        <div className="hidden lg:flex items-center gap-10">
          {[['Продукт', '#product'], ['Технологии', '#tech'], ['Галерея', '#gallery'], ['Отзывы', '#reviews']].map(([l, h]) => (
            <a key={h} href={h} className="text-[13px] text-white/70 hover:text-white transition-colors duration-300 tracking-[-0.01em]">{l}</a>
          ))}
        </div>
        <a href="#order" className="hidden lg:block btn-primary px-5 py-2.5 rounded-full text-[13px]">Заказать</a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5">
          <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
        </button>
      </div>
      <div className={`lg:hidden fixed inset-0 bg-black z-40 transition-all duration-500 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {[['Продукт', '#product'], ['Технологии', '#tech'], ['Галерея', '#gallery'], ['Отзывы', '#reviews'], ['Заказать', '#order']].map(([l, h]) => (
            <a key={h} href={h} onClick={() => setMenuOpen(false)} className="text-2xl text-white/80 hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ============ HERO ============
function HeroSection() {
  const parallaxRef = useParallax(0.15);
  return (
    <section id="hero" className="relative h-[100vh] min-h-[700px] flex items-end overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0">
        <div className="parallax-img absolute inset-0">
          <img src={P.hero} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 overlay-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 pb-20 md:pb-32 w-full">
        <p className="text-white/60 text-sm md:text-base tracking-[0.2em] uppercase mb-6 animate-fade-in-up delay-300">Каркасные автошторки</p>
        <h1 className="text-white text-[clamp(3rem,9vw,9rem)] font-bold tracking-[-0.04em] leading-[0.9] max-w-[90%] animate-fade-in-up delay-500">
          Комфорт,<br />который вы<br />заслужили.
        </h1>
        <p className="mt-8 md:mt-10 text-white/60 text-lg md:text-2xl max-w-xl leading-relaxed font-light animate-fade-in-up delay-700">
          Защита от солнца, пыли и насекомых. Магнитное крепление. Установка за 5 секунд.
        </p>
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-1000">
          <a href="#order" className="btn-primary px-8 py-4 rounded-full text-sm text-center">Заказать шторки</a>
          <a href="#product" className="btn-secondary px-8 py-4 rounded-full text-sm text-center">Узнать больше</a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-1400">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

// ============ MANIFESTO (Word reveal) ============
function ManifestoSection() {
  const ref = useWordReveal();
  const text = "Каждый день за рулём — это борьба. Солнце слепит. Салон раскаляется. Насекомые летят в лицо. Дети капризничают. Вы тратите энергию на то, чтобы просто доехать. Мы решили это изменить. VELES — это не просто автошторки. Это новый стандарт комфорта в автомобиле. Создано для тех, кто понимает: дорога должна приносить удовольствие, а не стресс.";
  const words = text.split(' ');

  return (
    <section className="relative py-[30vh] md:py-[40vh] section-dark">
      <div ref={ref} className="max-w-[1400px] mx-auto px-6 md:px-12 word-reveal">
        <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-12">Философия</p>
        <p className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.15]">
          {words.map((word, i) => (
            <span key={i} className="word">{word}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

// ============ PRODUCT INTRO (Fullscreen image) ============
function ProductIntro() {
  const { ref, isVisible } = useScrollReveal();
  const parallaxRef = useParallax(0.2);

  return (
    <section id="product" className="relative">
      <div ref={parallaxRef} className="relative h-[120vh] overflow-hidden">
        <div className="parallax-img absolute inset-0">
          <img src={P.p1} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 overlay-gradient" />
        <div ref={ref} className={`absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24 reveal-slow ${isVisible ? 'visible' : ''}`}>
          <p className="text-white/50 text-sm tracking-[0.2em] uppercase mb-6">Продукт</p>
          <h2 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.95] max-w-4xl">
            Создано для тех, кто ценит каждую деталь.
          </h2>
        </div>
      </div>
    </section>
  );
}

// ============ STICKY SCROLL STORYTELLING ============
function StickyStorySection() {
  const stories = [
    {
      title: 'Идеальная посадка',
      text: 'Каждая шторка создаётся под конкретную модель автомобиля — с точностью до миллиметра. Стальной каркас повторяет геометрию вашего стекла. Без зазоров. Без щелей.',
      img: P.g5,
    },
    {
      title: 'Неодимовые магниты',
      text: 'Вшиты в каркас под резинкой. Шторка притягивается к металлической рамке двери — без клея, без скотча, без сверления. Краска не страдает.',
      img: P.p3,
    },
    {
      title: 'Премиум-сетка',
      text: 'Мелкоячеистая структура обеспечивает отличную прозрачность изнутри. Вы видите дорогу. Снаружи — ничего не видно. Эффект тонировки без тонировки.',
      img: P.g2,
    },
    {
      title: 'Натуральная кожа',
      text: 'Хлястики из натуральной кожи с логотипом VELES. Тактильно приятно. Не выцветает. Выглядит дорого — как и должно быть.',
      img: P.p2,
    },
    {
      title: 'Армированные швы',
      text: 'Двойная строчка армированными нитями. Каркас не развалится. Сетка не оторвётся. Качество, которое служит годами.',
      img: P.g7,
    },
  ];

  return (
    <section id="tech" className="relative">
      <StickyStoryController stories={stories} />
    </section>
  );
}

function StickyStoryController({ stories }: { stories: { title: string; text: string; img: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionH = sectionRef.current.offsetHeight;
      const windowH = window.innerHeight;
      const scrolled = -rect.top;
      const total = sectionH - windowH;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      const index = Math.min(stories.length - 1, Math.floor(progress * stories.length));
      setActiveIndex(index);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stories.length]);

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${stories.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center">
        {/* Background images */}
        {stories.map((story, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === activeIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={story.img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>
        ))}
        {/* Content */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <div className="max-w-xl">
            <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">Технологии — {String(activeIndex + 1).padStart(2, '0')}</p>
            {stories.map((story, i) => (
              <div key={i} className={`transition-all duration-700 ${i === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute'}`}>
                {i === activeIndex && (
                  <>
                    <h3 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.95] mb-6">
                      {story.title}
                    </h3>
                    <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                      {story.text}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Progress dots */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {stories.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-white scale-125' : 'bg-white/20'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ HORIZONTAL SCROLL GALLERY ============
function HorizontalGallery() {
  const { containerRef, wrapperRef } = useHorizontalScroll();
  const { ref, isVisible } = useScrollReveal();

  const items = [
    { img: P.g1, title: 'Volkswagen Tiguan' },
    { img: P.g2, title: 'Kia Sportage' },
    { img: P.g3, title: 'Hyundai Tucson' },
    { img: P.g4, title: 'Toyota Camry' },
    { img: P.g5, title: 'Mazda CX-5' },
    { img: P.g6, title: 'Nissan X-Trail' },
    { img: P.g8, title: 'Volkswagen Polo' },
    { img: P.g9, title: 'Skoda Octavia' },
  ];

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div ref={ref} className={`px-6 md:px-12 pt-16 md:pt-20 flex-shrink-0 reveal ${isVisible ? 'visible' : ''}`}>
          <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-4">Галерея</p>
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-[-0.03em]">Реальные установки.</h2>
          <p className="mt-4 text-white/40 text-lg max-w-xl">Прокручивайте дальше →</p>
        </div>
        <div className="flex-1 flex items-center">
          <div ref={wrapperRef} className="flex gap-6 md:gap-8 pl-6 md:pl-12 will-change-transform">
            {items.map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw]">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="text-white/60 text-sm tracking-wide">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ STATS ============
function StatsSection() {
  const { ref, isVisible } = useScrollReveal();
  const clients = useCountUp(2000, 2500, isVisible);
  const models = useCountUp(500, 2500, isVisible);
  const cities = useCountUp(150, 2500, isVisible);
  const years = useCountUp(5, 2500, isVisible);

  return (
    <section className="relative py-32 md:py-48 lg:py-64 bg-[#0a0a0a]">
      <div ref={ref} className={`max-w-[1600px] mx-auto px-6 md:px-12 reveal-slow ${isVisible ? 'visible' : ''}`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {[
            { value: clients, suffix: '+', label: 'Довольных клиентов' },
            { value: models, suffix: '+', label: 'Моделей авто' },
            { value: cities, suffix: '+', label: 'Городов доставки' },
            { value: years, suffix: ' лет', label: 'На рынке' },
          ].map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <div className="number-massive text-white counter">{stat.value}{stat.suffix}</div>
              <p className="text-white/30 text-base mt-4 tracking-[-0.01em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PROTECTION FEATURES ============
function ProtectionSection() {
  const { ref, isVisible } = useScrollReveal();
  const staggerRef = useRef<HTMLDivElement>(null);
  const [staggerVisible, setStaggerVisible] = useState(false);

  useEffect(() => {
    if (!staggerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStaggerVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(staggerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-32 md:py-48 lg:py-64 bg-black">
      <div ref={ref} className={`max-w-[1600px] mx-auto px-6 md:px-12 reveal ${isVisible ? 'visible' : ''}`}>
        <div className="max-w-3xl mb-20 md:mb-28">
          <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-6">Защита</p>
          <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.0]">
            Всё, от чего вы устали —<br />больше не проблема.
          </h2>
        </div>
        <div ref={staggerRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${staggerVisible ? 'visible' : ''}`}>
          {[
            { num: '01', title: 'Солнце', desc: 'Светопропускаемость 10%. Салон не нагревается. Кондиционер работает эффективнее. Экономия на топливе.' },
            { num: '02', title: 'Насекомые', desc: 'Мелкоячеистая сетка не пропускает мошек, комаров, пух. Окна можно держать открытыми — даже ночью.' },
            { num: '03', title: 'Приватность', desc: 'Эффект тонировки без тонировки. Изнутри — отличный обзор. Снаружи — ничего не видно. Законно.' },
            { num: '04', title: 'Пыль и грязь', desc: 'Салон остаётся чистым. Панель и обивка не выгорают. Меньше уборки. Больше удовольствия от авто.' },
          ].map((item, i) => (
            <div key={i} className="feature-card p-8 md:p-10 rounded-3xl">
              <span className="text-white/15 text-sm font-medium">{item.num}</span>
              <h4 className="text-white text-2xl font-semibold mt-6 mb-4">{item.title}</h4>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ INSTALLATION ============
function InstallationSection() {
  const { ref, isVisible } = useScrollReveal();
  const parallaxRef = useParallax(0.15);

  return (
    <section className="relative py-32 md:py-48 lg:py-64 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center reveal ${isVisible ? 'visible' : ''}`}>
          <div>
            <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-6">Установка</p>
            <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.95] mb-10">
              Пять секунд.<br />Без инструментов.
            </h2>
            <div className="space-y-8">
              {[
                { step: '01', title: 'Приложите', desc: 'Поднесите шторку к оконному проёму вашего автомобиля' },
                { step: '02', title: 'Магниты сработают', desc: 'Неодимовые магниты мгновенно притянутся к металлической рамке' },
                { step: '03', title: 'Готово', desc: 'Шторка зафиксирована. Наслаждайтесь комфортом каждой поездки' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <span className="text-white/10 text-5xl font-bold flex-shrink-0">{item.step}</span>
                  <div>
                    <h4 className="text-white text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-white/40 text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div ref={parallaxRef} className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <div className="parallax-img absolute inset-0">
              <img src={P.g10} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ COMPARISON ============
function ComparisonSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative py-32 md:py-48 lg:py-64 bg-black">
      <div ref={ref} className={`max-w-[1600px] mx-auto px-6 md:px-12 reveal-slow ${isVisible ? 'visible' : ''}`}>
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-6">Сравнение</p>
          <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.0]">
            VELES vs Тонировка.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          <div className="p-10 md:p-14 rounded-3xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-white/25 text-2xl font-semibold mb-10">Обычная тонировка</h3>
            <ul className="space-y-5">
              {['Штрафы и предписания ГИБДД', 'Нельзя снять на месте', 'Повреждает стекло при демонтаже', 'Ухудшает обзор в тёмное время', 'Одноразовое решение', 'Только в специализированном сервисе'].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-white/20 text-base">
                  <span className="mt-1.5 w-5 h-5 rounded-full border border-white/10 flex-shrink-0 flex items-center justify-center">
                    <span className="w-2 h-[1px] bg-white/20" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 md:p-14 rounded-3xl border border-white/25 bg-white/[0.04]">
            <div className="flex items-center gap-3 mb-10">
              <h3 className="text-white text-2xl font-semibold">VELES</h3>
              <span className="text-[10px] text-white/50 border border-white/20 rounded-full px-2.5 py-1 uppercase tracking-wider">Рекомендуем</span>
            </div>
            <ul className="space-y-5">
              {['Полностью законно — не тонировка', 'Снимается за 10 секунд', 'Не повреждает автомобиль', 'Отличный обзор в любое время', 'Многоразовое использование', 'Установка самостоятельно за 5 секунд'].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-white/80 text-base">
                  <span className="mt-1.5 w-5 h-5 rounded-full border border-white/40 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FOR WHO ============
function ForWhoSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative py-32 md:py-48 lg:py-64 bg-[#0a0a0a]">
      <div ref={ref} className={`max-w-[1600px] mx-auto px-6 md:px-12 reveal ${isVisible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-6">Для кого</p>
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.05] mb-8">
              Для тех, кто проводит в машине жизнь.
            </h2>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed">
              Таксисты и дальнобойщики. Родители с маленькими детьми. Путешественники и те, кто каждый день стоит в пробках. 
              Все, кто понимает: комфорт в дороге — это не роскошь, а необходимость.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {[P.g5, P.g6, P.g9, P.g10].map((src, i) => (
              <div key={i} className={`aspect-square overflow-hidden rounded-2xl ${i % 2 === 1 ? 'mt-12' : ''}`}>
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ REVIEWS ============
function ReviewsSection() {
  const { ref, isVisible } = useScrollReveal();
  const staggerRef = useRef<HTMLDivElement>(null);
  const [staggerVisible, setStaggerVisible] = useState(false);

  useEffect(() => {
    if (!staggerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStaggerVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(staggerRef.current);
    return () => observer.disconnect();
  }, []);

  const reviews = [
    { text: 'Заказал шторки на Камри — качество просто космос. Установил за 5 минут, магниты держат мёртво. Теперь в машине реально прохладно даже в +35.', name: 'Алексей К.', car: 'Toyota Camry' },
    { text: 'Ребёнок наконец-то спит в машине днём! Шторки блокируют солнце, а обзор для меня остаётся отличный. Рекомендую всем мамам.', name: 'Мария С.', car: 'Kia Sportage' },
    { text: 'Лучше любой тонировки. Законно, удобно, красиво. Снял за 10 секунд когда подъехал к посту — никаких проблем.', name: 'Дмитрий В.', car: 'Hyundai Tucson' },
    { text: 'Качество материалов на высоте. Кожаные хлястики, ровные швы, магниты мощные. Видно, что делали с душой.', name: 'Ольга П.', car: 'Volkswagen Tiguan' },
    { text: 'Второй раз заказываю — теперь на вторую машину. Пыль перестала лететь в салон, насекомые тоже не пробираются.', name: 'Сергей М.', car: 'Mazda CX-5' },
    { text: 'Подруга посоветовала — не пожалела ни секунды. Салон не выгорает, кондиционер работает эффективнее.', name: 'Анна Л.', car: 'Nissan X-Trail' },
  ];

  return (
    <section id="reviews" className="relative py-32 md:py-48 lg:py-64 bg-black">
      <div ref={ref} className={`max-w-[1600px] mx-auto px-6 md:px-12 reveal ${isVisible ? 'visible' : ''}`}>
        <div className="mb-16 md:mb-24">
          <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-6">Отзывы</p>
          <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em]">Что говорят клиенты.</h2>
        </div>
        <div ref={staggerRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${staggerVisible ? 'visible' : ''}`}>
          {reviews.map((review, i) => (
            <div key={i} className="feature-card p-8 md:p-10 rounded-3xl">
              <p className="text-white/70 text-base leading-relaxed mb-10">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white/60 text-sm font-medium">{review.name[0]}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{review.name}</p>
                  <p className="text-white/30 text-xs">{review.car}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="https://vk.com/avtoshtorki_abakan" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm transition-colors inline-flex items-center gap-2">
            Все отзывы на VK →
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ FAQ ============
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollReveal();
  const faqs = [
    { q: 'Подойдут ли шторки на мой автомобиль?', a: 'Мы изготавливаем шторки индивидуально под каждую модель. У нас более 500 моделей в базе. Укажите марку, модель и год выпуска — мы подберём идеальный размер.' },
    { q: 'Не ухудшится ли обзор?', a: 'Мелкоячеистая премиум-сетка обеспечивает отличную прозрачность изнутри. Вы видите всё на дороге, при этом снаружи салон полностью скрыт.' },
    { q: 'Как крепятся шторки?', a: 'Неодимовые магниты вшиты в каркас и притягиваются к металлической рамке двери. Никакого клея, сверления или скотча — краска не повреждается.' },
    { q: 'Можно ли опускать стёкла?', a: 'Да, стёкла можно опускать — шторки остаются на месте благодаря магнитному креплению. При этом обеспечивается вентиляция без пыли и насекомых.' },
    { q: 'Какой срок изготовления?', a: 'Стандартный срок — 1-3 рабочих дня. Доставка по всей России занимает 3-7 дней в зависимости от региона.' },
    { q: 'Это законно?', a: 'Абсолютно. Каркасные автошторки не являются тонировкой и не подпадают под требования ТР ТС 014/2011. Никаких штрафов и ограничений.' },
  ];

  return (
    <section className="relative py-32 md:py-48 lg:py-64 bg-[#0a0a0a]">
      <div ref={ref} className={`max-w-4xl mx-auto px-6 md:px-12 reveal ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-16 md:mb-24">
          <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-6">FAQ</p>
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-[-0.03em]">Частые вопросы.</h2>
        </div>
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className={`border-b border-white/10 transition-colors duration-300 ${openIndex === i ? 'border-white/20' : ''}`}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full py-7 md:py-8 flex items-center justify-between text-left">
                <span className={`text-lg md:text-xl font-medium transition-colors duration-300 pr-8 ${openIndex === i ? 'text-white' : 'text-white/60'}`}>{faq.q}</span>
                <svg className={`w-5 h-5 text-white/40 transition-transform duration-500 flex-shrink-0 ${openIndex === i ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-48 pb-8' : 'max-h-0'}`}>
                <p className="text-white/40 text-base leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ ORDER FORM ============
function OrderSection() {
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', car: '', year: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', car: '', year: '', phone: '' });
  }, []);

  return (
    <section id="order" className="relative py-32 md:py-48 lg:py-64 bg-black">
      <div ref={ref} className={`max-w-3xl mx-auto px-6 md:px-12 reveal-slow ${isVisible ? 'visible' : ''}`}>
        <div className="text-center mb-12 md:mb-20">
          <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-6">Заказ</p>
          <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.0]">
            Закажите свои<br />шторки.
          </h2>
          <p className="mt-6 text-white/40 text-lg md:text-xl">Оставьте заявку — мы свяжемся в течение 30 минут.</p>
        </div>
        {submitted ? (
          <div className="text-center py-20 px-8 rounded-3xl border border-white/10">
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white text-2xl font-semibold mb-2">Заявка отправлена</h3>
            <p className="text-white/40">Мы свяжемся с вами в ближайшее время</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { key: 'name', placeholder: 'Ваше имя', type: 'text' },
                { key: 'car', placeholder: 'Марка и модель авто', type: 'text' },
                { key: 'year', placeholder: 'Год выпуска', type: 'text' },
                { key: 'phone', placeholder: 'Телефон', type: 'tel' },
              ].map((field) => (
                <input
                  key={field.key}
                  type={field.type}
                  required
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white placeholder-white/20 focus:border-white/30 focus:outline-none transition-colors text-base"
                  placeholder={field.placeholder}
                />
              ))}
            </div>
            <button type="submit" className="btn-primary w-full py-5 rounded-full text-base font-medium mt-4">Отправить заявку</button>
            <p className="text-white/20 text-xs text-center mt-4">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
          </form>
        )}
      </div>
    </section>
  );
}

// ============ FINAL CTA ============
function FinalCTASection() {
  const { ref, isVisible } = useScrollReveal();
  const parallaxRef = useParallax(0.15);

  return (
    <section className="relative h-[100vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0">
        <div className="parallax-img absolute inset-0">
          <img src={P.g1} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div ref={ref} className={`relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center reveal-slow ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-white text-4xl md:text-6xl lg:text-[5.5rem] xl:text-[7rem] font-bold tracking-[-0.03em] leading-[0.95] max-w-5xl mx-auto">
          Ваше следующее<br />поездка может быть<br />другой.
        </h2>
        <p className="mt-8 md:mt-12 text-white/50 text-lg md:text-2xl max-w-xl mx-auto leading-relaxed font-light">
          Один заказ — и каждый день за рулём станет комфортнее.
        </p>
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#order" className="btn-primary px-10 py-4 rounded-full text-sm">Оформить заказ</a>
          <a href="tel:+79134421234" className="btn-secondary px-10 py-4 rounded-full text-sm">+7 (913) 442-12-34</a>
        </div>
      </div>
    </section>
  );
}

// ============ CONTACTS ============
function ContactsSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="contacts" className="relative py-32 md:py-48 lg:py-64 bg-[#0a0a0a]">
      <div ref={ref} className={`max-w-[1600px] mx-auto px-6 md:px-12 reveal ${isVisible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-6">Контакты</p>
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.05] mb-10">
              Свяжитесь с нами.
            </h2>
            <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-14">
              Мы всегда на связи. Поможем подобрать шторки, ответим на вопросы и оформим заказ.
            </p>
            <div className="space-y-10">
              {[
                { label: 'Телефон', value: '+7 (913) 442-12-34', href: 'tel:+79134421234' },
                { label: 'WhatsApp', value: 'Написать', href: 'https://wa.me/79134421234' },
                { label: 'Адрес', value: 'г. Абакан, ул. Ровная 16', href: '#' },
                { label: 'Режим работы', value: 'Пн-Вс: 9:00 — 18:00', href: '#' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-white/25 text-xs tracking-[0.2em] uppercase mb-2">{item.label}</p>
                  <a href={item.href} className="text-white text-xl md:text-2xl font-medium hover:text-white/70 transition-colors">{item.value}</a>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square rounded-3xl overflow-hidden">
              <img src={P.g8} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="text-white font-semibold tracking-tight">VELES</span>
            <span className="text-white/20 text-sm">Каркасные автошторки</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://vk.com/avtoshtorki_abakan" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white text-sm transition-colors">VK</a>
            <a href="tel:+79134421234" className="text-white/30 hover:text-white text-sm transition-colors">+7 (913) 442-12-34</a>
          </div>
          <p className="text-white/15 text-xs">© 2024 VELES. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

// ============ MARQUEE ============
function MarqueeSection() {
  const words = ['КОМФОРТ', '•', 'ЗАЩИТА', '•', 'СТИЛЬ', '•', 'КАЧЕСТВО', '•', 'ПРИВАТНОСТЬ', '•', 'МАГНИТЫ', '•', 'ПРЕМИУМ', '•'];
  return (
    <section className="py-16 md:py-24 bg-black overflow-hidden border-y border-white/5">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <span key={i} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white/[0.04] tracking-[-0.03em] mx-6 md:mx-10 flex-shrink-0">
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}

// ============ PROCESS SECTION ============
function ProcessSection() {
  const { ref, isVisible } = useScrollReveal();
  const parallaxRef = useParallax(0.15);

  return (
    <section className="relative py-32 md:py-48 lg:py-64 bg-black overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center reveal-slow ${isVisible ? 'visible' : ''}`}>
          <div ref={parallaxRef} className="relative aspect-[4/5] overflow-hidden rounded-3xl order-2 lg:order-1">
            <div className="parallax-img absolute inset-0">
              <img src={P.g3} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-white/30 text-sm tracking-[0.2em] uppercase mb-6">Производство</p>
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.0] mb-10">
              Ручная работа.<br />Инженерная точность.
            </h2>
            <div className="space-y-8">
              {[
                { step: '01', title: 'Замеры', desc: 'Точные замеры каждого оконного проёма вашей модели автомобиля' },
                { step: '02', title: 'Каркас', desc: 'Изготовление стального каркаса из проволоки 4 мм — повторяет геометрию стекла' },
                { step: '03', title: 'Сетка', desc: 'Натяжка премиум-сетки с двойной прошивкой армированными нитями' },
                { step: '04', title: 'Магниты', desc: 'Вшивание неодимовых магнитов N35 под резинку — скрытое крепление' },
                { step: '05', title: 'Контроль', desc: 'Финальная проверка посадки на макете. Только потом — отправка клиенту' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 border-b border-white/5 pb-6">
                  <span className="text-white/10 text-3xl font-bold flex-shrink-0 w-12">{item.step}</span>
                  <div>
                    <h4 className="text-white text-lg font-semibold mb-1">{item.title}</h4>
                    <p className="text-white/40 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ BIG STATEMENT ============
function BigStatement() {
  const { ref, isVisible } = useScrollReveal();
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    if (!lineRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLineVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(lineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-32 md:py-48 lg:py-64 bg-[#0a0a0a] overflow-hidden">
      <div ref={ref} className={`max-w-[1600px] mx-auto px-6 md:px-12 text-center reveal-slow ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-white text-4xl md:text-6xl lg:text-[5rem] xl:text-[7rem] font-bold tracking-[-0.04em] leading-[0.95] max-w-5xl mx-auto">
          Не компромисс.<br />
          <span className="text-white/20">А правильное решение.</span>
        </h2>
        <div ref={lineRef} className={`mt-12 md:mt-16 line-draw mx-auto max-w-xs ${lineVisible ? 'visible' : ''}`} />
      </div>
    </section>
  );
}

// ============ MAIN APP ============
export default function App() {
  return (
    <div className="relative">
      <ScrollProgress />
      <Navigation />
      <HeroSection />
      <ManifestoSection />
      <MarqueeSection />
      <ProductIntro />
      <StickyStorySection />
      <BigStatement />
      <ProtectionSection />
      <ProcessSection />
      <HorizontalGallery />
      <StatsSection />
      <InstallationSection />
      <ComparisonSection />
      <ForWhoSection />
      <ReviewsSection />
      <FAQSection />
      <OrderSection />
      <FinalCTASection />
      <ContactsSection />
      <Footer />
    </div>
  );
}
