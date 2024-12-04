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

export interface IContactBlock {
  imageAdmin:
    | (IImage & {
        entityId: string;
      })
    | null;
  textUnderImage: string;
  linkVk: string;
  lingTg: string;
  linkInstagram: string;
  email: string;
  contacts: string;
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
