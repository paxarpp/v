export interface ICoach {
  id: string;
  name: string;
  infos: string[];
  promo: string;
  mainImage: IImage | null;
}

export interface IPackage {
  packageId: number;
  name: string;
  costNamingLink: string;
  info: string;
  totalPrice: number;
  bookingPrice: number;
  firstPrice: number;
  firstLimitation: string;
  firstLimitationString: string;
  secondPrice: number;
  secondLimitation: string;
  secondLimitationString: string;
  thirdPrice: number;
  thirdLimitation: string;
  thirdLimitationString: string;
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
  images: null | IImage[];
  coaches: ICoach[];
  packages: IPackage[];
}
