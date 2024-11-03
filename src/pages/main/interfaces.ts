export interface IMediaBase {
  contentType: string;
  id: string;
  name: string;
  size: number;
}

export interface IMedia extends IMediaBase {
  url: string;
}

export interface IMainImg {
  contentType: string;
  id: string;
  name: string;
  size: number;
  typeEntity: ITypeEntity;
  data: string;
  url: string;
}

export type ITypeEntity = 'COACH';

export interface ICoach {
  id: string;
  name: string;
  promo: string;
  infos: string[];
  mainImage: IMainImg;
}

export interface ICoachExt extends ICoach {
  name: string;
}

export interface ICamp {
  id: string;
  name: string;
  info: string;
  price: number;
  dateStart: string;
  dateEnd: string;
  countAll: number;
  countFree: number;
  coaches: ICoach[];
}

export interface IQuestion {
  id: string;
  question: string;
  answer: string;
}
