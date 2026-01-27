import React, { useState, useEffect } from 'react';
import { useContactForm } from '../hooks/useContactForm';

export const EventCalculator: React.FC = () => {
    // 1. Event Type & Date
    const [eventType, setEventType] = useState('birthday');
    const [eventDate, setEventDate] = useState('');

    // 2. Guests & Duration
    const [guests, setGuests] = useState(10);
    const [duration, setDuration] = useState(3);

    // 3. Menu Selection
    const [menuType, setMenuType] = useState<'standard' | 'custom'>('standard');

    // Standard Menu items
    const [pizzas, setPizzas] = useState(8);
    const [drinks, setDrinks] = useState(10);
    const [hasCake, setHasCake] = useState(false);

    // 4. Financials
    const [userBudget, setUserBudget] = useState<string>('');

    // Calculate Estimated Cost (only for Standard menu)
    const estimatedCost = menuType === 'standard'
        ? Math.round(
            (pizzas * 10.5) +
            (drinks * 3.5) +
            (hasCake ? 25 : 0)
        )
        : null;

    const { formData, setFormData, isSubmitting, isSuccess, error, handleSubmit } = useContactForm();

    // Update form data when calculator state changes
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            eventType,
            eventDate,
            budget: userBudget ? `${userBudget}€` : '',
            guests,
            duration,
            pizzas,
            drinks,
            hasCake,
            menuType,
            estimatedCost: estimatedCost || undefined,
            // Keep message empty for user input - details will be sent separately
        }));
    }, [eventType, eventDate, userBudget, guests, duration, pizzas, drinks, hasCake, menuType, estimatedCost, setFormData]);

    // Helper to check budget status
    const isOverBudget = userBudget && estimatedCost && parseInt(userBudget) < estimatedCost;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full">
            {/* Calculator Section */}
            <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                    <span>🧮</span>
                    <span>Peokalkulaator</span>
                </h2>

                <div className="space-y-6">
                    {/* Event Type & Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Ürituse tüüp</label>
                            <select
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:border-pizzatuba-orange outline-none font-medium appearance-none"
                            >
                                <option value="birthday">Sünnipäev</option>
                                <option value="corporate">Firmaüritus</option>
                                <option value="kids">Lastepidu</option>
                                <option value="other">Muu</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Kuupäev</label>
                            <input
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:border-pizzatuba-orange outline-none font-medium"
                            />
                        </div>
                    </div>

                    {/* Guests & Duration */}
                    <div className="space-y-4">
                        <div>
                            <label className="flex justify-between font-bold text-gray-700 mb-2">
                                <span>Külaliste arv</span>
                                <span className="text-pizzatuba-orange">{guests}</span>
                            </label>
                            <input
                                type="range" min="4" max="45" value={guests}
                                onChange={(e) => {
                                    const g = parseInt(e.target.value);
                                    setGuests(g);
                                    if (menuType === 'standard') {
                                        setPizzas(Math.ceil(g * 0.8));
                                        setDrinks(g);
                                    }
                                }}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pizzatuba-orange"
                            />
                        </div>
                        <div>
                            <label className="flex justify-between font-bold text-gray-700 mb-2">
                                <span>Kestvus (tundi)</span>
                                <span className="text-pizzatuba-orange">{duration}h</span>
                            </label>
                            <input
                                type="range" min="1" max="8" value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pizzatuba-orange"
                            />
                        </div>
                    </div>



                    {/* Menu Selection */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Menüü valik</label>
                        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                            <button
                                onClick={() => setMenuType('standard')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${menuType === 'standard' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Pizzatoa Menüü
                            </button>
                            <button
                                onClick={() => setMenuType('custom')}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${menuType === 'custom' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Erimenüü / Info
                            </button>
                        </div>

                        {menuType === 'standard' ? (
                            <div className="space-y-4 animate-fadeIn">
                                {/* Pizza and Drink inputs removed as requested */}

                            </div>

                        ) : (
                            <div className="p-4 bg-blue-50 text-blue-800 rounded-xl border border-blue-100 text-sm animate-fadeIn">
                                <p className="font-semibold mb-1">Erimenüü</p>
                                <p>Lepime menüü ja hinnad kokku personaalselt, vastavalt sinu soovidele.</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        {/* Budget Input */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Minu eelarve (€)</label>
                            <input
                                type="number"
                                placeholder="Nt. 200"
                                value={userBudget}
                                onChange={(e) => setUserBudget(e.target.value)}
                                className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-pizzatuba-orange outline-none font-bold placeholder-gray-300"
                            />
                        </div>


                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-gray-900 p-8 rounded-[32px] shadow-2xl text-white sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Broneeri aeg</h2>

                {isSuccess ? (
                    <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-6 text-center">
                        <div className="text-4xl mb-4">🎉</div>
                        <h3 className="text-xl font-bold mb-2">Päring saadetud!</h3>
                        <p className="text-gray-300">Võtame sinuga ühendust esimesel võimalusel peo detailide täpsustamiseks.</p>
                        <button onClick={() => window.location.reload()} className="mt-6 text-sm underline hover:text-white">Saada uus päring</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        {/* Honeypot field - hidden from users, bots will fill it */}
                        <div className="absolute -left-[9999px]" aria-hidden="true">
                            <input
                                type="text"
                                name="_gotcha"
                                value={formData._gotcha || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, _gotcha: e.target.value }))}
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>

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
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Soovi korral lisa infot</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/10 focus:border-pizzatuba-orange focus:bg-white/20 outline-none transition-all placeholder-white/30 text-white min-h-[100px] text-sm resize-none"
                                placeholder="Kirjuta siia..."
                            />
                        </div>

                        {error && <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</div>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-pizzatuba-orange hover:bg-[#e65c00] text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Saadan...' : 'Saada päring'}
                        </button>
                    </form>
                )}
            </div>
        </div >
    );
};
