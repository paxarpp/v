export interface IImage {
  id: string;
  entityId?: string;
  name: string;
  contentType: string;
  size: number;
  typeEntity: 'COACH' | 'CAMP';
  url: string;
}

export interface ICamp {
  id: string;
  name: string;
  dateString: string;
  imageCart: IImage;
}

export interface IUser {
  id: string;
  email: string;
  avatar: IImage | null;
  birthday: string;
  fullName: string;
  telephone: string;
  isAdmin: boolean;
  pastCamps: ICamp[];
  nearestCamps: ICamp[];
  users?: IUserItem[] | null;
}

export interface IUserInfo {
  id: string;
  email: string;
  telephone: string;
  fullName: string;
  birthday: string;
}

export interface IUserItem {
  id: string;
  isAdmin: boolean;
  isModerator: boolean;
  isUser: boolean;
  name: string;
  telephone: string;
}
