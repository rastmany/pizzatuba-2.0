
import { MenuItem, Category } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Regular Pizzas (€10)
  { id: '1', name: 'Margherita', description: 'Pitsakaste, burrata mozzarella, kirsstomat, basiilik, parmesan ja oliivõli', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=400&q=80', isVegan: true },
  { id: '2', name: 'Verdure', description: 'Pitsakaste, seened, paprika, punane sibul, mustad oliivid ja riivitud mozzarella', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', isVegan: true },
  { id: '3', name: 'Caprese', description: 'Pitsakaste, riivitud mozzarella, sibul, kapparid, rukola ja oliivid', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=400&q=80', isVegan: true },
  { id: '4', name: 'Cheesy', description: 'Pitsakaste, riivitud mozarella, parmesan ja burrata mozarella', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&w=400&q=80' },
  { id: '5', name: 'Sink & Juust', description: 'Pitsakaste, riivitud mozzarella, parmesan ja sink', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80' },
  { id: '6', name: 'Pepperoni', description: 'Pitsakaste, riivitud mozzarella ja ohtralt pepperoni viile', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80' },
  { id: '7', name: 'Salami', description: 'Pitsakaste, riivitud mozzarella, paprika, oliivid ja salaami', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80' },
  { id: '8', name: 'Hawaiian', description: 'Pitsakaste, riivitud mozzarella, ananass, jalapeño ja sink', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80', isSpicy: true },
  { id: '9', name: 'Peekoni', description: 'Pitsakaste, riivitud mozzarella, sibul, küüslauk, seened ja peekon', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80' },
  { id: '10', name: 'Tonno', description: 'Pitsakaste, riivitud mozarella, sibul, küüslauk ja tuunikala', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80' },
  { id: '11', name: 'Vendetta', description: 'Pitsakaste, riivitud mozzarella, sibul, kirsstomatid, paprika ja salaami', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=400&q=80' },
  { id: '12', name: 'Kananass', description: 'Pitsakaste, riivitud mozzarella, sibul, ananass, paprika ja maitsestatud kana', price: 10, category: Category.PIZZAS, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80' },

  // Special Pizzas (€12)
  { id: 's1', name: 'Little John', description: 'Pitsakaste, riivitud mozzarella, küüslauk, oliivid, kapparid, paprika, pepperoni ja salaami', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=400&q=80', isSpecial: true },
  { id: 's2', name: 'Kana ja Peekon', description: 'Pitsakaste, riivitud mozzarella, küüslauk, seened, jalapeño, peekon ja maitsestatud kana', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', isSpecial: true, isSpicy: true },
  { id: 's3', name: 'Barbara', description: 'Piimakreem, riivitud mozzarella, burrata mozzarella, parmesan, basiilik, küüslauk ja maitsestatud veisehakkliha', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=400&q=80', isSpecial: true },
  { id: 's4', name: 'Precilla', description: 'Pitsakaste, riivitud mozzarella, burrata mozzarella, parmesan, küüslauk, rukola ja prosciutto', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=400&q=80', isSpecial: true },
  { id: 's5', name: 'Half & Half', description: 'Vali kaks erinevat maitset ja saad need ühele pitsale. NB! Tonno ja eripitsad ei kuulu valikusse.', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80', isSpecial: true },
  { id: 's6', name: 'Frutti di Mare', description: 'Pitsakaste, krevetid, kammkarbid, rannakarbid, küüslauk ja riivitud mozzarella', price: 12, category: Category.SPECIALS, image: 'https://images.unsplash.com/photo-1548369937-47519962c11a?auto=format&fit=crop&w=400&q=80', isSpecial: true },

  // Other menu items
  { id: 'o1', name: 'Krõbe Kana (3 tk)', description: 'Krõbedad praekana ribad, friikartulid ja isetehtud kaste', price: 6, category: Category.OTHER, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80' },
  { id: 'o2', name: 'Krõbe Kana XL (6 tk)', description: 'Krõbedad praekana ribad, friikartulid ja isetehtud kaste', price: 12, category: Category.OTHER, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80' },
  { id: 'o3', name: 'Pitsa Taskud', description: 'Krõbe praekana, värske salat, kurk, kirsstomatid, sibul ja isetehtud kaste', price: 8, category: Category.OTHER, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80' },
  { id: 'o4', name: 'Calzone', description: 'Pitsakaste, riivitud mozarella, parmesan, basiilik ja omatehtud lihapallid', price: 8, category: Category.OTHER, image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=400&q=80' },
  { id: 'o5', name: 'Friikartulid', description: 'Friikartulid (300g) ketšupi või koduse kastmega', price: 4, category: Category.OTHER, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80' },
  { id: 'o6', name: 'Pizzatoa Kaste', description: 'Valge kaste küüslauguga / Sweet & chili kaste', price: 1, category: Category.OTHER, image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=400&q=80' },

  // Drinks
  { id: 'd1', name: 'Coca-Cola 0.5l', description: 'Karastusjook', price: 2.5, category: Category.DRINKS, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=100&q=80' },
  { id: 'd2', name: 'Vesi 0.5l', description: 'Mulliga või mullita', price: 2, category: Category.DRINKS, image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=100&q=80' },
  { id: 'd3', name: 'Kohv', description: 'Värskelt jahvatatud oad', price: 2.5, category: Category.DRINKS, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=100&q=80' },
];

export const CONTACT_INFO = {
  phone: '+372 56359465',
  address: 'Pärnu mnt 19, Abja-Paluoja, 69403 Viljandi maakond',
  email: 'info@pizzatuba.ee'
};

export const OPENING_HOURS = [
  { day: 'N', hours: '18:00 - 21:00' },
  { day: 'R-L', hours: '12:00 - 21:00' },
  { day: 'P', hours: '12:00 - 20:00' },
  { day: 'E-K', hours: 'Suletud' }
];
