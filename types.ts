
export enum Category {
  PIZZAS = 'Pitsad',
  SPECIALS = 'Eripakkumised',
  OTHER = 'Muu menüü',
  DRINKS = 'Joogid'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  isSpecial?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  ingredients?: string[];
}

export interface BusinessHours {
  day: string;
  hours: string;
  isOpen: boolean;
}
