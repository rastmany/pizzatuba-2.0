
import React, { useState, useEffect } from 'react';
import { Category, MenuItem } from './types';
import { MENU_ITEMS, CONTACT_INFO, OPENING_HOURS } from './constants';
import { useContactForm } from './src/hooks/useContactForm';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 sticky-nav-blur border-b border-ivory-dark/50 shadow-sm' : 'py-6 bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className={`text-2xl font-outfit font-extrabold tracking-tight ${scrolled ? 'text-pizzatuba-orange' : 'text-white'}`}>
          PIZZATUBA
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-semibold">
          <a href="#menu" className={`${scrolled ? 'text-gray-700 hover:text-pizzatuba-orange' : 'text-white/90 hover:text-white'}`}>Menüü</a>
          <a href="#about" className={`${scrolled ? 'text-gray-700 hover:text-pizzatuba-orange' : 'text-white/90 hover:text-white'}`}>Meist</a>
          <a href="#events" className={`${scrolled ? 'text-gray-700 hover:text-pizzatuba-orange' : 'text-white/90 hover:text-white'}`}>Üritused</a>
          <a href="#contact" className={`${scrolled ? 'text-gray-700 hover:text-pizzatuba-orange' : 'text-white/90 hover:text-white'}`}>Kontakt</a>
        </div>
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${scrolled ? 'bg-pizzatuba-orange text-white' : 'bg-white text-pizzatuba-orange shadow-lg hover:scale-105'}`}
        >
          Telli kohe
        </a>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    setIsOpen(hour >= 11 && hour < 20);
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
        <div className="flex flex-col items-start max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400' : 'bg-red-400'}`}></span>
            <span className="text-xs font-bold uppercase tracking-wider">{isOpen ? 'Nüüd avatud' : 'Suletud'}</span>
            <span className="text-xs text-white/60">| Täna: 11:00 - 20:00</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-outfit font-extrabold leading-[1.1] mb-6 tracking-tighter">
            Tere tulemast <br />
            <span className="text-pizzatuba-orange">Pizzatuppa!</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed font-medium">
            Käsitöö pitsad Abja-Paluoja südames. Ehtne kiviahju maitse ja parimad toorained otse Sinu taldrikul.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <a href="#menu" className="px-8 py-4 bg-pizzatuba-orange text-white rounded-xl font-bold text-lg text-center hover:bg-[#e65c00] transition-all transform hover:-translate-y-1 shadow-xl">
              Vaata menüüd
            </a>
            <a href="#contact" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold text-lg text-center hover:bg-white/20 transition-all">
              Broneeri laud
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
    <section id="menu" className="py-24 bg-ivory">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-outfit font-extrabold mb-4">Menüü</h2>
          <p className="text-gray-500 max-w-xl mx-auto italic">Kvaliteetsed koostisosad ja ehtne maitseelamus.</p>
        </div>

        <div className="flex justify-center mb-16 sticky top-[72px] z-40 py-4 bg-ivory/95 backdrop-blur-sm border-b border-ivory-dark md:border-none">
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
              className={`group flex items-start justify-between py-6 border-b border-ivory-dark transition-all hover:bg-ivory-dark/30 px-4 rounded-2xl -mx-4`}
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

        <div className="mt-16 text-center text-sm text-gray-400 border-t border-ivory-dark pt-8">
          <p>* Kõik hinnad sisaldavad käibemaksu.</p>
        </div>
      </div>
    </section>
  );
};

const ValueProps: React.FC = () => {
  const props = [
    { title: 'Käsitöö', desc: 'Iga pitsa põhi on rullitud käsitsi ja valmib kiviplaadil.', icon: '🍕' },
    { title: 'Kohalik Tooraine', desc: 'Kasutame nii palju kui võimalik kohalikke ja värskeid saadusi.', icon: '🌿' },
    { title: 'Hubane Atmosfäär', desc: 'Meie juures on alati soe vastuvõtt ja mugav olemine.', icon: '🏠' }
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

const EventsSection: React.FC = () => {
  return (
    <section id="events" className="py-24 bg-ivory overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-pizzatuba-orange/10 rounded-full blur-3xl -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
              alt="Events at Pizzatuba"
              className="rounded-[40px] shadow-2xl w-full object-cover aspect-[4/3]"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-outfit font-extrabold mb-6">Tähista meiega</h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Pizzatuba on ideaalne koht sünnipäevadeks, firmaüritusteks või sõpradega koosolemiseks. Mahutame mugavalt kuni 25 inimest.
            </p>
            <ul className="space-y-4 mb-10">
              {['Privaatne ruum', 'Erimenüü kokkuleppel', 'Hubane sisustus', 'Muusika võimalus'].map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-pizzatuba-orange/20 text-pizzatuba-orange flex items-center justify-center text-xs font-bold">✓</span>
                  <span className="font-semibold text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="inline-block px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg">
              Küsi pakkumist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm: React.FC = () => {
  const { formData, setFormData, isSubmitting, isSuccess, error, handleSubmit } = useContactForm();

  return (
    <section id="contact" className="py-24 bg-ivory-soft">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-ivory rounded-[48px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-ivory-dark">
          <div className="md:w-2/5 bg-pizzatuba-orange p-12 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-outfit font-bold mb-8">Võta ühendust</h2>
              <p className="text-white/80 mb-12">Soovid lauda broneerida või tellida suuremat kogust? Kirjuta või helista meile!</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">📍</div>
                  <div>
                    <div className="font-bold text-sm uppercase tracking-wider mb-1">Asukoht</div>
                    <div className="text-sm text-white/80">{CONTACT_INFO.address}</div>
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
                    : 'bg-pizzatuba-orange text-white shadow-orange-500/20 hover:bg-[#e65c00]'
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
          <p>© {new Date().getFullYear()} Pizzatuba. Kõik õigused kaitstud.</p>
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
  return (
    <div className="antialiased selection:bg-pizzatuba-orange/30">
      <Navbar />
      <Hero />
      <ValueProps />
      <MenuSection />
      <EventsSection />
      <ContactForm />

      {/* Map Section */}
      <div className="h-[400px] w-full grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 overflow-hidden border-y border-ivory-dark">
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2179.7425447101735!2d25.3562308!3d58.1258693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eb61f0084f7329%3A0xc3f8e58f00109918!2sPizzatuba!5e0!3m2!1set!2see!4v1700000000000!5m2!1set!2see"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <Footer />
      <StickyCTA />
    </div>
  );
};

export default App;
