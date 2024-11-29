export type ITypeEntity = 'COACH' | 'CAMP';

export interface IImage {
  contentType: string;
  id: string;
  name: string;
  size: number;
  typeEntity: ITypeEntity;
  url: string;
}

export interface ICamp {
  id: string;
  name: string;
  dateString: string;
  imageCart: IImage;
}

export interface IQuestion {
  id: string;
  question: string;
  answer: string;
}
