export interface IAbout {
  title: string;
  subTitleFirst: string;
  subTitleSecond: string;
  subTitleThird: string;
  activities: IActivity[];
  master: IMaster;
  reviews: IReview[];
  videos: IVideo[];
}

export interface IReview {
  name: string;
  date: string;
  comment: string;
  image: IImage;
}

export interface IMaster {
  name: string;
  infos: string[];
  image: IImage;
}

interface IVideo {
  id: string;
  name: string;
  url: string;
}

interface IImage {
  id: string;
  name: string;
  dateString: string;
  url: string;
}

export interface IActivity {
  name: string;
  images: null | IImage[];
}
