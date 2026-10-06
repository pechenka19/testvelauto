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
        <a href="#order" className="hidden md:block bg-white text-black px-5 py-2 rounded-full text-[13px] font-medium hover:bg-gray-200 transition-colors">Заказать</a>
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
    <section id="hero" className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      <img src={IMG.hero} alt="Каркасные автошторки VELES" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="relative z-10 text-center px-5 md:px-10 max-w-4xl">
        <p className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-6">Каркасные автошторки</p>
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05] mb-6">
          VELES
        </h1>
        <p className="text-white/70 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          Премиальные шторки на магнитном креплении. Защита от солнца, пыли и насекомых. Установка за 5 секунд.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#order" className="bg-white text-black px-8 py-3.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Заказать шторки</a>
          <a href="#product" className="border border-white/30 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/5 transition-colors">Подробнее</a>
        </div>
      </div>
    </section>
  );
}

// ============ WHAT IS IT ============
function WhatIsIt() {
  const { ref, visible } = useReveal();
  return (
    <section id="product" className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Что это</p>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.1] mb-6">
              Каркасные автошторки на магнитах
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-4">
              Жёсткий стальной каркас с натянутой премиум-сеткой. Крепится к оконному проёму автомобиля на неодимовых магнитах.
            </p>
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              Не тонировка. Не плёнка. Съёмный аксессуар, который устанавливается за 5 секунд без инструментов.
            </p>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img src={IMG.installed} alt="Автошторка VELES установлена на авто" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ HOW IT WORKS ============
function HowItWorks() {
  const { ref, visible } = useReveal();
  return (
    <section id="tech" className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4 text-center">Как это работает</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] text-center mb-16 md:mb-20">
          Три шага до комфорта
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { n: '01', t: 'Магниты', d: 'Неодимовые магниты вшиты в каркас. Притягиваются к металлической рамке двери.', img: IMG.mesh },
            { n: '02', t: 'Установка', d: 'Поднесите шторку к проёму. Магниты сами зафиксируют её за 5 секунд.', img: IMG.product },
            { n: '03', t: 'Результат', d: 'Защита от солнца, пыли и насекомых. Отличный обзор изнутри.', img: IMG.installed },
          ].map((x, i) => (
            <div key={i}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img src={x.img} alt={x.t} className="w-full h-full object-cover" />
              </div>
              <span className="text-white/10 text-5xl font-bold">{x.n}</span>
              <h3 className="text-white text-xl md:text-2xl font-semibold mt-3 mb-2">{x.t}</h3>
              <p className="text-white/50 text-sm md:text-base leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ INTERACTIVE PRODUCT ============
function InteractiveProduct() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { img: IMG.hero, title: 'Общий вид', desc: 'Каркасная шторка VELES на автомобильном окне' },
    { img: IMG.mesh, title: 'Премиум-сетка', desc: 'Мелкоячеистая структура для отличного обзора' },
    { img: IMG.installed, title: 'Установка', desc: 'Магнитное крепление за 5 секунд' },
    { img: IMG.texture, title: 'Детали', desc: 'Натуральная кожа и стальной каркас' },
  ];

  return (
    <section className="bg-black py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Интерактивный просмотр</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-8 md:mb-12">
          Изучите продукт
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="aspect-square rounded-2xl overflow-hidden relative">
            {slides.map((s, i) => (
              <img
                key={i}
                src={s.img}
                alt={s.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === activeSlide ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
          <div>
            <div className="space-y-4">
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all ${
                    i === activeSlide
                      ? 'bg-white/[0.06] border-white/[0.15]'
                      : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]'
                  }`}
                >
                  <h3 className={`text-lg font-semibold mb-1 transition-colors ${i === activeSlide ? 'text-white' : 'text-white/60'}`}>
                    {s.title}
                  </h3>
                  <p className={`text-sm transition-colors ${i === activeSlide ? 'text-white/60' : 'text-white/30'}`}>
                    {s.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FOR YOUR CAR ============
function ForYourCar() {
  const { ref, visible } = useReveal();
  const cars = [
    { name: 'Toyota Camry', img: IMG.g1 },
    { name: 'Kia Sportage', img: IMG.g2 },
    { name: 'Hyundai Tucson', img: IMG.g3 },
    { name: 'Mazda CX-5', img: IMG.g4 },
    { name: 'Nissan X-Trail', img: IMG.g5 },
    { name: 'Volkswagen Tiguan', img: IMG.g6 },
  ];

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Для вашего авто</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-6 md:mb-8">
          Более 500 моделей
        </h2>
        <p className="text-white/60 text-base md:text-lg max-w-2xl mb-12 md:mb-16">
          Изготавливаем шторки индивидуально под каждую модель автомобиля. Вот несколько примеров:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {cars.map((car, i) => (
            <div key={i} className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-white text-sm md:text-base font-medium">{car.name}</h3>
            </div>
          ))}
        </div>
        <div className="mt-10 md:mt-12 text-center">
          <p className="text-white/40 text-sm md:text-base">
            Нет вашей модели? <a href="#order" className="text-white hover:text-white/80 transition-colors underline">Закажите</a> — изготовим под любой автомобиль
          </p>
        </div>
      </div>
    </section>
  );
}

// ============ INSTALLATION STEPS ============
function InstallationSteps() {
  const [step, setStep] = useState(0);
  const steps = [
    { img: IMG.product, title: 'Возьмите шторку', desc: 'Лёгкая конструкция весом всего 500 грамм' },
    { img: IMG.installed, title: 'Приложите к окну', desc: 'Магниты автоматически выровняются с рамкой' },
    { img: IMG.mesh, title: 'Зафиксируйте', desc: 'Неодимовые магниты надёжно притянутся за 1 секунду' },
    { img: IMG.hero, title: 'Готово', desc: 'Шторка установлена. Наслаждайтесь комфортом' },
  ];

  return (
    <section className="bg-black py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Установка</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-8 md:mb-12">
          4 простых шага
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="aspect-square rounded-2xl overflow-hidden relative">
            {steps.map((s, i) => (
              <img
                key={i}
                src={s.img}
                alt={s.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === step ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
          <div>
            <div className="space-y-3">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    i === step
                      ? 'bg-white/[0.06] border-white/[0.15]'
                      : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`text-2xl font-bold transition-colors ${i === step ? 'text-white' : 'text-white/20'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className={`text-base md:text-lg font-semibold mb-1 transition-colors ${i === step ? 'text-white' : 'text-white/60'}`}>
                        {s.title}
                      </h3>
                      <p className={`text-sm transition-colors ${i === step ? 'text-white/60' : 'text-white/30'}`}>
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <p className="text-white/50 text-sm">
                <span className="text-white font-medium">Общее время:</span> 5 секунд. Без инструментов.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ MATERIALS ============
function Materials() {
  const { ref, visible } = useReveal();
  return (
    <section className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Материалы</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-12 md:mb-16">
          Премиум в каждой детали
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {[
            { t: 'Стальной каркас', d: 'Проволока 4 мм. Держит форму, не провисает. Служит годами.', img: IMG.product },
            { t: 'Премиум-сетка', d: 'Мелкоячеистая структура. Отличный обзор изнутри, полная приватность снаружи.', img: IMG.mesh },
            { t: 'Неодимовые магниты', d: 'N35. Сверхсильное сцепление. Не повреждают краску автомобиля.', img: IMG.installed },
            { t: 'Натуральная кожа', d: 'Хлястики из кожи с логотипом VELES. Тактильно приятно, не выцветает.', img: IMG.texture },
          ].map((x, i) => (
            <div key={i} className="group">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                <img src={x.img} alt={x.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">{x.t}</h3>
              <p className="text-white/50 text-sm md:text-base leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ BENEFITS ============
function Benefits() {
  const { ref, visible } = useReveal();
  const staggerRef = useRef<HTMLDivElement>(null);
  const [sv, setSv] = useState(false);
  useEffect(() => {
    if (!staggerRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSv(true); }, { threshold: 0.1 });
    obs.observe(staggerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Преимущества</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-12 md:mb-16">
          Что вы получаете
        </h2>
        <div ref={staggerRef} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children ${sv ? 'visible' : ''}`}>
          {[
            { n: '01', t: 'Защита от солнца', d: 'Светопропускаемость 10%. Салон не нагревается.' },
            { n: '02', t: 'Насекомые', d: 'Мелкоячеистая сетка не пропускает мошек и комаров.' },
            { n: '03', t: 'Приватность', d: 'Изнутри обзор, снаружи — ничего не видно.' },
            { n: '04', t: 'Пыль', d: 'Салон остаётся чистым. Панель не выгорает.' },
          ].map((x, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.15] transition-all">
              <span className="text-white/10 text-xs font-medium">{x.n}</span>
              <h4 className="text-white text-lg font-semibold mt-4 mb-2">{x.t}</h4>
              <p className="text-white/40 text-sm leading-relaxed">{x.d}</p>
            </div>
          ))}
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
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">Галерея</p>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em]">Реальные установки</h2>
          </div>
          <a href="https://vk.com/avtoshtorki_abakan" target="_blank" rel="noopener noreferrer" className="hidden md:block text-white/30 hover:text-white text-sm transition-colors">
            Больше фото в VK →
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {images.map((src, i) => (
            <div key={i} className={`aspect-square rounded-lg md:rounded-2xl overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img src={src} alt="Автошторки VELES установлены" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
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

  return (
    <section id="reviews" className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Отзывы</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-10 md:mb-16">Что говорят клиенты</h2>
        <div ref={staggerRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children ${sv ? 'visible' : ''}`}>
          {[
            { t: 'Заказал шторки на Камри — качество космос. Установил за 5 минут, магниты держат мёртво.', n: 'Алексей К.', c: 'Toyota Camry' },
            { t: 'Ребёнок наконец-то спит в машине днём! Шторки блокируют солнце, обзор отличный.', n: 'Мария С.', c: 'Kia Sportage' },
            { t: 'Лучше любой тонировки. Законно, удобно. Снял за 10 секунд — никаких проблем.', n: 'Дмитрий В.', c: 'Hyundai Tucson' },
            { t: 'Качество материалов на высоте. Кожаные хлястики, ровные швы, магниты мощные.', n: 'Ольга П.', c: 'Volkswagen Tiguan' },
            { t: 'Второй раз заказываю. Пыль перестала лететь в салон, насекомые не пробираются.', n: 'Сергей М.', c: 'Mazda CX-5' },
            { t: 'Салон не выгорает, кондиционер работает эффективнее. Рекомендую.', n: 'Анна Л.', c: 'Nissan X-Trail' },
          ].map((r, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl">
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
  return (
    <section className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-3xl mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4 text-center">FAQ</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] text-center mb-12 md:mb-16">Частые вопросы</h2>
        <div className="space-y-0">
          {[
            { q: 'Подойдут ли шторки на мой автомобиль?', a: 'Мы изготавливаем шторки индивидуально под каждую модель. Более 500 моделей в базе.' },
            { q: 'Не ухудшится ли обзор?', a: 'Мелкоячеистая сетка обеспечивает отличную прозрачность изнутри. Снаружи салон скрыт.' },
            { q: 'Как крепятся шторки?', a: 'Неодимовые магниты вшиты в каркас. Никакого клея или скотча — краска не повреждается.' },
            { q: 'Можно ли опускать стёкла?', a: 'Да, шторки остаются на месте. Обеспечивается вентиляция без пыли и насекомых.' },
            { q: 'Какой срок изготовления?', a: '1-3 рабочих дня. Доставка по России 3-7 дней.' },
            { q: 'Это законно?', a: 'Да. Каркасные шторки не являются тонировкой. Никаких штрафов.' },
          ].map((f, i) => (
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
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Заказ</p>
          <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em]">Закажите шторки VELES</h2>
          <p className="mt-4 text-white/40 text-sm md:text-base">Свяжемся в течение 30 минут для подбора под ваш автомобиль</p>
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
                { k: 'car', p: 'Марка и модель авто', t: 'text' },
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
            <button type="submit" className="w-full bg-white text-black py-3.5 rounded-full text-sm font-medium mt-2 hover:bg-gray-200 transition-colors">Отправить заявку</button>
          </form>
        )}
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
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Контакты</p>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-8">Свяжитесь с нами</h2>
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
            <img src={IMG.g6} alt="VELES контакты" className="w-full h-full object-cover" />
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
      <WhatIsIt />
      <InteractiveProduct />
      <InstallationSteps />
      <HowItWorks />
      <Materials />
      <ForYourCar />
      <Benefits />
      <Gallery />
      <Reviews />
      <FAQ />
      <Order />
      <Contacts />
      <Footer />
    </div>
  );
}
