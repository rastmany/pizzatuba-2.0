
import React, { useState, useEffect } from 'react';
import { Category, MenuItem } from './types';
import { MENU_ITEMS, CONTACT_INFO, OPENING_HOURS } from './constants';
import { useContactForm } from './src/hooks/useContactForm';
import { EventsPage } from './EventsPage';

interface NavigationProps {
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState({ isOpen: false, text: '' });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour + minute / 60;

      const hoursMap: { [key: number]: { open: number; close: number; closed?: boolean } } = {
        1: { open: 0, close: 0, closed: true },
        2: { open: 0, close: 0, closed: true },
        3: { open: 0, close: 0, closed: true },
        4: { open: 18, close: 21 },
        5: { open: 12, close: 21 },
        6: { open: 12, close: 21 },
        0: { open: 12, close: 20 },
      };

      const todayHours = hoursMap[day];

      if (!todayHours.closed && currentTime >= todayHours.open && currentTime < todayHours.close) {
        setStatus({ isOpen: true, text: 'Avatud' });
        return;
      }

      if (!todayHours.closed && currentTime < todayHours.open) {
        setStatus({ isOpen: false, text: `${todayHours.open}:00` });
        return;
      }

      let nextDay = (day + 1) % 7;
      let daysChecked = 0;
      while (daysChecked < 7) {
        const nextHours = hoursMap[nextDay];
        if (!nextHours.closed) {
          const dayShort = ['P', 'E', 'T', 'K', 'N', 'R', 'L'];
          setStatus({ isOpen: false, text: `${dayShort[nextDay]} ${nextHours.open}:00` });
          return;
        }
        nextDay = (nextDay + 1) % 7;
        daysChecked++;
      }
      setStatus({ isOpen: false, text: 'Suletud' });
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 sticky-nav-blur border-b border-ivory-dark/50 shadow-sm' : 'py-6 bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div
            onClick={() => onNavigate('home')}
            className={`text-2xl font-outfit font-extrabold tracking-tight cursor-pointer transition-opacity hover:opacity-80 ${scrolled ? 'text-pizzatuba-orange' : 'text-white'}`}
          >
            PIZZATUBA
          </div>
          {/* Compact status indicator */}
          <div className={`hidden lg:flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[7px] font-bold tracking-wide transition-all border ${status.isOpen
            ? (scrolled ? 'bg-green-50 text-green-700 border-green-200' : 'bg-green-900/40 text-green-100 border-green-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.3)]')
            : (scrolled ? 'bg-red-50 text-red-700 border-red-200' : 'bg-red-950/40 text-red-100 border-red-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.3)]')}`}>
            <span className={`w-1 h-1 rounded-full shadow-lg ${status.isOpen ? 'bg-green-500 shadow-green-500' : 'bg-red-500 shadow-red-500'} ${!status.isOpen ? 'animate-pulse' : ''}`}></span>

