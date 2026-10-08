import { useEffect, useState } from 'react';

export default function CookieBanner() {
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
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-void/95 backdrop-blur-xl border-t border-steel/20">
      <div className="container-fluid flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-fog/70 text-xs md:text-sm text-center md:text-left">
          Мы используем файлы cookie для улучшения работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с{' '}
          <a href="#" className="underline hover:text-fog">политикой конфиденциальности</a>.
        </p>
        <button
          onClick={accept}
          className="bg-brass text-void px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brass/90 transition-colors whitespace-nowrap"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
