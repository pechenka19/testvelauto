# VELES Premium Landing Page

Премиальный лендинг для каркасных автошторок VELES с кинематографичными анимациями уровня Apple/Tesla/Mercedes-AMG.

## 🎯 Архитектура

### Реализованные компоненты:

1. **Глобальная система дизайна** (`src/index.css`)
   - Fluid typography через `clamp()`
   - 8pt grid system
   - CSS переменные для цветов, отступов, типографики
   - Семантические классы

2. **Lenis Smooth Scroll** + **GSAP ScrollTrigger**
   - Плавная инерционная прокрутка
   - Scroll-driven анимации
   - SVG path drawing animations
   - Parallax эффекты

3. **Hero Section**
   - Ken Burns эффект на фоновом изображении
   - Parallax на контенте при скролле
   - Staggered анимации появления текста
   - Scroll indicator

4. **Engineering Section** (Feature Showcase)
   - SVG wireframe с анимацией рисования при скролле
   - Floating diagram animation
   - Staggered появление спецификаций
   - ScrollTrigger для точного контроля

5. **Order Form с проверкой лекал**
   - Динамический подбор по марке/модели/году
   - Проверка наличия лекала из JSON
   - Разные формы для стандартных и индивидуальных заказов
   - Разные ID для отслеживания конверсий в рекламных сетях

## 🚀 Как продолжить разработку

### Для добавления следующих секций используйте этот шаблон:

```typescript
function NewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // Ваши GSAP анимации здесь
      gsap.from('.element', {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="section-padding bg-primary"
      aria-label="Название секции"
    >
      <div className="container-fluid">
        {/* Контент секции */}
      </div>
    </section>
  );
}
```

### Рекомендуемые следующие секции:

1. **Immersive Gallery**
   - Horizontal scroll triggered by vertical scroll
   - Parallax на изображениях
   - Маски и клипы для reveal эффектов

2. **Deep-Dive Features**
   - Sticky container с scrollable content
   - Background image morphing
   - Text blocks slide in с разных направлений
   - Progress indicator

3. **Testimonials**
   - Cards с staggered появлением
   - Parallax на аватарах
   - Quote marks с SVG path animation

4. **Final CTA**
   - Full-viewport с video background
   - Text reveal с mask animation
   - Button с magnetic effect

## 📐 Design System

### Typography Scale
```css
--text-display: clamp(3rem, 8vw, 8rem);  /* Hero headlines */
--text-h1: clamp(2.5rem, 6vw, 6rem);     /* Section titles */
--text-h2: clamp(2rem, 4vw, 4rem);       /* Subsections */
--text-h3: clamp(1.5rem, 3vw, 2.5rem);   /* Cards */
--text-body: clamp(1rem, 1.5vw, 1.25rem); /* Paragraphs */
--text-caption: clamp(0.75rem, 1vw, 0.875rem); /* Labels */
```

### Spacing (8pt grid)
```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 32px;
--space-xl: 48px;
--space-2xl: 64px;
--space-3xl: 96px;
--space-section: clamp(4rem, 10vw, 10rem);
```

### Colors
```css
--color-primary: #000000;
--color-secondary: #0a0a0a;
--color-accent: #ffffff;
--color-muted: rgba(255, 255, 255, 0.6);
--color-border: rgba(255, 255, 255, 0.1);
```

## 🎬 Animation Patterns

### 1. Scroll-Triggered Reveal
```typescript
gsap.from(element, {
  y: 100,
  opacity: 0,
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
});
```

### 2. Parallax Effect
```typescript
gsap.to(element, {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});
```

### 3. SVG Path Drawing
```typescript
const path = svgElement.querySelector('path');
const length = path.getTotalLength();
gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
gsap.to(path, {
  strokeDashoffset: 0,
  scrollTrigger: {
    trigger: section,
    start: 'top 60%',
    end: 'center center',
    scrub: 1,
  },
});
```

### 4. Staggered Animation
```typescript
gsap.from(elements, {
  y: 50,
  opacity: 0,
  stagger: 0.1,
  scrollTrigger: {
    trigger: container,
    start: 'top 80%',
  },
});
```

## 📊 Performance Checklist

- ✅ Font preloading
- ✅ Hero image preload
- ✅ Lazy loading для below-fold images
- ✅ Lenis smooth scroll (60fps)
- ✅ GSAP ScrollTrigger (hardware accelerated)
- ✅ Semantic HTML5
- ✅ ARIA labels
- ✅ Fluid typography (no layout shifts)

## 🔧 Обновление базы лекал

Файл `public/patterns.json` содержит базу лекал. Для обновления:

1. Откройте Google Sheets с лекалами
2. Экспортируйте в JSON формате:
```json
{
  "brands": {
    "Toyota": {
      "models": {
        "Camry": {
          "years": ["1996-2001", "2001-2006"],
          "hasPattern": true
        }
      }
    }
  }
}
```

3. Замените содержимое `public/patterns.json`

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## 🎨 Figma Design System

Для поддержания консистентности используйте:
- 8pt grid для всех отступов
- Fluid typography scale
- Color tokens из CSS переменных
- Border radius: 16px для карточек, 999px для кнопок

---

**Статус:** ✅ Базовая архитектура готова
**Следующий шаг:** Добавить Immersive Gallery и Deep-Dive Features секции
