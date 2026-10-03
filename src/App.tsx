import { useEffect, useRef, useState, useCallback } from 'react';

// ============ HOOKS ============

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function useParallax() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return offset;
}

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);

  return count;
}

// ============ COMPONENTS ============

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-[#c9a96e]/50 flex items-center justify-center group-hover:border-[#c9a96e] transition-colors duration-300">
            <span className="font-display text-[#c9a96e] font-bold text-lg">V</span>
          </div>
          <span className="font-display text-xl tracking-wider text-white">VELES</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {['Преимущества', 'Продукция', 'О нас', 'Отзывы', 'Контакты'].map((item, i) => (
            <a
              key={i}
              href={`#${['features', 'products', 'about', 'reviews', 'contacts'][i]}`}
              className="text-sm text-white/60 hover:text-[#c9a96e] transition-colors duration-300 tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>

        <a href="#order" className="hidden lg:block btn-premium bg-[#c9a96e] text-black px-6 py-2.5 rounded-full text-sm font-medium tracking-wide">
          Заказать
        </a>

        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5">
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/5 transition-all duration-500 ${menuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
        <div className="px-6 py-8 flex flex-col gap-6">
          {['Преимущества', 'Продукция', 'О нас', 'Отзывы', 'Контакты'].map((item, i) => (
            <a
              key={i}
              href={`#${['features', 'products', 'about', 'reviews', 'contacts'][i]}`}
              onClick={() => setMenuOpen(false)}
              className="text-lg text-white/80 hover:text-[#c9a96e] transition-colors"
            >
              {item}
            </a>
          ))}
          <a href="#order" className="btn-premium bg-[#c9a96e] text-black px-6 py-3 rounded-full text-center font-medium">
            Заказать
          </a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const parallaxOffset = useParallax();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,110,0.3) 0%, transparent 70%)',
            transform: `translate(${parallaxOffset * 0.02}px, ${parallaxOffset * -0.03}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,110,0.4) 0%, transparent 70%)',
            transform: `translate(${parallaxOffset * -0.015}px, ${parallaxOffset * 0.02}px)`,
          }}
        />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(201,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} />
        {/* Animated orbiting circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
          <div className="absolute inset-0 rounded-full border border-[#c9a96e]/5 animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-8 rounded-full border border-[#c9a96e]/[0.03] animate-[spin_45s_linear_infinite_reverse]" />
          <div className="absolute inset-16 rounded-full border border-[#c9a96e]/[0.02] animate-[spin_60s_linear_infinite]" />
          {/* Orbiting dots */}
          <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-[#c9a96e]/30 animate-[spin_30s_linear_infinite]" style={{ transformOrigin: '50% 400px' }} />
          <div className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full bg-[#c9a96e]/20 animate-[spin_45s_linear_infinite_reverse]" style={{ transformOrigin: '50% 380px' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a96e]/30 bg-[#c9a96e]/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#c9a96e] pulse-gold" />
            <span className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase font-medium">Премиум качество</span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className={`font-display transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <span className="block text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] tracking-tight mb-4">
            Каркасные
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-gradient leading-[0.9] tracking-tight">
            Автошторки
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`mt-8 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Безупречная защита от солнца, пыли и посторонних взглядов.
          <br className="hidden md:block" />
          Магнитное крепление. Установка за 5 минут.
        </p>

        {/* CTA Buttons */}
        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-900 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#order" className="btn-premium bg-[#c9a96e] text-black px-10 py-4 rounded-full text-base font-semibold tracking-wide">
            Заказать сейчас
          </a>
          <a href="#features" className="btn-premium border border-white/20 text-white px-10 py-4 rounded-full text-base font-medium tracking-wide hover:border-[#c9a96e]/50 hover:text-[#c9a96e]">
            Узнать больше
          </a>
        </div>

        {/* Stats */}
        <div className={`mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto transition-all duration-1000 delay-[1100ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { value: '5 мин', label: 'Установка' },
            { value: '10%', label: 'Светопропуск.' },
            { value: '100%', label: 'Магниты' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white counter-number">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1 tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[1300ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#c9a96e]/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: '☀️',
      title: 'Защита от солнца',
      description: 'Эффективно отражает солнечные лучи, снижая нагрев салона до 70%. Комфортная температура даже в самый жаркий день.',
    },
    {
      icon: '🧲',
      title: 'Магнитное крепление',
      description: 'Неодимовые магниты вшиты в каркас. Не повреждают краску и обшивку. Надёжная фиксация при любой скорости.',
    },
    {
      icon: '🔒',
      title: 'Приватность',
      description: 'Светопропускаемость 10% — эффект тонировки. Изнутри отличный обзор, снаружи — полная приватность салона.',
    },
    {
      icon: '🛡️',
      title: 'Пылезащита',
      description: 'Мелкоячеистая премиум-сетка не пропускает пыль, грязь и насекомых. Чистый салон в любых условиях.',
    },
    {
      icon: '⚡',
      title: 'Установка 5 минут',
      description: 'Просто приложите шторку к проёму — магниты сами притянутся. Никакого клея, сверления и сложных инструментов.',
    },
    {
      icon: '💎',
      title: 'Премиум материалы',
      description: 'Стальной каркас 4мм, натуральная кожа на хлястиках, армированные нити. Качество, которое служит годами.',
    },
  ];

  return (
    <section id="features" className="relative py-32 md:py-40 section-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Преимущества"
          title="Почему VELES"
          subtitle="Каждая деталь продумана для вашего комфорта и безопасности"
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, delay }: { feature: { icon: string; title: string; description: string }; delay: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`animate-fade-up ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="group h-full p-8 rounded-2xl glass-effect hover:bg-white/[0.05] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#c9a96e]/5">
        <div className="text-4xl mb-6">{feature.icon}</div>
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#c9a96e] transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-white/50 leading-relaxed text-sm">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

function ProductShowcase() {
  const { ref, isVisible } = useScrollAnimation();
  const parallaxOffset = useParallax();

  return (
    <section id="products" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 60%)',
            transform: `translate(-50%, calc(-50% + ${parallaxOffset * 0.05}px))`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Продукция"
          title="Совершенство в деталях"
          subtitle="Каждая шторка VELES — результат ручного мастерства и инженерной точности"
        />

        <div ref={ref} className={`mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-scale ${isVisible ? 'visible' : ''}`}>
          {/* Product visual */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden glass-effect gold-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/10 via-transparent to-[#c9a96e]/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 mx-auto relative">
                    {/* Stylized curtain representation */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-[#c9a96e]/30 overflow-hidden">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(201,169,110,0.1) 8px, rgba(201,169,110,0.1) 9px), repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(201,169,110,0.1) 8px, rgba(201,169,110,0.1) 9px)',
                      }} />
                      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#c9a96e]/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#c9a96e]/20 to-transparent" />
                    </div>
                    {/* Magnets */}
                    <div className="absolute -left-2 top-1/4 w-4 h-4 rounded-full bg-[#c9a96e]/60 shadow-lg shadow-[#c9a96e]/30" />
                    <div className="absolute -left-2 top-2/4 w-4 h-4 rounded-full bg-[#c9a96e]/60 shadow-lg shadow-[#c9a96e]/30" />
                    <div className="absolute -left-2 top-3/4 w-4 h-4 rounded-full bg-[#c9a96e]/60 shadow-lg shadow-[#c9a96e]/30" />
                    <div className="absolute -right-2 top-1/4 w-4 h-4 rounded-full bg-[#c9a96e]/60 shadow-lg shadow-[#c9a96e]/30" />
                    <div className="absolute -right-2 top-2/4 w-4 h-4 rounded-full bg-[#c9a96e]/60 shadow-lg shadow-[#c9a96e]/30" />
                    <div className="absolute -right-2 top-3/4 w-4 h-4 rounded-full bg-[#c9a96e]/60 shadow-lg shadow-[#c9a96e]/30" />
                    {/* Leather tab */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-8 bg-gradient-to-b from-[#8B6914] to-[#5C4A0E] rounded-b-lg shadow-lg" />
                  </div>
                  <p className="mt-8 text-[#c9a96e]/60 text-sm tracking-wider uppercase">Схема крепления</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product details */}
          <div className="space-y-8">
            <div className="space-y-6">
              {[
                { label: 'Каркас', value: 'Стальная проволока 4мм', desc: 'Прочный и лёгкий, сохраняет форму годами' },
                { label: 'Сетка', value: 'Премиум полиэстер', desc: 'Мелкоячеистая структура, UV-стойкая' },
                { label: 'Магниты', value: 'Неодимовые N35', desc: 'Сверхсильное сцепление без вреда для ЛКП' },
                { label: 'Хлястики', value: 'Натуральная кожа', desc: 'Удобный хват, премиальный вид' },
                { label: 'Нити', value: 'Армированные', desc: 'Двойной шов для максимальной прочности' },
              ].map((item, i) => (
                <div key={i} className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-300">
                  <div className="w-1 h-full min-h-[48px] rounded-full bg-gradient-to-b from-[#c9a96e] to-[#c9a96e]/30 group-hover:from-[#c9a96e] group-hover:to-[#c9a96e]" />
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[#c9a96e] text-sm font-medium tracking-wide">{item.label}</span>
                      <span className="text-white font-semibold">{item.value}</span>
                    </div>
                    <p className="text-white/40 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a href="#order" className="btn-premium inline-flex items-center gap-2 bg-[#c9a96e] text-black px-8 py-4 rounded-full font-semibold tracking-wide">
                Подобрать для своего авто
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-32 md:py-40 section-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Сравнение"
          title="VELES vs Тонировка"
          subtitle="Законная альтернатива тонировке без штрафов и ограничений"
        />

        <div ref={ref} className={`mt-16 animate-fade-up ${isVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* VELES */}
            <div className="relative p-8 md:p-10 rounded-3xl border border-[#c9a96e]/30 bg-[#c9a96e]/[0.03]">
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-[#c9a96e] text-black text-xs font-bold tracking-wide">
                РЕКОМЕНДУЕМ
              </div>
              <h3 className="text-2xl font-bold text-[#c9a96e] mb-8 font-display">VELES</h3>
              <ul className="space-y-4">
                {[
                  'Легально — не является тонировкой',
                  'Снимаются за 10 секунд',
                  'Не повреждают автомобиль',
                  'Защита от пыли и насекомых',
                  'Отличный обзор изнутри',
                  'Многоразовое использование',
                  'Доставка по всей России',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <svg className="w-5 h-5 text-[#c9a96e] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Тонировка */}
            <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-2xl font-bold text-white/40 mb-8 font-display">Обычная тонировка</h3>
              <ul className="space-y-4">
                {[
                  'Штрафы и предписания',
                  'Нельзя снять на месте',
                  'Может повредить стекло при снятии',
                  'Не защищает от пыли',
                  'Ухудшает обзор в тёмное время',
                  'Одноразовое решение',
                  'Только в специализированном сервисе',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/30">
                    <svg className="w-5 h-5 text-white/20 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const clients = useCountUp(2000, 2000, isVisible);
  const cities = useCountUp(150, 2000, isVisible);
  const models = useCountUp(500, 2000, isVisible);
  const rating = useCountUp(49, 2000, isVisible);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#c9a96e]/5 via-transparent to-[#c9a96e]/5" />
      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: `${clients}+`, label: 'Довольных клиентов', suffix: '' },
            { value: `${cities}+`, label: 'Городов доставки', suffix: '' },
            { value: `${models}+`, label: 'Моделей авто', suffix: '' },
            { value: `${(rating / 10).toFixed(1)}`, label: 'Рейтинг на 2ГИС', suffix: '★' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white counter-number">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-white/40 mt-2 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Оставьте заявку',
      description: 'Укажите марку, модель и год выпуска вашего автомобиля. Мы подберём идеальные шторки.',
    },
    {
      number: '02',
      title: 'Изготовление',
      description: 'Каждая шторка изготавливается индивидуально под ваш автомобиль за 1-3 дня.',
    },
    {
      number: '03',
      title: 'Доставка',
      description: 'Отправляем по всей России. Бережная упаковка гарантирует сохранность.',
    },
    {
      number: '04',
      title: 'Установка',
      description: 'Просто приложите шторку к проёму — магниты зафиксируют её за 5 минут.',
    },
  ];

  return (
    <section id="about" className="relative py-32 md:py-40 section-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Как это работает"
          title="От заявки до комфорта"
          subtitle="Простой и понятный процесс в 4 шага"
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: { number: string; title: string; description: string }; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`animate-fade-up ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative group">
        <span className="text-7xl md:text-8xl font-bold text-white/[0.03] font-display absolute -top-4 -left-2 group-hover:text-[#c9a96e]/10 transition-colors duration-500">
          {step.number}
        </span>
        <div className="relative pt-8">
          <div className="w-12 h-12 rounded-full border border-[#c9a96e]/30 flex items-center justify-center mb-6 group-hover:border-[#c9a96e] group-hover:bg-[#c9a96e]/10 transition-all duration-300">
            <span className="text-[#c9a96e] font-bold text-sm">{step.number}</span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
          <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  const reviews = [
    {
      name: 'Алексей К.',
      car: 'Toyota Camry',
      text: 'Заказал шторки на Камри — качество просто космос! Установил за 5 минут, магниты держат мёртво. Теперь в машине прохладно даже в +35.',
      rating: 5,
    },
    {
      name: 'Мария С.',
      car: 'Kia Sportage',
      text: 'Ребёнок наконец-то спит в машине днём! Шторки блокируют солнце, а обзор для меня остаётся отличный. Рекомендую всем мамам!',
      rating: 5,
    },
    {
      name: 'Дмитрий В.',
      car: 'Hyundai Tucson',
      text: 'Лучше любой тонировки. Законно, удобно, красиво. Снял за 10 секунд когда подъехал к посту ДПС — никаких проблем.',
      rating: 5,
    },
    {
      name: 'Ольга П.',
      car: 'Volkswagen Tiguan',
      text: 'Качество материалов на высоте. Кожаные хлястики, ровные швы, магниты мощные. Видно, что делали с душой.',
      rating: 5,
    },
    {
      name: 'Сергей М.',
      car: 'Mazda CX-5',
      text: 'Второй раз заказываю — теперь на вторую машину. Пыль перестала лететь в салон, насекомые тоже не пробираются. Топ!',
      rating: 5,
    },
    {
      name: 'Анна Л.',
      car: 'Nissan X-Trail',
      text: 'Подруга посоветовала — не пожалела ни секунды. Салон не выгорает, кондиционер работает эффективнее. Экономия на лицо!',
      rating: 5,
    },
  ];

  return (
    <section id="reviews" className="relative py-32 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Отзывы"
          title="Нам доверяют"
          subtitle="Более 2000 довольных клиентов по всей России"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, delay }: { review: { name: string; car: string; text: string; rating: number }; delay: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`animate-fade-up ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-full p-6 rounded-2xl glass-effect hover:bg-white/[0.05] transition-all duration-500">
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: review.rating }).map((_, i) => (
            <svg key={i} className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-white/60 text-sm leading-relaxed mb-6">"{review.text}"</p>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium text-sm">{review.name}</div>
            <div className="text-white/30 text-xs">{review.car}</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
            <span className="text-[#c9a96e] text-xs font-bold">{review.name[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    car: '',
    year: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', car: '', year: '', phone: '' });
  }, []);

  return (
    <section id="order" className="relative py-32 md:py-40 section-gradient">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 60%)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="Заказ"
          title="Закажите шторки VELES"
          subtitle="Оставьте заявку и мы свяжемся с вами в течение 30 минут"
        />

        <div ref={ref} className={`mt-16 animate-fade-up ${isVisible ? 'visible' : ''}`}>
          {submitted ? (
            <div className="text-center py-16 px-8 rounded-3xl glass-effect">
              <div className="text-5xl mb-6">✓</div>
              <h3 className="text-2xl font-bold text-white mb-3">Заявка отправлена!</h3>
              <p className="text-white/50">Мы свяжемся с вами в ближайшее время</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-12 rounded-3xl glass-effect gold-glow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-white/50 tracking-wide">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:border-[#c9a96e]/50 focus:outline-none transition-colors duration-300"
                    placeholder="Как к вам обращаться?"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/50 tracking-wide">Марка и модель авто</label>
                  <input
                    type="text"
                    required
                    value={formData.car}
                    onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:border-[#c9a96e]/50 focus:outline-none transition-colors duration-300"
                    placeholder="Например: Toyota Camry"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/50 tracking-wide">Год выпуска</label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:border-[#c9a96e]/50 focus:outline-none transition-colors duration-300"
                    placeholder="2024"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/50 tracking-wide">Телефон</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/20 focus:border-[#c9a96e]/50 focus:outline-none transition-colors duration-300"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <button type="submit" className="btn-premium w-full md:w-auto bg-[#c9a96e] text-black px-12 py-4 rounded-full text-base font-semibold tracking-wide">
                  Отправить заявку
                </button>
                <p className="mt-4 text-white/30 text-xs">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contacts" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Контакты"
          title="Свяжитесь с нами"
          subtitle="Мы всегда на связи и готовы ответить на ваши вопросы"
        />

        <div ref={ref} className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up ${isVisible ? 'visible' : ''}`}>
          {[
            {
              icon: '📱',
              title: 'Телефон',
              value: '+7 (913) 442-12-34',
              link: 'tel:+79134421234',
              subtitle: 'Ежедневно с 9:00 до 21:00',
            },
            {
              icon: '💬',
              title: 'WhatsApp',
              value: 'Написать в WhatsApp',
              link: 'https://wa.me/79134421234',
              subtitle: 'Ответим за 5 минут',
            },
            {
              icon: '📍',
              title: 'Адрес',
              value: 'г. Абакан, Республика Хакасия',
              link: '#',
              subtitle: 'Доставка по всей России',
            },
          ].map((contact, i) => (
            <a
              key={i}
              href={contact.link}
              className="group p-8 rounded-2xl glass-effect hover:bg-white/[0.05] transition-all duration-500 text-center hover:scale-[1.02]"
            >
              <div className="text-4xl mb-4">{contact.icon}</div>
              <h3 className="text-white/40 text-sm tracking-wide mb-2">{contact.title}</h3>
              <p className="text-white font-medium text-lg group-hover:text-[#c9a96e] transition-colors duration-300">{contact.value}</p>
              <p className="text-white/30 text-sm mt-2">{contact.subtitle}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Подойдут ли шторки на мой автомобиль?',
      answer: 'Мы изготавливаем шторки индивидуально под каждую модель автомобиля. У нас более 500 моделей в базе. Просто укажите марку, модель и год выпуска при заказе — мы подберём идеальный размер.',
    },
    {
      question: 'Не ухудшится ли обзор?',
      answer: 'Нет! Мелкоячеистая премиум-сетка обеспечивает отличную прозрачность изнутри. Вы видите всё, что происходит на дороге, при этом снаружи салон полностью скрыт. Это как тонировка, но законная.',
    },
    {
      question: 'Как крепятся шторки?',
      answer: 'Шторки крепятся на неодимовые магниты, вшитые в каркас. Магниты притягиваются непосредственно к металлической рамке двери. Никакого клея, сверления или скотча — краска и обшивка не повреждаются.',
    },
    {
      question: 'Можно ли опускать стёкла с шторками?',
      answer: 'Да, вы можете опускать стёкла — шторки остаются на месте благодаря магнитному креплению. При этом обеспечивается вентиляция салона без пыли и насекомых.',
    },
    {
      question: 'Какой срок изготовления?',
      answer: 'Стандартный срок изготовления — 1-3 рабочих дня. После этого отправляем заказ по всей России. Доставка обычно занимает 3-7 дней в зависимости от региона.',
    },
    {
      question: 'Это законно? Не будет ли штрафов?',
      answer: 'Абсолютно законно! Каркасные автошторки не являются тонировкой и не подпадают под требования ТР ТС 014/2011. Вы можете использовать их без ограничений и штрафов.',
    },
  ];

  return (
    <section className="relative py-32 md:py-40 section-gradient">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          badge="FAQ"
          title="Частые вопросы"
          subtitle="Ответы на самые популярные вопросы о наших шторках"
        />

        <div className="mt-16 space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              delay={i * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, isOpen, onToggle, delay }: { faq: { question: string; answer: string }; isOpen: boolean; onToggle: () => void; delay: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`animate-fade-up ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`rounded-2xl border transition-all duration-500 ${isOpen ? 'border-[#c9a96e]/30 bg-[#c9a96e]/[0.03]' : 'border-white/10 bg-white/[0.02]'}`}>
        <button
          onClick={onToggle}
          className="w-full px-6 py-5 flex items-center justify-between text-left"
        >
          <span className={`text-base font-medium transition-colors duration-300 ${isOpen ? 'text-[#c9a96e]' : 'text-white/80'}`}>
            {faq.question}
          </span>
          <svg
            className={`w-5 h-5 text-[#c9a96e] transition-transform duration-500 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <p className="px-6 pb-5 text-white/50 text-sm leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function GuaranteeSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Гарантии"
          title="Ваша уверенность — наш приоритет"
          subtitle="Мы уверены в качестве нашей продукции и подкрепляем это гарантиями"
        />

        <div ref={ref} className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up ${isVisible ? 'visible' : ''}`}>
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'Гарантия 1 год',
              description: 'Если что-то пойдёт не так — заменим бесплатно. Мы уверены в каждом изделии.',
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ),
              title: 'Возврат 14 дней',
              description: 'Не подошли шторки? Вернём деньги без лишних вопросов в течение 14 дней.',
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Поддержка 24/7',
              description: 'Всегда на связи. Поможем с выбором, установкой и любыми вопросами.',
            },
          ].map((item, i) => (
            <div key={i} className="group text-center p-8 rounded-2xl glass-effect hover:bg-white/[0.05] transition-all duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#c9a96e]/30 text-[#c9a96e] mb-6 group-hover:border-[#c9a96e] group-hover:bg-[#c9a96e]/10 transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const { ref, isVisible } = useScrollAnimation();

  const galleryItems = [
    { title: 'Седан', desc: 'Идеальная посадка' },
    { title: 'Кроссовер', desc: 'Надёжная защита' },
    { title: 'Внедорожник', desc: 'Максимальный комфорт' },
    { title: 'Хэтчбек', desc: 'Стильное решение' },
    { title: 'Универсал', desc: 'Полный комплект' },
    { title: 'Минивэн', desc: 'Комфорт семьи' },
  ];

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="Галерея"
          title="На любом автомобиле"
          subtitle="Шторки VELES изготавливаются под каждую модель — идеальная геометрия гарантирована"
        />

        <div ref={ref} className={`mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 animate-scale ${isVisible ? 'visible' : ''}`}>
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-effect hover:scale-[1.02] transition-all duration-500 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/10 via-transparent to-[#c9a96e]/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-xl border border-[#c9a96e]/20 flex items-center justify-center mb-3 group-hover:border-[#c9a96e]/50 group-hover:bg-[#c9a96e]/10 transition-all duration-500">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-[#c9a96e]/60 group-hover:text-[#c9a96e] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM9 7h6M9 11h6M9 15h4" />
                    </svg>
                  </div>
                  <h4 className="text-white font-medium text-sm md:text-base">{item.title}</h4>
                  <p className="text-white/30 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
              <div className="absolute inset-0 border border-[#c9a96e]/0 group-hover:border-[#c9a96e]/30 rounded-2xl transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#c9a96e]/10 via-[#c9a96e]/5 to-[#c9a96e]/10" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,169,110,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(201,169,110,0.1) 0%, transparent 50%)',
      }} />
      
      <div ref={ref} className={`max-w-4xl mx-auto px-6 relative z-10 text-center animate-fade-up ${isVisible ? 'visible' : ''}`}>
        <h2 className="text-3xl md:text-5xl font-bold text-white font-display leading-tight">
          Готовы к <span className="text-gradient">комфорту</span>?
        </h2>
        <p className="mt-6 text-lg text-white/40 max-w-xl mx-auto">
          Закажите шторки VELES сегодня и почувствуйте разницу уже завтра
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#order" className="btn-premium bg-[#c9a96e] text-black px-10 py-4 rounded-full text-base font-semibold tracking-wide">
            Оформить заказ
          </a>
          <a href="tel:+79134421234" className="btn-premium border border-white/20 text-white px-10 py-4 rounded-full text-base font-medium tracking-wide hover:border-[#c9a96e]/50 hover:text-[#c9a96e]">
            Позвонить нам
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-[#c9a96e]/50 flex items-center justify-center">
                <span className="font-display text-[#c9a96e] font-bold text-lg">V</span>
              </div>
              <span className="font-display text-xl tracking-wider text-white">VELES</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Производство каркасных автошторок премиум-класса на магнитном креплении. Качество, проверенное временем.
            </p>
          </div>

          <div>
            <h4 className="text-white/60 text-sm font-medium tracking-wide mb-4">Навигация</h4>
            <ul className="space-y-3">
              {['Преимущества', 'Продукция', 'О нас', 'Отзывы', 'Контакты'].map((item, i) => (
                <li key={i}>
                  <a href={`#${['features', 'products', 'about', 'reviews', 'contacts'][i]}`} className="text-white/30 hover:text-[#c9a96e] text-sm transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/60 text-sm font-medium tracking-wide mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="text-white/30 text-sm">+7 (913) 442-12-34</li>
              <li className="text-white/30 text-sm">г. Абакан</li>
              <li className="text-white/30 text-sm">autoveles.ru</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">© 2024 VELES. Все права защищены.</p>
          <p className="text-white/20 text-xs">Каркасные автошторки премиум-класса</p>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className={`text-center max-w-3xl mx-auto animate-fade-up ${isVisible ? 'visible' : ''}`}>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a96e]/20 bg-[#c9a96e]/5 mb-6">
        <span className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase font-medium">{badge}</span>
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">
        {title}
      </h2>
      <p className="mt-6 text-lg text-white/40 leading-relaxed">{subtitle}</p>
      <div className="mt-8 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/50 to-transparent line-reveal" />
    </div>
  );
}

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={glowRef} className="cursor-glow hidden lg:block" />;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100]">
      <div
        className="h-full bg-gradient-to-r from-[#c9a96e] to-[#e8d5a3] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ============ MAIN APP ============

export default function App() {
  return (
    <div className="relative">
      <div className="noise-overlay" />
      <ScrollProgress />
      <CursorGlow />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ProductShowcase />
      <ComparisonSection />
      <StatsSection />
      <HowItWorks />
      <GuaranteeSection />
      <ReviewsSection />
      <GallerySection />
      <FAQSection />
      <OrderSection />
      <CTABanner />
      <ContactsSection />
      <Footer />
    </div>
  );
}