            <div className="flex items-center space-x-2">
              <span className="uppercase">
                {status.isOpen ? 'AVATUD' : 'SULETUD'}
              </span>
              <span className={`h-3 w-px ${status.isOpen ? (scrolled ? 'bg-green-300' : 'bg-green-500/30') : (scrolled ? 'bg-red-300' : 'bg-red-500/30')}`}></span>
              <span className="uppercase whitespace-nowrap">
                {status.isOpen ? '' : `AVAME ${status.text}`}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-semibold">
          <a href="#menu" className={`${scrolled ? 'text-gray-700 hover:text-pizzatuba-orange' : 'text-white/90 hover:text-white'}`}>Menüü</a>
          <a href="#about" className={`${scrolled ? 'text-gray-700 hover:text-pizzatuba-orange' : 'text-white/90 hover:text-white'}`}>Meist</a>
          <a href="#contact" className={`${scrolled ? 'text-gray-700 hover:text-pizzatuba-orange' : 'text-white/90 hover:text-white'}`}>Kontakt</a>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="https://waze.com/ul/hud6w6j60t"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs transition-all opacity-50 hover:opacity-100 ${scrolled ? 'bg-gray-400/40 text-gray-700 hover:bg-gray-400/60' : 'bg-white/10 backdrop-blur-sm text-white/70 border border-white/20 hover:bg-white/20'}`}
          >
            <span className="text-xs">🚗</span>
            <span className="font-medium">Waze</span>
          </a>
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${scrolled ? 'bg-pizzatuba-orange text-white' : 'bg-white text-pizzatuba-orange shadow-lg hover:scale-105'}`}
          >
            Telli kohe
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  const [status, setStatus] = useState({ isOpen: false, text: '' });
  const [sloganIndex, setSloganIndex] = useState(0);

  // Rotating headline slogans - Conversion-focused with emotional triggers
  const slogans = [
    "Tule soojale.\nMe ootame sind.",
    "Ehtne tuli.\nEhtne maitse.",
    "Sul on koht,\nkuhu alati tulla.",
    "Puupliidil küpsetatud.\nArmastusega serveeritud.",
    "Mitte pizza.\nKogemus.",
    "Lõpuks koht,\nkus lihtsalt olla.",
    "Ivo retsept.\nMulgi hing.",
    "Kuna viimati\ntegid midagi enda jaoks?",
    "Tule üksi.\nMine sõpradega.",
    "Koht, kus\naeg peatub.",
    "Siin ei kiirusta\nkeegi.",
    "Abja süda\ntuksub tugevalt.",
    "Tere tulemast\nkoju."
  ];


  useEffect(() => {
    const sloganInterval = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 4500);
    return () => clearInterval(sloganInterval);
  }, [slogans.length]);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour + minute / 60;

      // Map days to specific hours (Mon=1, Sun=0)
      // closed: true marks days when the place is closed
      const hoursMap: { [key: number]: { open: number; close: number; closed?: boolean } } = {
        1: { open: 0, close: 0, closed: true }, // E
        2: { open: 0, close: 0, closed: true }, // T
        3: { open: 0, close: 0, closed: true }, // K
        4: { open: 18, close: 21 }, // N
        5: { open: 12, close: 21 }, // R
        6: { open: 12, close: 21 }, // L
        0: { open: 12, close: 20 }, // P
      };

      const todayHours = hoursMap[day];

      if (!todayHours.closed && currentTime >= todayHours.open && currentTime < todayHours.close) {
        setStatus({ isOpen: true, text: 'Nüüd avatud' });
        return;
      }

      if (!todayHours.closed && currentTime < todayHours.open) {
        setStatus({ isOpen: false, text: `Suletud (Avame täna ${todayHours.open}:00)` });
        return;
      }

      // Find next opening
      let nextDay = (day + 1) % 7;
      let daysChecked = 0;
      while (daysChecked < 7) {
        const nextHours = hoursMap[nextDay];
        if (!nextHours.closed) {
          const dayNames = ['pühapäeval', 'esmaspäeval', 'teisipäeval', 'kolmapäeval', 'neljapäeval', 'reedel', 'laupäeval'];
          setStatus({ isOpen: false, text: `Suletud (Avame ${dayNames[nextDay]} ${nextHours.open}:00)` });
          return;
        }
        nextDay = (nextDay + 1) % 7;
        daysChecked++;
      }

      setStatus({ isOpen: false, text: 'Suletud' });
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1920&q=80"
          alt="Pizza oven"
          className="w-full h-full object-cover brightness-[0.4]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full text-white">
        <div className="flex flex-col items-start max-w-3xl">
          {/* Animated headline slider */}
          <div className="h-[140px] md:h-[200px] mb-8 overflow-hidden flex items-center">
            <h1
              key={sloganIndex}
              className="text-3xl md:text-5xl lg:text-6xl font-outfit font-extrabold leading-[1.4] tracking-tighter rotating-text whitespace-pre-line"
            >
              <span className="animated-headline">{slogans[sloganIndex]}</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <a href="#menu" className="px-8 py-4 bg-pizzatuba-orange text-white rounded-xl font-bold text-lg text-center hover:bg-[#e65c00] transition-all transform hover:-translate-y-1 shadow-xl">
              Vaata menüüd
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.PIZZAS);

  const categories = [Category.PIZZAS, Category.SPECIALS, Category.DRINKS];
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-12 bg-ivory">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-outfit font-extrabold mb-4">Menüü</h2>
          <p className="text-gray-500 max-w-xl mx-auto italic">Lihtne on parim. Värske on kohustuslik.</p>
        </div>

        <div className="flex justify-center mb-6 sticky top-[72px] z-40 py-3 bg-ivory/95 backdrop-blur-sm border-b border-ivory-dark md:border-none">
          <div className="flex bg-ivory-soft p-1 rounded-2xl border border-ivory-dark">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 md:px-8 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${activeCategory === cat ? 'bg-ivory text-pizzatuba-orange shadow-sm border border-ivory-dark' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`group flex items-start justify-between py-3 border-b border-ivory-dark transition-all hover:bg-ivory-dark/30 px-4 rounded-xl -mx-4`}
            >
              <div className="flex-1 pr-8">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-outfit font-bold group-hover:text-pizzatuba-orange transition-colors">
                    {item.name}
                  </h3>
                  {item.isSpecial && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-pizzatuba-orange bg-pizzatuba-orange/10 px-2 py-0.5 rounded-full">
                      Eripakkumine
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                  {item.description}
                </p>
              </div>
              <div className="text-right">
                <span className="font-outfit font-bold text-lg text-gray-900">
                  €{item.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-400 border-t border-ivory-dark pt-4">
          <p>* Kõik hinnad sisaldavad käibemaksu.</p>
        </div>
      </div>
    </section>
  );
};

