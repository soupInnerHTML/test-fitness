export enum ServiceCategory {
  group = 'Групповые',
  personal = 'Персональные',
  fights = 'Боевые исскусства',
  new = 'Новая категория',
  all = 'Все категории',
}

export interface Service {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  category: ServiceCategory;
}
