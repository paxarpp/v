export interface IImage {
  id: string;
  entityId?: string;
  name: string;
  contentType: string;
  size: number;
  typeEntity: 'COACH' | 'CAMP';
  url: string;
}

interface ICamp {
  id: string;
  name: string;
  dateString: string;
  imageCart: IImage;
}

export interface IUser {
  id: string;
  email: string;
  avatar: IImage;
  birthday: string;
  fullName: string;
  telephone: string;
  pastCamps: ICamp[];
  nearestCamps: ICamp[];
}
