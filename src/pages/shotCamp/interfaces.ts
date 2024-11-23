interface ICoach {
  id: string;
  name: string;
  infos: string[];
  promo: string;
  mainImage: {
    id: string;
    name: string;
    contentType: string;
    size: number;
    typeEntity: 'COACH';
    data: string[];
    url: string;
  };
}

export interface IShortCamp {
  id: string;
  name: string;
  info: string;
  dateStart: string;
  dateEnd: string;
  countAll: number;
  countFree: number;
  coaches: ICoach[];
  packages: [
    {
      packageId: string;
      name: string;
      costNamingLink: string;
      info: string;
      totalPrice: number;
      bookingPrice: number;
      firstPrice: number;
      firstLimitation: string;
      secondPrice: number;
      secondLimitation: string;
      thirdPrice: number;
      thirdLimitation: string;
    },
  ];
}
