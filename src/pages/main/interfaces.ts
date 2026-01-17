export type ITypeEntity = 'COACH' | 'CAMP' | 'PAGE_HOME';

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
  imageCart: IImage | null;
}

export interface IQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface IMainBlock {
  title: string;
  subtitle: string;
  mainImage:
    | (IImage & {
        entityId: string;
      })
    | null;
}

export interface IManager {
  imageAdmin: {
      id: string | null;
      entityId: string | null;
      name: string | null;
      contentType: string | null;
      size: number | null;
      typeEntity: ITypeEntity | null;
      data: string | null;
      url: string | null;
  };
  textUnderImage: string;
  email:  string;
  contacts: string;
}

export interface IContactBlock {
  linkVk: string;
  linkTg: string;
  managers: IManager[];
}

export interface IHome {
  id: string;
  camps: ICamp[];
  coaches: unknown[];
  medias: unknown[];
  questions: IQuestion[];
  mainBlock: IMainBlock;
  contactBlock: IContactBlock;
}
