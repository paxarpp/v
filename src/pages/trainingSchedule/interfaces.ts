export interface ISheduleItem {
  id: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';
  time: string;
  address: string;
}

export interface ISheduleGroup {
  id: string | null;
  name: string;
  days: ISheduleItem[];
  link: string;
}

export type IShedule = ISheduleGroup[];

export interface IPrice {
  id: string | null;
  name: string;
  prices: {
    id: string;
    price: number;
    title: string;
    subTitle?: string;
  }[];
}
