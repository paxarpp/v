export interface ISheduleItem {
  id: string;
  time: string;
  address: string;
}

export interface ISheduleGroup {
  id: string;
  name: string;
  days: (ISheduleItem | null)[];
}

export type IShedule = ISheduleGroup[];


export interface IPrice {
  id: string;
  name: string;
  prices: {
    id: string;
    price: number;
    name: string;
    message?: string;
  }[]
}