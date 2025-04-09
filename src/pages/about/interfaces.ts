export interface IAbout {
  title: string;
  subTitleFirst: string;
  subTitleSecond: string;
  subTitleThird: string;
  numberOfStudents: number;
  numberOfWorkouts: number;
  numberOfCamps: number;
  activities: IActivity[];
  master: IMaster | null;
  reviews: IReview[];
  gallery: IImage[] | null;
}

export interface IReview {
  name: string;
  date: string;
  comment: string;
  id: string | null;
  image: IImage | null;
}

export interface IMaster {
  name: string;
  infos: string[];
  image: IImage | null;
}

export interface IImage {
  id: string;
  entityId: string | null; // в активити, в комментах
  name: string;
  url: string;
  contentType: string;
  size: number;
}

export interface IActivity {
  id: string | null;
  name: string;
  images: null | IImage[];
}
