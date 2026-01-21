import React, { useState, useEffect } from 'react';
import { useContactForm } from './src/hooks/useContactForm';

interface EventsPageProps {
    onNavigate: (view: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
    const [guests, setGuests] = useState(10);
    const [duration, setDuration] = useState(3);
    const [pizzas, setPizzas] = useState(8); // Default approx 0.8 per person
    const [drinks, setDrinks] = useState(10);
    const [hasCake, setHasCake] = useState(false);

    const estimatedCost = Math.round(
        (pizzas * 10.5) + // Avg pizza price
        (drinks * 3.5) +  // Avg drink price
        (hasCake ? 25 : 0) // Flat cake fee approximation
        // Room rent assumed free/included or strictly consumption based
    );

    const { formData, setFormData, isSubmitting, isSuccess, error, handleSubmit } = useContactForm();

    // Update message when calculator changes
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            budget: `~${estimatedCost}€`,
            message: `Soovin korraldada üritust.\nKülalisi: ${guests}\nKestvus: ${duration}h\nPizzasid: ${pizzas}\nJoogid: ${drinks}\nTort: ${hasCake ? 'Jah' : 'Ei'}`
        }));
    }, [guests, duration, pizzas, drinks, hasCake, estimatedCost, setFormData]);

    return (
        <div className="pt-24 min-h-screen bg-ivory">
            <div className="max-w-4xl mx-auto px-6 mb-12">
                <button
                    onClick={() => onNavigate('home')}
                    className="mb-8 flex items-center space-x-2 text-gray-600 hover:text-pizzatuba-orange transition-colors font-bold group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span>Tagasi avalehele</span>
                </button>

                <h1 className="text-4xl md:text-6xl font-outfit font-extrabold mb-6 text-gray-900 leading-tight">
                    Korralda meeldejääv <span className="text-pizzatuba-orange">sündmus</span>
                </h1>
                <p className="text-xl text-gray-500 mb-12 max-w-2xl">
                    Kasuta allolevat kalkulaatorit, et planeerida oma üritust ja saada kohene hinna hinnang.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Calculator Section */}
                    <div className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                            <span>🧮</span>
                            <span>Peokalkulaator</span>
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="flex justify-between font-bold text-gray-700 mb-2">
                                    <span>Külaliste arv</span>
                                    <span className="text-pizzatuba-orange">{guests}</span>
                                </label>
                                <input
                                    type="range" min="4" max="30" value={guests}
                                    onChange={(e) => {
                                        const g = parseInt(e.target.value);
                                        setGuests(g);
                                        setPizzas(Math.ceil(g * 0.8)); // Auto-adjust pizzas
                                        setDrinks(g); // Auto-adjust drinks
                                    }}
                                    className="w-full accent-pizzatuba-orange cursor-pointer"
                                />
                            </div>

                            <div>
                                <label className="flex justify-between font-bold text-gray-700 mb-2">
                                    <span>Kestvus (tundi)</span>
                                    <span className="text-pizzatuba-orange">{duration}h</span>
                                </label>
                                <input
                                    type="range" min="1" max="6" value={duration}
                                    onChange={(e) => setDuration(parseInt(e.target.value))}
                                    className="w-full accent-pizzatuba-orange cursor-pointer"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Pizzasid (tk)</label>
                                    <input
                                        type="number" min="1" value={pizzas}
                                        onChange={(e) => setPizzas(parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-pizzatuba-orange outline-none font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Joogid (tk)</label>
                                    <input
                                        type="number" min="0" value={drinks}
                                        onChange={(e) => setDrinks(parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-pizzatuba-orange outline-none font-bold"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl cursor-pointer" onClick={() => setHasCake(!hasCake)}>
                                <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${hasCake ? 'bg-pizzatuba-orange border-pizzatuba-orange text-white' : 'border-gray-300 bg-white'}`}>
                                    {hasCake && '✓'}
                                </div>
                                <span className="font-bold text-gray-700">Soovin ka torti/kringlit (+25€)</span>
                            </div>

                            <div className="pt-6 border-t border-gray-100 mt-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-500 font-medium">Hinnanguline maksumus</span>
                                    <span className="text-4xl font-outfit font-extrabold text-pizzatuba-orange">~{estimatedCost}€</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">* See on ligikaudne hind. Täpne pakkumine sõltub valitud menüüst.</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-gray-900 p-8 rounded-[32px] shadow-2xl text-white">
                        <h2 className="text-2xl font-bold mb-6">Broneeri aeg</h2>

                        {isSuccess ? (
                            <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-6 text-center">
                                <div className="text-4xl mb-4">🎉</div>
                                <h3 className="text-xl font-bold mb-2">Päring saadetud!</h3>
                                <p className="text-gray-300">Võtame sinuga ühendust esimesel võimalusel peo detailide täpsustamiseks.</p>
                                <button onClick={() => window.location.reload()} className="mt-6 text-sm underline hover:text-white">Saada uus päring</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Nimi</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/10 focus:border-pizzatuba-orange focus:bg-white/20 outline-none transition-all placeholder-white/30 text-white"
                                        placeholder="Sinu nimi"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Kontakt</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.email || formData.phone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} // Simplification: put everything in email field or split? 
                                        // Let's use the existing structure properly
                                        // Actually useContactForm has separate email/phone buttons
                                        className="hidden"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                            className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/10 focus:border-pizzatuba-orange focus:bg-white/20 outline-none transition-all placeholder-white/30 text-white"
                                            placeholder="Telefon"
                                        />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/10 focus:border-pizzatuba-orange focus:bg-white/20 outline-none transition-all placeholder-white/30 text-white"
                                            placeholder="E-mail"
                                        />
                                    </div>
                                </div>

                                <div>
                                    {/* Budget hidden input to keep it synced visually but allow manual override if needed? No, let's keep it read-only or just manual */}
                                    {/* Actually let's just show the summary in message area usually, but here we explicitly bound it to budget field in useEffect */}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Lisainfo</label>
                                    <textarea
                                        rows={3}
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/10 focus:border-pizzatuba-orange focus:bg-white/20 outline-none transition-all placeholder-white/30 text-white resize-none"
                                        placeholder="Erisoovid, kuupäev..."
                                    />
                                </div>

                                {error && <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</div>}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-pizzatuba-orange hover:bg-[#e65c00] text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Saadan...' : `Saada päring (~${estimatedCost}€)`}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
