export interface ISheduleItem {
  id: string;
  time: string;
  address: string;
}

export interface ISheduleGroup {
  id: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';
  name: string;
  days: ISheduleItem[];
}

export type IShedule = ISheduleGroup[];

export interface IPrice {
  id: string;
  name: string;
  prices: {
    id: string;
    price: number;
    title: string;
    subTitle?: string;
  }[];
}
