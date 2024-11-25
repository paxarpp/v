export interface IImage {
  id: string;
  name: string;
  contentType: string;
  size: number;
  typeEntity: 'COACH';
  url: string;
}

export interface ICoach {
  id: string;
  name: string;
  infos: string[];
  mainImage: IImage | null;
  promo: string;
}
