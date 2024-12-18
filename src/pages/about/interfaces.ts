export interface IAbout {
  title: string;
  subTitleFirst: string;
  subTitleSecond: string;
  numberOfStudents: string;
  numberOfWorkouts: string;
  numberOfCamps: string;
  activities: IActivity[];
  master: IMaster | null;
  reviews: IReview[];
  videos: IVideo[] | null;
}

export interface IReview {
  name: string;
  date: string;
  comment: string;
  image: IImage | null;
}

export interface IMaster {
  name: string;
  infos: string[];
  image: IImage | null;
}

interface IVideo {
  id: string;
  name: string;
  url: string;
}

interface IImage {
  id: string;
  entityId: string | null; // в активити, в комментах
  name: string;
  url: string;
  contentType: string;
  size: number;
}

export interface IActivity {
  name: string;
  images: null | IImage[];
}
