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
  url: string;
}

export interface ICoach {
  id: string;
  name: string;
  infos: string[];
  mainImage: IImage | null;
  promo: string;
  isBeach: boolean;
  isClassic: boolean;
}
