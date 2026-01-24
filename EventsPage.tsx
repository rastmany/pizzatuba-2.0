// Force rebuild for deployment verification v2.2
import React, { useState, useEffect } from 'react';
import { useContactForm } from './src/hooks/useContactForm';

interface EventsPageProps {
    onNavigate: (view: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
    const [guests, setGuests] = useState(10);
    const [duration, setDuration] = useState(3);
    const [eventType, setEventType] = useState('birthday');
    const [eventDate, setEventDate] = useState('');
    const [menuType, setMenuType] = useState<'standard' | 'custom'>('standard');

    // Standard Menu items
    const [pizzas, setPizzas] = useState(8);
    const [drinks, setDrinks] = useState(10);
    const [userBudget, setUserBudget] = useState<string>('');

    // Calculate Estimated Cost (only for Standard menu)
    const estimatedCost = menuType === 'standard'
        ? Math.round(
            (pizzas * 10.5) + // Avg pizza price
            (drinks * 3.5)   // Avg drink price
        )
        : null;

    const { formData, setFormData, isSubmitting, isSuccess, error, handleSubmit } = useContactForm();

    // Update form data when calculator state changes
    useEffect(() => {
        let details = `Ürituse tüüp: ${eventType}\nKuupäev: ${eventDate || 'Määramata'}\nKülalisi: ${guests}\nKestvus: ${duration}h\nMenüü: ${menuType === 'standard' ? 'Standard' : 'Erimenüü'}`;

        if (menuType === 'standard') {
            details += `\n - Pizzasid: ${pizzas}\n - Joogid: ${drinks}`;
        }

        setFormData(prev => ({
            ...prev,
            eventType,
            eventDate,
            budget: userBudget ? `${userBudget}€` : '',
            message: `Soovin korraldada üritust.\n\n${details}\n\nHinnanguline kulu: ${estimatedCost ? estimatedCost + '€' : 'Täpsustamisel'}`
        }));
    }, [guests, duration, pizzas, drinks, menuType, eventType, eventDate, userBudget, estimatedCost, setFormData]);

    return (
        <div className="pt-24 min-h-screen bg-ivory">
            <div className="max-w-6xl mx-auto px-6 mb-12">
                <button
                    onClick={() => onNavigate('home')}
                    className="mb-8 flex items-center space-x-2 text-gray-600 hover:text-pizzatuba-orange transition-colors font-bold group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span>Tagasi avalehele</span>
                </button>

                <h1 className="text-4xl md:text-6xl font-outfit font-extrabold mb-6 text-gray-900 leading-tight">
                    Korralda meeldejääv <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-600 to-red-800 animate-pulse" style={{ animationDuration: '3.5s' }}>sündmus</span>
                </h1>
                <p className="text-xl text-gray-500 mb-12 max-w-2xl">
                    Kasuta allolevat kalkulaatorit, et planeerida oma üritust ja saada kohene hinna hinnang.
                </p>

                {/* Unified Fireplace Container */}
                <div className="bg-gradient-to-br from-orange-400 via-red-600 to-red-800 rounded-[32px] shadow-2xl overflow-hidden frame-glow">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
                        {/* Glass Overlay for depth */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none"></div>

                        {/* Left Column: Calculator (Glass Style) */}
                        <div className="p-8 md:p-12 relative z-10 border-b lg:border-b-0 lg:border-r border-white/10">
                            <h2 className="text-2xl font-bold mb-8 text-white flex items-center space-x-2">
                                <span>🧮</span>
                                <span>Peokalkulaator</span>
                            </h2>

                            <div className="space-y-8">
                                {/* Event Type & Date */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-white/90 mb-2">Ürituse tüüp</label>
                                        <select
                                            value={eventType}
                                            onChange={(e) => setEventType(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-white focus:bg-white/20 outline-none font-medium appearance-none text-white cursor-pointer"
                                        >
                                            <option value="birthday" className="text-black">Sünnipäev</option>
                                            <option value="corporate" className="text-black">Firmaüritus</option>
                                            <option value="kids" className="text-black">Lastepidu</option>
                                            <option value="other" className="text-black">Muu</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-white/90 mb-2">Kuupäev</label>
                                        <input
                                            type="date"
                                            value={eventDate}
                                            onChange={(e) => setEventDate(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-white focus:bg-white/20 outline-none font-medium text-white placeholder-white/50"
                                        />
                                    </div>
                                </div>

                                {/* Guests & Duration */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="flex justify-between font-bold text-white/90 mb-2">
                                            <span>Külaliste arv</span>
                                            <span className="text-white text-lg">{guests}</span>
                                        </label>
                                        <input
                                            type="range" min="4" max="35" value={guests}
                                            onChange={(e) => {
                                                const g = parseInt(e.target.value);
                                                setGuests(g);
                                                if (menuType === 'standard') {
                                                    setPizzas(Math.ceil(g * 0.8));
                                                    setDrinks(g);
                                                }
                                            }}
                                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer accent-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex justify-between font-bold text-white/90 mb-2">
                                            <span>Kestvus (tundi)</span>
                                            <span className="text-white text-lg">{duration}h</span>
                                        </label>
                                        <input
                                            type="range" min="1" max="8" value={duration}
                                            onChange={(e) => setDuration(parseInt(e.target.value))}
                                            className="w-full h-2 bg-black/20 rounded-lg appearance-none cursor-pointer accent-white"
                                        />
                                    </div>
                                </div>

                                {/* Menu Selection */}
                                <div>
                                    <label className="block text-sm font-bold text-white/90 mb-3">Menüü valik</label>
                                    <div className="flex bg-black/20 p-1 rounded-xl mb-6">
                                        <button
                                            onClick={() => setMenuType('standard')}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${menuType === 'standard' ? 'bg-white shadow text-gray-900' : 'text-white/70 hover:text-white'}`}
                                        >
                                            Pizzatoa Menüü
                                        </button>
                                        <button
                                            onClick={() => setMenuType('custom')}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${menuType === 'custom' ? 'bg-white shadow text-gray-900' : 'text-white/70 hover:text-white'}`}
                                        >
                                            Erimenüü / Info
                                        </button>
                                    </div>

                                    {menuType === 'standard' && (
                                        <div className="space-y-4 animate-fadeIn">
                                            <div>
                                                <label className="block text-sm font-bold text-white/90 mb-2">Pitsasid (tk)</label>
                                                <div className="flex items-center space-x-4">
                                                    <input
                                                        type="number" min="0" value={pizzas}
                                                        onChange={(e) => setPizzas(parseInt(e.target.value) || 0)}
                                                        className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-white focus:bg-white/20 outline-none font-bold text-white"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-white/90 mb-2">Joogid (tk)</label>
                                                <input
                                                    type="number" min="0" value={drinks}
                                                    onChange={(e) => setDrinks(parseInt(e.target.value) || 0)}
                                                    className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-white focus:bg-white/20 outline-none font-bold text-white"
                                                />
                                            </div>
                                            <div className="pt-6 border-t border-white/10 mt-6">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-white/70 font-medium">Hinnanguline maksumus</span>
                                                    <span className="text-4xl font-outfit font-extrabold text-white">~{estimatedCost}€</span>
                                                </div>
                                                <p className="text-xs text-white/40 mt-2">* See on ligikaudne hind. Täpne pakkumine sõltub valitud menüüst.</p>
                                            </div>
                                        </div>
                                    )}

                                    {menuType === 'custom' && (
                                        <div className="p-4 bg-white/10 text-white rounded-xl border border-white/20 text-sm animate-fadeIn">
                                            <p className="font-semibold mb-1">Erimenüü</p>
                                            <p className="opacity-90">Lepime menüü ja hinnad kokku personaalselt, vastavalt sinu soovidele.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Budget Input */}
                                <div>
                                    <label className="block text-sm font-bold text-white/90 mb-2">Minu eelarve (€)</label>
                                    <input
                                        type="number"
                                        placeholder="Nt. 200"
                                        value={userBudget}
                                        onChange={(e) => setUserBudget(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-white focus:bg-white/20 outline-none font-bold placeholder-white/30 text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Booking Form (Integrated) */}
                        <div className="p-8 md:p-12 relative z-10 bg-white/5 lg:bg-transparent">
                            <h2 className="text-2xl font-bold mb-8 text-white">Broneeri aeg</h2>

                            {isSuccess ? (
                                <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-8 text-center backdrop-blur-md">
                                    <div className="text-5xl mb-6">🎉</div>
                                    <h3 className="text-2xl font-bold mb-3 text-white">Päring saadetud!</h3>
                                    <p className="text-white/80 text-lg mb-8">Võtame sinuga ühendust esimesel võimalusel.</p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="px-6 py-3 bg-white text-red-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                                    >
                                        Saada uus päring
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Nimi</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-white focus:bg-white/20 outline-none transition-all placeholder-white/30 text-white"
                                            placeholder="Sinu nimi"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Kontakt</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-white focus:bg-white/20 outline-none transition-all placeholder-white/30 text-white"
                                                placeholder="Telefon"
                                            />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-white focus:bg-white/20 outline-none transition-all placeholder-white/30 text-white"
                                                placeholder="E-mail"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Soovi korral lisa infot</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                            className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 focus:border-white focus:bg-white/20 outline-none transition-all placeholder-white/30 text-white min-h-[120px] text-sm resize-none"
                                            placeholder="Kirjuta siia..."
                                        />
                                    </div>

                                    {error && <div className="text-white text-sm bg-red-500/40 p-3 rounded-lg border border-red-500/50">{error}</div>}

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 bg-gradient-to-r from-white to-gray-100 hover:from-gray-50 hover:to-white text-red-600 rounded-xl font-bold shadow-lg shadow-black/20 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                                        >
                                            {isSubmitting ? 'Saadan...' : 'Saada päring'}
                                        </button>
                                        <p className="text-center text-white/50 text-xs mt-3 font-medium">
                                            Päringu saatmine ei ole siduv broneering.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-400 text-sm pb-12">
                v2.2 (Unified Fireplace Design)
            </div>
        </div>
    );
};
