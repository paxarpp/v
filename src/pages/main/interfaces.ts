export interface IMediaBase {
  contentType: string,
  id: string,
  name: string,
  size: number,
}

export interface IMedia extends IMediaBase {
  url: string,
}

export interface IMainImg extends IMediaBase {
  "typeEntity": ITypeEntity,
  "data": string
  "updateAt": null | string
}

export type ITypeEntity = 'COACH';

export interface ICoach {
  "id": string,
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
  "coaches": ICoach[]
}

export interface IQuestion {
id: string,
title: string,
message: string,
}