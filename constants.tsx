
import { MenuItem, Category } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Regular Pizzas (€10)
  { id: '1', name: 'Margherita', description: 'Klassikaline pitsa tomati ja juustuga', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=400&q=80' },
  { id: '2', name: 'Verdure', description: 'Taimne valik värskete köögiviljadega', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
  { id: '3', name: 'Caprese', description: 'Värske tomat ja mozzarella', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=400&q=80' },
  { id: '4', name: 'Cheesy', description: 'Ekstra juustune nauding', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&w=400&q=80' },
  { id: '5', name: 'Sink & Juust', description: 'Traditsiooniline sink ja juust', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80' },
  { id: '6', name: 'Pepperoni', description: 'Vürtsikas pepperoni ja juust', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80' },
  { id: '7', name: 'Salami', description: 'Maitsekas salaami ja tomat', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80' },
  { id: '8', name: 'Hawaiian', description: 'Sink ja ananass - klassika', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80' },
  { id: '9', name: 'Peekoni', description: 'Suitsupeekon ja sibul', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80' },
  { id: '10', name: 'TONNO', description: 'Tuunikala ja oliivid', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80' },
  { id: '11', name: 'Vendetta', description: 'Terav ja mehine valik', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=400&q=80' },
  { id: '12', name: 'Kananass', description: 'Kana ja ananass', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80' },

  // Special Pizzas (€12)
  { id: 's1', name: 'Little John', description: 'Meie signatuur pitsa rohke kattega', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=400&q=80', isSpecial: true },
  { id: 's2', name: 'Kana ja Peekon', description: 'Mahlane kana ja krõbe peekon', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', isSpecial: true },
  { id: 's3', name: 'Barbara', description: 'Eriline koostis tõelistele gurmaanidele', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=400&q=80', isSpecial: true },
  { id: 's4', name: 'Italia', description: 'Ehtsad Itaalia maitsed', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=400&q=80', isSpecial: true },
  { id: 's5', name: 'Lihasõber', description: 'Sink, salaami, pepperoni, peekon', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80', isSpecial: true },
  { id: 's6', name: 'Nelja Juustu', description: 'Mozzarella, sinihallitusjuust, parmesaan, feta', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&w=400&q=80', isSpecial: true },
  { id: 's7', name: 'Terav Elamus', description: 'Tšilli, jalapeño ja vürtsikas kaste', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=400&q=80', isSpecial: true },

  // Drinks
  { id: 'd1', name: 'Coca-Cola 0.5l', description: 'Karastusjook', price: 2.5, category: Category.DRINKS, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=100&q=80' },
  { id: 'd2', name: 'Vesi 0.5l', description: 'Mulliga või mullita', price: 2, category: Category.DRINKS, image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=100&q=80' },
  { id: 'd3', name: 'Kohv', description: 'Värskelt jahvatatud oad', price: 2.5, category: Category.DRINKS, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=100&q=80' },
];

export const CONTACT_INFO = {
  phone: '+372 58260698',
  address: 'Pärnu mnt 19, Abja-Paluoja, 69403 Viljandi maakond',
  email: 'info@pizzatuba.ee'
};

export const OPENING_HOURS = [
  { day: 'N', hours: '18:00 - 21:00' },
  { day: 'R-L', hours: '12:00 - 21:00' },
  { day: 'P', hours: '12:00 - 20:00' },
  { day: 'E-K', hours: 'Suletud' }
];
