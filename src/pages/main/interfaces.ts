export interface IMediaBase {
  contentType: string,
  id: string,
  name: string,
  fileName: string,
  size: number,
}

export interface IMedia extends IMediaBase {
  url: string,
}

export interface IMainImg extends IMediaBase {
  "typeEntity": ITypeEntity,
  "data": string
  "updateAt": null | string,
  url: string,
}

export type ITypeEntity = 'COACH';

export interface ICoach {
  "id": string,
  "name": string,
  "surename": string,
  "infos": string[],
  "mainImage": IMainImg,
}

export interface ICoachExt extends ICoach {
  "name": string,
}

export interface ICamp {
  "id": string,
  "name": string,
  "info": string,
  "price": number,
  "dateStart": string,
  "dateEnd": string,
  "countAll": number,
  "countFree": number,
  "coaches": ICoach[],
  "images": IMedia[],
  mainImage: IMainImg,
}

export interface IQuestion {
  id: string,
  question: string,
  answer: string,
}