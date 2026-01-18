
export enum Category {
  PIZZAS = 'Pitsad',
  SPECIALS = 'Eripakkumised',
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
  ingredients?: string[];
}

export interface BusinessHours {
  day: string;
  hours: string;
  isOpen: boolean;
}
