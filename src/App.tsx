import { useEffect, useRef, useState, useCallback } from 'react';

// ============ HOOKS ============
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
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

function useWordReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll('.word');
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const wh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (wh * 0.7 - r.top) / (wh * 0.5)));
      const n = Math.floor(p * words.length);
      words.forEach((w, i) => w.classList.toggle('active', i < n));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return ref;
}

// ============ IMAGES ============
const IMG = {
  // AI-generated cinematic images
  interior: 'https://image.qwenlm.ai/generated-images/d0e0b6e4-c499-44be-abc5-64bb90d440c0/_result.png',
  mesh: 'https://image.qwenlm.ai/generated-images/3d2aa903-eae8-429f-9a47-9e62a1945c89/_result.png',
  road: 'https://image.qwenlm.ai/generated-images/2cb7f130-60dd-49af-9071-0ac69e7bc247/_result.png',
  product: 'https://image.qwenlm.ai/generated-images/c75109ad-4c99-461e-a19b-783babc61d80/_result.png',
  family: 'https://image.qwenlm.ai/generated-images/8c7c6ed3-a831-42a2-a162-f005e3e4151a/_result.png',
  texture: 'https://image.qwenlm.ai/generated-images/bea8753d-292b-48d5-a58f-b0be8e370dd2/_result.png',
  showroom: 'https://image.qwenlm.ai/generated-images/db83c049-01b8-4739-bb50-595c7812c193/_result.png',
  // Real VK photos
  g1: 'https://sun9-7.vkuserphoto.ru/s/v1/ig2/eispSnwz9X2hrEO3Pbdqn_Lj1gRSMOLXQm6opejaSun3IXeK0grWUgfckGEsfniYsJA59BFxn9Yw7deQ5WrXL1ZA.jpg?quality=95&as=32x16,48x24,72x36,108x55,160x81,240x122,360x183,480x243,540x274,640x324,720x365,1080x548,1280x649,1440x730,2560x1298&from=bu&u=abw07EHPYE9OcjffAY1JjvMHdN9TZUq-ZTNlo4550-E&cs=2560x0',
  g2: 'https://sun9-70.vkuserphoto.ru/s/v1/ig2/NAOdZchuN80mZQJ58HqHteSqfv4BMoMKkaDwWTb3b4zEoseNtZ8vDxEnkra4qfaLsqa5h5Sib5VsdR0VEpb4kCjB.jpg?quality=95&as=32x14,48x22,72x32,108x49,160x72,240x108,360x162,480x216,540x243,640x288,720x324,1080x486,1280x576,1440x648,2560x1152&from=bu&u=cxMX70Bym5-VTuqISqk7KIUpAFq0BR3UIYoiwCL4o_I&cs=2560x0',
  g3: 'https://sun9-65.vkuserphoto.ru/s/v1/ig2/rdaWAna1J2iGcLmUtOhnwo4d4G5y-UnfQQF9a89T_OhGLWzstD312N8xkPsLUb5fcfyIsBv296ozMWRoYHF-xyJE.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&u=n32Y1_-jZQshbq-GvSEMCM76QghSD6BmuLH2GknIy3M&cs=2560x0',
  g4: 'https://sun9-54.vkuserphoto.ru/s/v1/ig2/KK44fuf5HhFQN9wkgZ4Msem2OeOIsFOd79FESZ6D0Q_gK_LjdJmxng0aH7epqicFAhMUx-fNxPHN4gYYWk3SPqwa.jpg?quality=95&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x360,540x304,640x360,720x405,1080x607,1280x720,1440x810,2560x1440&from=bu&u=4RjyCr0zEoOEzUmqHeIRn5B_k9kiWLuzV3syZ0Q3w1c&cs=2560x0',
  g5: 'https://sun9-17.vkuserphoto.ru/s/v1/ig2/NGbjY5kEA4Yxg4k6m-cFWaX1y3SCvw5jCk8renHr5eNpQfOG9qnTQ2NdumkPca-mYmdU25s6Ssc0Hcju8qQDUagn.jpg?quality=95&crop=0,0,1707,2560&from=bu&u=1WfV4OVllsShwmNVnCt3DUBxzjMSGTiDiTHA9ibFrF4&cs=1707x0',
  g6: 'https://sun9-34.vkuserphoto.ru/s/v1/ig2/K8Gwoe4egTnBf3TQ7qGMG20jsWiuX5X2zySdLARIv_drZk-yCpl4Ul7kxOv5Cjn9P3vAGsUKf99uVtHdGOHX4AYg.jpg?quality=95&as=32x45,48x68,72x102,108x153,160x226,240x339,360x509,480x679,540x764,640x905,720x1018,1080x1527,1191x1684&from=bu&u=ozG8KPGAX22-DaXhgozmmbEamFGwgLIodhlaWJzsTnA&cs=1191x0',
};

