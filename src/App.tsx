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
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/70 text-xs md:text-sm text-center md:text-left">
          Мы используем cookies для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с <a href="#" className="underline hover:text-white">политикой конфиденциальности</a>.
        </p>
        <button onClick={accept} className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap">
          Принять
        </button>
      </div>
    </div>
  );
}

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
        <a href="#hero" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">VELES</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {[['Продукт', '#product'], ['Технологии', '#tech'], ['Каталог', '#catalog'], ['Отзывы', '#reviews']].map(([l, h]) => (
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
          {[['Продукт', '#product'], ['Технологии', '#tech'], ['Каталог', '#catalog'], ['Отзывы', '#reviews'], ['Заказать', '#order']].map(([l, h]) => (
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
        <p className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-6">Каркасные автошторки премиум-класса</p>
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05] mb-6">
          VELES
        </h1>
        <p className="text-white/70 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          Премиальные шторки на магнитном креплении. Защита от солнца, пыли и насекомых. Установка за 5 секунд. Производство в Абакане.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#order" className="bg-white text-black px-8 py-3.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Заказать шторки</a>
          <a href="#catalog" className="border border-white/30 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/5 transition-colors">Каталог моделей</a>
        </div>
      </div>
    </section>
  );
}

// ============ ABOUT COMPANY ============
function AboutCompany() {
  const { ref, visible } = useReveal();
  return (
    <section className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">О компании</p>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.1] mb-6">
              Производство в Абакане
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-4">
              Компания VELES специализируется на производстве каркасных автошторок премиум-класса с 2019 года. 
              Каждое изделие создаётся вручную с использованием качественных материалов.
            </p>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
              Мы изготавливаем шторки индивидуально под каждую модель автомобиля — с точностью до миллиметра. 
              Более 500 моделей в каталоге, доставка по всей России.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">5+</div>
                <p className="text-white/40 text-xs mt-1">лет на рынке</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">2000+</div>
                <p className="text-white/40 text-xs mt-1">клиентов</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
                <p className="text-white/40 text-xs mt-1">моделей авто</p>
              </div>
            </div>
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img src={IMG.g6} alt="Производство VELES" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ CATALOG ============
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
  const popularCars = [
    { brand: 'Toyota', model: 'Camry', img: IMG.g1 },
    { brand: 'Toyota', model: 'RAV4', img: IMG.g2 },
    { brand: 'Toyota', model: 'Land Cruiser', img: IMG.g3 },
    { brand: 'Kia', model: 'Sportage', img: IMG.g4 },
    { brand: 'Hyundai', model: 'Tucson', img: IMG.g5 },
    { brand: 'Mazda', model: 'CX-5', img: IMG.g6 },
  ];

  return (
    <section id="catalog" className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Каталог</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-6 md:mb-8">
          Более 500 моделей
        </h2>
        <p className="text-white/60 text-base md:text-lg max-w-2xl mb-12 md:mb-16">
          Изготавливаем шторки индивидуально под каждую модель автомобиля. Поддерживаемые марки:
        </p>
        
        {/* Brands list */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap gap-3">
            {brands.map((brand: string) => (
              <span key={brand} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Popular cars */}
        <h3 className="text-white text-xl md:text-2xl font-semibold mb-6">Популярные модели:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {popularCars.map((car, i) => (
            <div key={i} className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                <img src={car.img} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-white text-sm md:text-base font-medium">{car.brand} {car.model}</h3>
              <p className="text-white/40 text-xs mt-1">
                {patterns?.brands[car.brand]?.models[car.model]?.years?.[0] || 'Все годы'}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 md:mt-12 text-center">
          <p className="text-white/40 text-sm md:text-base mb-4">
            Нет вашей модели? Изготовим под любой автомобиль
          </p>
          <a href="#order" className="inline-block border border-white/30 text-white px-6 py-3 rounded-full text-sm hover:bg-white/5 transition-colors">
            Заказать индивидуальное изготовление
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ ORDER FORM WITH PATTERN CHECK ============
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

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel('');
    setSelectedYear('');
    setHasPattern(null);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedYear('');
    setHasPattern(null);
  };

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
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
    setHasPattern(null);
  }, []);

  const brands = patterns ? Object.keys(patterns.brands) : [];
  const models = selectedBrand && patterns ? Object.keys(patterns.brands[selectedBrand]?.models || {}) : [];
  const years = selectedBrand && selectedModel && patterns 
    ? patterns.brands[selectedBrand]?.models[selectedModel]?.years || [] 
    : [];

  return (
    <section id="order" className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-3xl mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="text-center mb-10">
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Заказ</p>
          <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em]">Закажите шторки VELES</h2>
          <p className="mt-4 text-white/40 text-sm md:text-base">Выберите ваш автомобиль — система проверит наличие лекала</p>
        </div>

        {done ? (
          <div className="text-center py-16 rounded-2xl border border-white/10">
            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-semibold mb-1">Заявка отправлена</h3>
            <p className="text-white/40 text-sm">Мы свяжемся с вами в течение 30 минут</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Car selector */}
            <div className="space-y-3">
              <select
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 focus:outline-none text-sm appearance-none cursor-pointer"
              >
                <option value="" className="bg-black">Выберите марку</option>
                {brands.map(brand => (
                  <option key={brand} value={brand} className="bg-black">{brand}</option>
                ))}
              </select>

              {selectedBrand && (
                <select
                  value={selectedModel}
                  onChange={(e) => handleModelChange(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 focus:outline-none text-sm appearance-none cursor-pointer"
                >
                  <option value="" className="bg-black">Выберите модель</option>
                  {models.map(model => (
                    <option key={model} value={model} className="bg-black">{model}</option>
                  ))}
                </select>
              )}

              {selectedModel && (
                <select
                  value={selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 focus:outline-none text-sm appearance-none cursor-pointer"
                >
                  <option value="" className="bg-black">Выберите год выпуска</option>
                  {years.map((year: string) => (
                    <option key={year} value={year} className="bg-black">{year}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Pattern status */}
            {hasPattern !== null && (
              <div className={`p-4 rounded-xl border ${hasPattern ? 'border-green-500/30 bg-green-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
                {hasPattern ? (
                  <p className="text-green-400 text-sm">✓ Лекало найдено. Доступен стандартный комплект.</p>
                ) : (
                  <p className="text-yellow-400 text-sm">⚠ Лекало не найдено. Возможно индивидуальное изготовление.</p>
                )}
              </div>
            )}

            {/* Different forms based on pattern availability */}
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

                {/* Different form IDs for analytics */}
                <button 
                  type="submit" 
                  id={hasPattern ? 'order-standard' : 'order-custom'}
                  className="w-full bg-white text-black py-3.5 rounded-full text-sm font-medium mt-2 hover:bg-gray-200 transition-colors"
                >
                  {hasPattern ? 'Заказать стандартный комплект' : 'Запросить индивидуальное изготовление'}
                </button>
                <p className="text-white/20 text-[10px] text-center mt-3">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ============ REST OF SECTIONS (simplified for brevity) ============
function Product() {
  const { ref, visible } = useReveal();
  return (
    <section id="product" className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Продукт</p>
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

function Gallery() {
  const { ref, visible } = useReveal();
  const images = [IMG.g1, IMG.g2, IMG.g3, IMG.g4, IMG.g5, IMG.g6];
  return (
    <section id="gallery" className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Галерея</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-8 md:mb-12">Реальные установки</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {images.map((src, i) => (
            <div key={i} className={`aspect-square rounded-lg md:rounded-2xl overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img src={src} alt="Автошторки VELES" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const { ref, visible } = useReveal();
  return (
    <section id="reviews" className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Отзывы</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-10 md:mb-16">Что говорят клиенты</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: 'Заказал шторки на Камри — качество космос. Установил за 5 минут, магниты держат мёртво.', n: 'Алексей К.', c: 'Toyota Camry' },
            { t: 'Ребёнок наконец-то спит в машине днём! Шторки блокируют солнце, обзор отличный.', n: 'Мария С.', c: 'Kia Sportage' },
            { t: 'Лучше любой тонировки. Законно, удобно. Снял за 10 секунд — никаких проблем.', n: 'Дмитрий В.', c: 'Hyundai Tucson' },
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

function Contacts() {
  const { ref, visible } = useReveal();
  return (
    <section id="contacts" className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Контакты</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-8">Свяжитесь с нами</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
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
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img src={IMG.g6} alt="VELES контакты" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="text-white font-semibold text-sm">VELES</span>
          <span className="text-white/20 text-xs">Каркасные автошторки</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://vk.com/avtoshtorki_abakan" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white text-xs transition-colors">VK</a>
          <a href="tel:+79134421234" className="text-white/30 hover:text-white text-xs transition-colors">+7 (913) 442-12-34</a>
        </div>
        <p className="text-white/15 text-[10px]">© 2024 VELES. Все права защищены.</p>
      </div>
    </footer>
  );
}

// ============ PRICING ============
function Pricing() {
  const { ref, visible } = useReveal();
  return (
    <section className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Цены</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-12 md:mb-16">
          Прозрачное ценообразование
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Передние двери',
              price: 'от 3 500 ₽',
              features: ['2 шторки', 'Магнитное крепление', 'Премиум-сетка', 'Установка за 5 секунд'],
            },
            {
              title: 'Задние двери',
              price: 'от 3 500 ₽',
              features: ['2 шторки', 'Магнитное крепление', 'Премиум-сетка', 'Установка за 5 секунд'],
              popular: true,
            },
            {
              title: 'Полный комплект',
              price: 'от 6 500 ₽',
              features: ['4 шторки', 'Магнитное крепление', 'Премиум-сетка', 'Экономия 500 ₽'],
            },
          ].map((plan, i) => (
            <div key={i} className={`p-8 rounded-2xl border ${plan.popular ? 'border-white/30 bg-white/[0.06]' : 'border-white/10 bg-white/[0.02]'} relative`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-xs font-medium">
                  Популярный
                </div>
              )}
              <h3 className="text-white text-xl font-semibold mb-2">{plan.title}</h3>
              <div className="text-white text-3xl font-bold mb-6">{plan.price}</div>
              <ul className="space-y-3">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-white/60 text-sm">
                    <svg className="w-4 h-4 text-white/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#order" className={`block mt-8 py-3 rounded-full text-sm font-medium text-center transition-colors ${plan.popular ? 'bg-white text-black hover:bg-gray-200' : 'border border-white/30 text-white hover:bg-white/5'}`}>
                Заказать
              </a>
            </div>
          ))}
        </div>
        <p className="text-white/40 text-xs text-center mt-8">
          * Точная стоимость зависит от модели автомобиля. Свяжитесь с нами для расчёта.
        </p>
      </div>
    </section>
  );
}

// ============ HOW IT WORKS ============
function HowItWorks() {
  const { ref, visible } = useReveal();
  return (
    <section className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4 text-center">Как это работает</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] text-center mb-16 md:mb-20">
          От заказа до установки
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { n: '01', t: 'Заявка', d: 'Оставляете заявку на сайте или звоните нам' },
            { n: '02', t: 'Подбор', d: 'Подбираем шторки под вашу модель автомобиля' },
            { n: '03', t: 'Изготовление', d: 'Изготавливаем за 1-3 рабочих дня' },
            { n: '04', t: 'Доставка', d: 'Отправляем по всей России за 3-7 дней' },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white/10 mb-4">{step.n}</div>
              <h3 className="text-white text-lg font-semibold mb-2">{step.t}</h3>
              <p className="text-white/50 text-sm">{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ TECHNICAL SPECS ============
function TechnicalSpecs() {
  const { ref, visible } = useReveal();
  return (
    <section className="bg-black py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Технические характеристики</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-12 md:mb-16">
          Качество в деталях
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            {[
              { label: 'Каркас', value: 'Стальная проволока 4 мм' },
              { label: 'Сетка', value: 'Премиум полиэстер, UV-стойкая' },
              { label: 'Магниты', value: 'Неодимовые N35' },
              { label: 'Хлястики', value: 'Натуральная кожа' },
              { label: 'Швы', value: 'Армированные нити, двойная строчка' },
              { label: 'Светопропускаемость', value: '10%' },
            ].map((spec, i) => (
              <div key={i} className="flex items-baseline gap-4 border-b border-white/5 pb-4">
                <span className="text-white/30 text-sm w-40 flex-shrink-0">{spec.label}</span>
                <span className="text-white text-base font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img src={IMG.mesh} alt="Технические характеристики" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ GUARANTEE ============
function Guarantee() {
  const { ref, visible } = useReveal();
  return (
    <section className="bg-[#0a0a0a] py-20 md:py-32">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-5 md:px-10 reveal ${visible ? 'visible' : ''}`}>
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4 text-center">Гарантии</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.02em] text-center mb-16 md:mb-20">
          Ваша уверенность — наш приоритет
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'Гарантия 1 год',
              desc: 'Если что-то пойдёт не так — заменим бесплатно',
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ),
              title: 'Возврат 14 дней',
              desc: 'Не подошли шторки? Вернём деньги без вопросов',
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Поддержка 24/7',
              desc: 'Всегда на связи. Поможем с любыми вопросами',
            },
          ].map((item, i) => (
            <div key={i} className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/20 text-white mb-6">
                {item.icon}
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/40 text-sm">{item.desc}</p>
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
            { q: 'Подойдут ли шторки на мой автомобиль?', a: 'Мы изготавливаем шторки индивидуально под каждую модель. Более 500 моделей в базе. Укажите марку, модель и год выпуска — мы подберём идеальный размер.' },
            { q: 'Не ухудшится ли обзор?', a: 'Мелкоячеистая сетка обеспечивает отличную прозрачность изнутри. Вы видите всё на дороге, при этом снаружи салон полностью скрыт.' },
            { q: 'Как крепятся шторки?', a: 'Неодимовые магниты вшиты в каркас и притягиваются к металлической рамке двери. Никакого клея, сверления или скотча — краска не повреждается.' },
            { q: 'Можно ли опускать стёкла?', a: 'Да, стёкла можно опускать — шторки остаются на месте благодаря магнитному креплению. При этом обеспечивается вентиляция без пыли и насекомых.' },
            { q: 'Какой срок изготовления?', a: 'Стандартный срок — 1-3 рабочих дня. Доставка по всей России занимает 3-7 дней в зависимости от региона.' },
            { q: 'Это законно?', a: 'Абсолютно. Каркасные автошторки не являются тонировкой и не подпадают под требования ТР ТС 014/2011. Никаких штрафов и ограничений.' },
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

// ============ APP ============
export default function App() {
  return (
    <div className="overflow-x-hidden">
      <CookieBanner />
      <Nav />
      <Hero />
      <AboutCompany />
      <Product />
      <HowItWorks />
      <TechnicalSpecs />
      <Pricing />
      <Catalog />
      <Gallery />
      <Guarantee />
      <Reviews />
      <FAQ />
      <OrderForm />
      <Contacts />
      <Footer />
    </div>
  );
}
