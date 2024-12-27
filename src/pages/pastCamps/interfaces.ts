export interface ICoach {
  id: string;
  name: string;
  infos: string[];
  promo: string;
  mainImage: IImage | null;
}

export interface IGallery {
  id: string;
  name: string;
  dateString: string;
  imageCart: IImage | null;
}

export interface IImage {
  id: string;
  entityId?: string;
  name: string;
  contentType: string;
  size: number;
  typeEntity: 'COACH' | 'CAMP';
  url: string;
}

export interface ICampItem {
  id: string;
  name: string;
  info: string;
  dateStart: string;
  dateEnd: string;
  dateString: null | string;
  countAll: number;
  countFree: number;
  mainImage: null | IImage;
  imageCart: null | IImage;
}

export interface IPostCampItemList {
  id: string;
  name: string;
  dateString: null | string;
  imageCart: null | IImage;
}
