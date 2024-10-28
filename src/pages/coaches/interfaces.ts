export interface IMediaBase {
  contentType: string;
  id: string | null;
  name: string;
  size: number;
}

export type ITypeEntity = 'COACH';

export interface IMedia extends IMediaBase {
  url: string;
}

export interface IMainImg extends IMediaBase {
  typeEntity: ITypeEntity;
  data: string;
}

export interface ICoach {
  id: string;
  name: string;
  infos: string[];
  mainImage: IMainImg | null;
  promo: string;
}

export interface ICoachExt extends ICoach {
  name: string;
}
