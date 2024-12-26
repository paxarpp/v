type typeEntity =
  | 'COACH'
  | 'CAMP'
  | 'USER'
  | 'CAMP_COACH'
  | 'PAGE_HOME'
  | 'MASTER'
  | 'ADMIN'
  | 'ACTIVATE'
  | 'REVIEW';

export interface IImage {
  id: string;
  name: string;
  contentType: string;
  size: number;
  typeEntity: typeEntity;
  entityId: string | null;
  url: string;
}

export interface ICoach {
  id: string;
  name: string;
  infos: string[];
  mainImage: IImage | null;
  images: IImage[];
  promo: string;
  isBeach: boolean;
  isClassic: boolean;
  isVisible: boolean;
}