// ============ NAV ============
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-black/90 backdrop-blur-2xl' : 'py-5 bg-transparent'}`}>
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 flex items-center justify-between">
        <a href="#hero" className="text-xl font-semibold tracking-tight">VELES</a>
        <div className="hidden md:flex items-center gap-8">
          {[['Продукт', '#product'], ['Технологии', '#tech'], ['Галерея', '#gallery'], ['Отзывы', '#reviews']].map(([l, h]) => (
            <a key={h} href={h} className="text-[13px] text-white/70 hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <a href="#order" className="hidden md:block btn-primary px-5 py-2 rounded-full text-[13px]">Заказать</a>
        <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5" aria-label="Меню">
          <span className={`w-5 h-[1.5px] bg-white transition-all ${open ? 'rotate-45 translate-y-[4px]' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-white transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-[1.5px] bg-white transition-all ${open ? '-rotate-45 -translate-y-[4px]' : ''}`} />
        </button>
      </div>
      <div className={`md:hidden fixed inset-0 bg-black z-40 transition-all duration-500 ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {[['Продукт', '#product'], ['Технологии', '#tech'], ['Галерея', '#gallery'], ['Отзывы', '#reviews'], ['Заказать', '#order']].map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="text-2xl text-white/80">{l}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ============ HERO ============
function Hero() {
  return (
    <section id="hero" className="relative h-[100svh] min-h-[600px] flex items-end overflow-hidden">
      <img src={IMG.road} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overlay-gradient" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10 pb-20 md:pb-32 w-full">
        <p className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-5 animate-fade-in-up delay-300">Каркасные автошторки</p>
        <h1 className="text-white text-[clamp(3rem,9vw,8rem)] font-bold tracking-[-0.04em] leading-[0.9] animate-fade-in-up delay-500">
          Комфорт.<br />Без компромиссов.
        </h1>
        <p className="mt-6 md:mt-8 text-white/60 text-base md:text-xl max-w-lg leading-relaxed font-light animate-fade-in-up delay-700">
          Защита от солнца, пыли и насекомых. Магнитное крепление. Установка за 5 секунд.
        </p>
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-1000">
          <a href="#order" className="btn-primary px-8 py-3.5 rounded-full text-sm text-center">Заказать</a>
          <a href="#product" className="btn-secondary px-8 py-3.5 rounded-full text-sm text-center">Подробнее</a>
        </div>
      </div>
    </section>
  );
}

// ============ MANIFESTO ============
function Manifesto() {
  const ref = useWordReveal();
  const text = "Каждый день за рулём — это борьба. Солнце слепит. Салон раскаляется. Насекомые летят в лицо. Дети капризничают. Мы решили это изменить. VELES — это новый стандарт комфорта в автомобиле. Создано для тех, кто понимает: дорога должна приносить удовольствие, а не стресс.";
  const words = text.split(' ');
  return (
    <section className="relative min-h-[100svh] flex items-center bg-black py-20 md:py-32">
      <div ref={ref} className="max-w-[1200px] mx-auto px-5 md:px-10 word-reveal">
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-8">Философия</p>
        <p className="text-white text-2xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.15]">
          {words.map((w, i) => <span key={i} className="word">{w}</span>)}
        </p>
      </div>
    </section>
  );
}

// ============ FULL-WIDTH CINEMATIC ============
function Cinematic({ src, children }: { src: string; children?: React.ReactNode }) {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="relative h-[80vh] md:h-[100svh] overflow-hidden">
      <img src={src} alt="" className={`w-full h-full object-cover transition-transform duration-[2s] ${visible ? 'scale-100' : 'scale-110'}`} />
      <div className="absolute inset-0 overlay-gradient" />
      {children && <div className="absolute inset-0 flex items-end">{children}</div>}
    </section>
  );
}

// ============ PRODUCT STICKY ============
function Product() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const slides = [
    { img: IMG.interior, title: 'Идеальная посадка', text: 'Каждая шторка создаётся под вашу модель автомобиля — с точностью до миллиметра.' },
    { img: IMG.mesh, title: 'Премиум-сетка', text: 'Мелкоячеистая структура. Отличный обзор изнутри. Полная приватность снаружи.' },
    { img: IMG.texture, title: 'Натуральная кожа', text: 'Хлястики из кожи с логотипом VELES. Тактильно приятно. Не выцветает.' },
    { img: IMG.product, title: 'Стальной каркас', text: 'Проволока 4 мм. Армированные нити. Двойная строчка. Качество на годы.' },
  ];

  if (isMobile) {
    return (
      <section id="product" className="bg-black py-20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4">Продукт</p>
          <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.03em] mb-12">Совершенство в деталях.</h2>
          <div className="space-y-12">
            {slides.map((s, i) => (
              <div key={i}>
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-2">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return <StickyProduct slides={slides} />;
}

function StickyProduct({ slides }: { slides: { img: string; title: string; text: string }[] }) {
  const [idx, setIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      const h = wrapRef.current.offsetHeight;
      const wh = window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / (h - wh)));
      setIdx(Math.min(slides.length - 1, Math.floor(p * slides.length)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slides.length]);

  return (
    <section id="product" ref={wrapRef} style={{ height: `${slides.length * 100}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {slides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <img src={s.img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
          </div>
        ))}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 w-full">
            <div className="max-w-xl">
              <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Продукт — {String(idx + 1).padStart(2, '0')}</p>
              <h3 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.95] mb-5">
                {slides[idx].title}
              </h3>
              <p className="text-white/60 text-base md:text-xl leading-relaxed">{slides[idx].text}</p>
            </div>
          </div>
        </div>
        <div className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {slides.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white scale-125' : 'bg-white/20'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ STATS ============
function Stats() {
  const { ref, visible } = useReveal();
  const c1 = useCountUp(2000, visible);
  const c2 = useCountUp(500, visible);
  const c3 = useCountUp(150, visible);

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {[
            { v: c1, s: '+', l: 'Довольных клиентов' },
            { v: c2, s: '+', l: 'Моделей автомобилей' },
            { v: c3, s: '+', l: 'Городов доставки' },
          ].map((x, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-white counter tracking-[-0.04em] leading-none">
                {x.v}{x.s}
              </div>
              <p className="text-white/25 text-xs md:text-sm mt-4 tracking-wide">{x.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FEATURES ============
function Features() {
  const { ref, visible } = useReveal();
  const staggerRef = useRef<HTMLDivElement>(null);
  const [sv, setSv] = useState(false);
  useEffect(() => {
    if (!staggerRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSv(true); }, { threshold: 0.1 });
    obs.observe(staggerRef.current);
    return () => obs.disconnect();
  }, []);

  const items = [
    { n: '01', t: 'Солнце', d: 'Светопропускаемость 10%. Салон не нагревается. Экономия на кондиционере.' },
    { n: '02', t: 'Насекомые', d: 'Мелкоячеистая сетка не пропускает мошек и комаров. Окна можно держать открытыми.' },
    { n: '03', t: 'Приватность', d: 'Эффект тонировки без тонировки. Изнутри обзор, снаружи — ничего не видно.' },
    { n: '04', t: 'Пыль', d: 'Салон остаётся чистым. Панель не выгорает. Меньше уборки.' },
  ];

  return (
    <section className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4">Защита</p>
        <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.05] mb-12 md:mb-20 max-w-3xl">
          Всё, от чего вы устали — больше не проблема.
        </h2>
        <div ref={staggerRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children ${sv ? 'visible' : ''}`}>
          {items.map((x, i) => (
            <div key={i} className="feature-card p-6 md:p-8 rounded-2xl">
              <span className="text-white/10 text-xs font-medium">{x.n}</span>
              <h4 className="text-white text-lg md:text-xl font-semibold mt-4 mb-3">{x.t}</h4>
              <p className="text-white/40 text-sm leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ INSTALLATION ============
function Installation() {
  const { ref, visible } = useReveal();
  return (
    <Cinematic src={IMG.showroom}>
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 pb-20 md:pb-32 w-full reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Установка</p>
        <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] mb-8">
          Пять секунд.<br />Без инструментов.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-w-3xl">
          {[
            { s: '01', t: 'Приложите', d: 'Поднесите шторку к оконному проёму' },
            { s: '02', t: 'Магниты сработают', d: 'Неодимовые магниты притянутся к рамке' },
            { s: '03', t: 'Готово', d: 'Шторка зафиксирована. Наслаждайтесь' },
          ].map((x, i) => (
            <div key={i}>
              <span className="text-white/10 text-3xl md:text-5xl font-bold">{x.s}</span>
              <h4 className="text-white text-lg font-semibold mt-2 mb-1">{x.t}</h4>
              <p className="text-white/40 text-sm">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Cinematic>
  );
}

// ============ COMPARISON ============
function Comparison() {
  const { ref, visible } = useReveal();
  return (
    <section className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4 text-center">Сравнение</p>
        <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-center mb-12 md:mb-20">
          VELES vs Тонировка
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
          <div className="p-6 md:p-10 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-white/25 text-lg md:text-xl font-semibold mb-6">Тонировка</h3>
            <ul className="space-y-3">
              {['Штрафы ГИБДД', 'Нельзя снять на месте', 'Повреждает стекло', 'Ухудшает обзор ночью', 'Одноразовое решение'].map((x, i) => (
                <li key={i} className="flex items-start gap-3 text-white/20 text-sm">
                  <span className="mt-1.5 w-3 h-3 rounded-full border border-white/10 flex-shrink-0 flex items-center justify-center">
                    <span className="w-1.5 h-[1px] bg-white/20" />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 md:p-10 rounded-2xl border border-white/25 bg-white/[0.04]">
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-white text-lg md:text-xl font-semibold">VELES</h3>
              <span className="text-[9px] text-white/50 border border-white/20 rounded-full px-2 py-0.5 uppercase">Рекомендуем</span>
            </div>
            <ul className="space-y-3">
              {['Полностью законно', 'Снимается за 10 секунд', 'Не повреждает авто', 'Отличный обзор всегда', 'Многоразовое'].map((x, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                  <span className="mt-1.5 w-3 h-3 rounded-full border border-white/40 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ GALLERY ============
function Gallery() {
  const { ref, visible } = useReveal();
  const images = [IMG.g1, IMG.g2, IMG.g3, IMG.g4, IMG.g5, IMG.g6];
  return (
    <section id="gallery" className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-3">Галерея</p>
            <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em]">Реальные установки.</h2>
          </div>
          <a href="https://vk.com/avtoshtorki_abakan" target="_blank" rel="noopener noreferrer" className="hidden md:block text-white/30 hover:text-white text-sm transition-colors">
            VK →
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {images.map((src, i) => (
            <div key={i} className={`aspect-square rounded-lg md:rounded-2xl overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ LIFESTYLE ============
function Lifestyle() {
  const { ref, visible } = useReveal();
  return (
    <Cinematic src={IMG.family}>
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 pb-20 md:pb-32 w-full reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Для кого</p>
        <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] max-w-2xl">
          Для тех, кто проводит в машине жизнь.
        </h2>
        <p className="mt-6 text-white/50 text-base md:text-xl max-w-lg leading-relaxed">
          Таксисты и дальнобойщики. Родители с детьми. Путешественники. Все, кто понимает: комфорт в дороге — это не роскошь, а необходимость.
        </p>
      </div>
    </Cinematic>
  );
}

// ============ REVIEWS ============
function Reviews() {
  const { ref, visible } = useReveal();
  const staggerRef = useRef<HTMLDivElement>(null);
  const [sv, setSv] = useState(false);
  useEffect(() => {
    if (!staggerRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSv(true); }, { threshold: 0.1 });
    obs.observe(staggerRef.current);
    return () => obs.disconnect();
  }, []);

  const reviews = [
    { t: 'Заказал шторки на Камри — качество космос. Установил за 5 минут, магниты держат мёртво.', n: 'Алексей К.', c: 'Toyota Camry' },
    { t: 'Ребёнок наконец-то спит в машине днём! Шторки блокируют солнце, обзор отличный.', n: 'Мария С.', c: 'Kia Sportage' },
    { t: 'Лучше любой тонировки. Законно, удобно. Снял за 10 секунд — никаких проблем.', n: 'Дмитрий В.', c: 'Hyundai Tucson' },
    { t: 'Качество материалов на высоте. Кожаные хлястики, ровные швы, магниты мощные.', n: 'Ольга П.', c: 'Volkswagen Tiguan' },
    { t: 'Второй раз заказываю. Пыль перестала лететь в салон, насекомые не пробираются.', n: 'Сергей М.', c: 'Mazda CX-5' },
    { t: 'Салон не выгорает, кондиционер работает эффективнее. Рекомендую.', n: 'Анна Л.', c: 'Nissan X-Trail' },
  ];

  return (
    <section id="reviews" className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4">Отзывы</p>
        <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-10 md:mb-16">Что говорят клиенты.</h2>
        <div ref={staggerRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children ${sv ? 'visible' : ''}`}>
          {reviews.map((r, i) => (
            <div key={i} className="feature-card p-6 md:p-8 rounded-2xl">
              <p className="text-white/70 text-sm leading-relaxed mb-6">"{r.t}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white/60 text-xs font-medium">{r.n[0]}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{r.n}</p>
                  <p className="text-white/30 text-xs">{r.c}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FAQ ============
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, visible } = useReveal();
  const faqs = [
    { q: 'Подойдут ли шторки на мой автомобиль?', a: 'Мы изготавливаем шторки индивидуально под каждую модель. Более 500 моделей в базе.' },
    { q: 'Не ухудшится ли обзор?', a: 'Мелкоячеистая сетка обеспечивает отличную прозрачность изнутри. Снаружи салон скрыт.' },
    { q: 'Как крепятся шторки?', a: 'Неодимовые магниты вшиты в каркас. Никакого клея или скотча — краска не повреждается.' },
    { q: 'Можно ли опускать стёкла?', a: 'Да, шторки остаются на месте. Обеспечивается вентиляция без пыли и насекомых.' },
    { q: 'Какой срок изготовления?', a: '1-3 рабочих дня. Доставка по России 3-7 дней.' },
    { q: 'Это законно?', a: 'Да. Каркасные шторки не являются тонировкой. Никаких штрафов.' },
  ];

  return (
    <section className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-3xl mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4 text-center">FAQ</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.03em] text-center mb-12 md:mb-16">Частые вопросы.</h2>
        <div className="space-y-0">
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-white/10">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className={`text-sm md:text-base font-medium transition-colors ${open === i ? 'text-white' : 'text-white/60'}`}>{f.q}</span>
                <svg className={`w-4 h-4 text-white/40 transition-transform flex-shrink-0 ${open === i ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-32 pb-5' : 'max-h-0'}`}>
                <p className="text-white/40 text-sm leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ ORDER ============
function Order() {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({ name: '', car: '', year: '', phone: '' });
  const [done, setDone] = useState(false);
  const submit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => setDone(false), 5000);
    setForm({ name: '', car: '', year: '', phone: '' });
  }, []);

  return (
    <section id="order" className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-2xl mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="text-center mb-10">
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4">Заказ</p>
          <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em]">Закажите шторки.</h2>
          <p className="mt-4 text-white/40 text-sm md:text-base">Свяжемся в течение 30 минут.</p>
        </div>
        {done ? (
          <div className="text-center py-16 rounded-2xl border border-white/10">
            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-semibold mb-1">Заявка отправлена</h3>
            <p className="text-white/40 text-sm">Мы свяжемся с вами</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { k: 'name', p: 'Ваше имя', t: 'text' },
                { k: 'car', p: 'Марка и модель', t: 'text' },
                { k: 'year', p: 'Год выпуска', t: 'text' },
                { k: 'phone', p: 'Телефон', t: 'tel' },
              ].map(f => (
                <input
                  key={f.k} type={f.t} required
                  value={form[f.k as keyof typeof form]}
                  onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-white/30 focus:outline-none text-sm"
                  placeholder={f.p}
                />
              ))}
            </div>
            <button type="submit" className="btn-primary w-full py-3.5 rounded-full text-sm font-medium mt-2">Отправить заявку</button>
          </form>
        )}
      </div>
    </section>
  );
}

// ============ FINAL CTA ============
function FinalCTA() {
  const { ref, visible } = useReveal();
  return (
    <section className="relative h-[80vh] md:h-[100svh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <img src={IMG.road} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overlay-center" />
      <div ref={ref} className={`relative z-10 max-w-[1200px] mx-auto px-5 md:px-10 text-center reveal-scale ${visible ? 'visible' : ''}`}>
        <h2 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.9]">
          Ваша следующая<br />поездка может быть<br />другой.
        </h2>
        <p className="mt-8 md:mt-12 text-white/50 text-base md:text-xl max-w-lg mx-auto leading-relaxed font-light">
          Один заказ — и каждый день за рулём станет комфортнее.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#order" className="btn-primary px-10 py-4 rounded-full text-sm">Оформить заказ</a>
          <a href="tel:+79134421234" className="btn-secondary px-10 py-4 rounded-full text-sm">+7 (913) 442-12-34</a>
        </div>
      </div>
    </section>
  );
}

// ============ CONTACTS ============
function Contacts() {
  const { ref, visible } = useReveal();
  return (
    <section id="contacts" className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4">Контакты</p>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.03em] mb-8">Свяжитесь с нами.</h2>
            <div className="space-y-6">
              {[
                { l: 'Телефон', v: '+7 (913) 442-12-34', h: 'tel:+79134421234' },
                { l: 'WhatsApp', v: 'Написать', h: 'https://wa.me/79134421234' },
                { l: 'Адрес', v: 'г. Абакан, ул. Ровная 16', h: '#' },
                { l: 'Режим', v: 'Пн-Вс: 9:00 — 18:00', h: '#' },
              ].map((x, i) => (
                <div key={i}>
                  <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-1">{x.l}</p>
                  <a href={x.h} className="text-white text-lg md:text-xl font-medium hover:text-white/70 transition-colors">{x.v}</a>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img src={IMG.g6} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-white font-semibold text-sm">VELES</span>
          <span className="text-white/20 text-xs">Каркасные автошторки</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://vk.com/avtoshtorki_abakan" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white text-xs transition-colors">VK</a>
          <a href="tel:+79134421234" className="text-white/30 hover:text-white text-xs transition-colors">+7 (913) 442-12-34</a>
        </div>
        <p className="text-white/15 text-[10px]">© 2024 VELES</p>
      </div>
    </footer>
  );
}

// ============ APP ============
export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Nav />
      <Hero />
      <Manifesto />
      <Product />
      <Stats />
      <Features />
      <Installation />
      <Comparison />
      <Gallery />
      <Lifestyle />
      <Reviews />
      <FAQ />
      <Order />
      <FinalCTA />
      <Contacts />
      <Footer />
    </div>
  );
}