const ValueProps: React.FC = () => {
  const props = [
    { title: 'Ehtne Tuli', desc: 'Iga pizza küpseb kivi plaadil üle 400 kraadi juures. Sama meetod, mida kasutati Itaalias 100 aastat tagasi.', icon: '🔥' },
    { title: 'Käsitöö Hing', desc: 'Tainas käärib 72 tundi. Iga pizza on vormitud käsitsi. Siin ei ole mingit masstoodetud.', icon: '🤲' },
    { title: 'Sinu Koht', desc: 'Koht, kus sind tuntakse. Kus aeg peatub. Kus toit on teraapia.', icon: '🏠' }
  ];

  return (
    <section id="about" className="py-24 bg-ivory-soft">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {props.map((p, i) => (
            <div key={i} className="text-center p-8 bg-ivory rounded-[40px] shadow-sm border border-ivory-dark transition-transform hover:scale-105">
              <div className="text-5xl mb-6">{p.icon}</div>
              <h3 className="text-2xl font-outfit font-bold mb-4">{p.title}</h3>
              <p className="text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FacebookFeed: React.FC = () => {
  useEffect(() => {
    // Load Facebook SDK without APP_ID (works for public pages)
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/et_EE/sdk.js#xfbml=1&version=v24.0';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="py-12 bg-ivory border-b border-ivory-dark">
      <div id="fb-root"></div>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-outfit font-bold mb-8">Mis meil toimub</h2>

        {/* Facebook Page Plugin */}
        <div className="flex justify-center">
          <div
            className="fb-page"
            data-href="https://www.facebook.com/PizzatubaOfficial"
            data-tabs="timeline"
            data-width="500"
            data-height="600"
            data-small-header="true"
            data-adapt-container-width="true"
            data-hide-cover="true"
            data-show-facepile="true"
          >
            <blockquote cite="https://www.facebook.com/PizzatubaOfficial" className="fb-xfbml-parse-ignore">
              <a href="https://www.facebook.com/PizzatubaOfficial">Pizzatuba</a>
            </blockquote>
          </div>
        </div>

        <a href="https://www.facebook.com/PizzatubaOfficial" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-pizzatuba-orange font-bold hover:text-[#e65c00] transition-colors mt-6">
          <span>Vaata meie Facebooki lehte</span>
          <span>→</span>
        </a>
      </div>
    </section>
  );
};

import { EventCalculator } from './src/components/EventCalculator';

// ... (other imports)

const EventsSection: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const words = ['perele', 'südamele', 'külalistele', 'sõpradele', 'peole', 'puhkusele', 'üritusele'];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="events" className="py-24 bg-ivory overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-pizzatuba-orange/10 rounded-full blur-3xl -z-10"></div>
            <img
              src="/images/582282028_834401975991220_6282355860653094478_n.png"
              alt="Events at Pizzatuba"
              className="rounded-[40px] shadow-2xl w-full object-cover aspect-[4/3]"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-outfit font-extrabold mb-6 min-h-[1.2em]">
              Koht sinu{' '}
              <span
                key={wordIndex}
                className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-600 to-red-800 animate-pulse"
                style={{ animationDuration: '3.5s' }}
              >
                {words[wordIndex]}
              </span>
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Meie hubane saal on loodud naeru ja ühiste hetkede jaoks. Siin on ruumi 25-le lähedasele ja aega nautimiseks.
              <br /><br />
              Et peo korraldamine oleks stressivaba, lõime sulle abimehe. Kliki nupule ja kasuta meie kalkulaatorit – nii näed kohe, kui lihtne on unistuste üritus teoks teha.
            </p>
            <ul className="space-y-4 mb-10">
              {['Privaatne ruum', 'Erimenüü kokkuleppel', 'Hubane sisustus', 'Muusika võimalus'].map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-pizzatuba-orange/20 text-pizzatuba-orange flex items-center justify-center text-xs font-bold">✓</span>
                  <span className="font-semibold text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowCalculator(true)}
                className="inline-block px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg text-center"
              >
                Arvuta sündmuse hind
              </button>
              <a
                href="https://waze.com/ul/hud6w6j60t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 bg-white border border-gray-200 text-gray-800 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-md space-x-2"
              >
                <span>🚗</span>
                <span>Navigeeri kohale</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCalculator(false)}
          ></div>
          <div className="relative z-10 w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCalculator(false)}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
            >
              ✕
            </button>
            <div className="p-8 md:p-12 bg-ivory">
              <h2 className="text-3xl font-outfit font-bold mb-2 text-center">Planeeri oma sündmus</h2>
              <p className="text-gray-500 text-center mb-8">Arvuta eelarve ja saada meile päring</p>
              <EventCalculator />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const ContactForm: React.FC = () => {
  const { formData, setFormData, isSubmitting, isSuccess, error, handleSubmit } = useContactForm();

  return (
    <section id="contact" className="py-24 bg-ivory-soft">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-ivory rounded-[48px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-ivory-dark">
          <div className="md:w-2/5 bg-gradient-to-br from-orange-400 via-red-600 to-red-800 shadow-inner p-12 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-outfit font-bold mb-8">Räägime</h2>
              <p className="text-white/80 mb-12">Broneeri laud. Planeeri üritus. Või lihtsalt küsi, mis täna ahjus on.</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">📍</div>
                  <div>
                    <div className="font-bold text-sm uppercase tracking-wider mb-1">Asukoht</div>
                    <div className="text-sm text-white/80 mb-2">{CONTACT_INFO.address}</div>
                    <a
                      href="https://waze.com/ul/hud6w6j60t"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold text-white bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all"
                    >
                      <span>🚗</span>
                      <span>Ava Waze'is</span>
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">📞</div>
                  <div>
                    <div className="font-bold text-sm uppercase tracking-wider mb-1">Telefon</div>
                    <div className="text-sm text-white/80">{CONTACT_INFO.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/20">
              <div className="font-bold mb-4 uppercase text-xs tracking-widest">Lahtiolekuajad</div>
              {OPENING_HOURS.map((h, i) => (
                <div key={i} className="flex justify-between text-sm mb-2 text-white/80">
                  <span>{h.day}</span>
                  <span className="font-medium">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-3/5 p-12 bg-ivory">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success Message */}
              {isSuccess && (
                <div className="p-4 bg-green-100 border border-green-300 rounded-2xl text-green-800 text-center font-medium">
                  ✅ Täname! Sinu päring on saadetud. Võtame sinuga peagi ühendust!
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-100 border border-red-300 rounded-2xl text-red-800 text-center font-medium">
                  ❌ {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nimi *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-5 py-4 bg-ivory-soft rounded-2xl border border-ivory-dark focus:bg-white focus:border-pizzatuba-orange focus:ring-0 transition-all outline-none"
                    placeholder="Sinu nimi"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-5 py-4 bg-ivory-soft rounded-2xl border border-ivory-dark focus:bg-white focus:border-pizzatuba-orange focus:ring-0 transition-all outline-none"
                    placeholder="+372 ..."
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-5 py-4 bg-ivory-soft rounded-2xl border border-ivory-dark focus:bg-white focus:border-pizzatuba-orange focus:ring-0 transition-all outline-none"
                  placeholder="nimi@mail.ee"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Planeeritav eelarve (valikuline)</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full px-5 py-4 bg-ivory-soft rounded-2xl border border-ivory-dark focus:bg-white focus:border-pizzatuba-orange focus:ring-0 transition-all outline-none"
                  placeholder="nt. 200€"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Sõnum või broneeringu info</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-5 py-4 bg-ivory-soft rounded-2xl border border-ivory-dark focus:bg-white focus:border-pizzatuba-orange focus:ring-0 transition-all outline-none resize-none"
                  placeholder="Kirjuta siia..."
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all ${isSubmitting
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-orange-500/20 hover:from-red-700 hover:to-orange-600'
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Saadan...</span>
                  </span>
                ) : 'Saada päring'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const StickyCTA: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-6 pt-4 bg-gradient-to-t from-ivory via-ivory to-transparent">
      <div className="flex space-x-3">
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="flex-1 bg-pizzatuba-orange text-white py-4 rounded-2xl font-bold text-center flex items-center justify-center space-x-2 shadow-2xl shadow-orange-500/30"
        >
          <span>📞</span>
          <span>Telli ette</span>
        </a>
        <a
          href="#contact"
          className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold text-center flex items-center justify-center space-x-2"
        >
          <span>📅</span>
          <span>Broneeri</span>
        </a>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-32 md:pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-outfit font-extrabold mb-6 tracking-tight">PIZZATUBA</div>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              Abja-Paluoja parimad käsitöö pitsad. Oleme pühendunud kvaliteedile ja kliendi rahulolule alates esimesest rullitud tainast.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'instagram'].map(platform => (
                <div key={platform} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-pizzatuba-orange hover:border-pizzatuba-orange cursor-pointer transition-all">
                  <span className="capitalize text-xs font-bold">{platform[0]}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-outfit font-bold text-xl mb-6 text-pizzatuba-orange">Navigatsioon</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><a href="#menu" className="hover:text-white transition-colors">Menüü</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Meist</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Üritused</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-outfit font-bold text-xl mb-6 text-pizzatuba-orange">Asukoht</h4>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              {CONTACT_INFO.address}<br />
              Viljandi maakond, Eesti
            </p>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] md:text-xs text-gray-600 uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} Pizzatuba. Kõik õigused kaitstud. (v2.1)</p>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privaatsustingimused</span>
            <span className="hover:text-white cursor-pointer transition-colors">Küpsised</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState('home');

  const onNavigate = (newView: string) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  return (
    <div className="antialiased selection:bg-pizzatuba-orange/30">
      <Navbar onNavigate={onNavigate} />

      {view === 'home' ? (
        <>
          <Hero />
          <FacebookFeed />
          <EventsSection onNavigate={onNavigate} />
          <MenuSection />
          <ValueProps />

          {/* Map Section */}
          <div className="h-[400px] w-full grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 overflow-hidden border-y border-ivory-dark">
            <iframe
              title="location"
              src="https://embed.waze.com/iframe?zoom=16&lat=58.1258693&lon=25.3562308&ct=livemap"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>

          </div>

          <ContactForm />
          <StickyCTA />
        </>
      ) : (
        <EventsPage onNavigate={onNavigate} />
      )}

      <Footer />
    </div>
  );
};

export default App;
