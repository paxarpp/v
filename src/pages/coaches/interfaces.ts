export interface IMediaBase {
  contentType: string,
  id: string,
  name: string,
  size: number,
}

export type ITypeEntity = 'COACH';

export interface IMedia extends IMediaBase {
  url: string,
}

export interface IMainImg extends IMediaBase {
  "typeEntity": ITypeEntity,
  "data": string
  "updateAt": null | string
}

export interface ICoach {
  "id": string,
  "name": string,
  "infos": string[],
  "mainImage": IMainImg,
  promo: string
}

export interface ICoachExt extends ICoach {
  "name": string,
}