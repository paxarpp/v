import { getMediaAll, getCampsAll, getCoachesAll } from "../../api";
import {
  useLoaderData,
} from "react-router-dom";

interface IMediaBase {
  contentType: string,
  id: string,
  name: string,
  size: number,
}

interface IMedia extends IMediaBase {
  url: string,
}

interface IMainImg extends IMediaBase {
  "typeEntity": ITypeEntity,
  "data": string
  "updateAt": null | string
}

type ITypeEntity = 'COACH';

interface ICoach {
  "id": string,
  "surename": string,
  "infos": string[],
  "mainImage": IMainImg,
}

interface ICoachExt extends ICoach {
  "name": string,
}

interface ICamp {
          "id": string,
          "name": string,
          "info": string,
          "price": number,
          "dateStart": string,
          "dateEnd": string,
          "countAll": number,
          "countFree": number,
          "coaches": ICoach[]
}

export const loaderMedia = async () => {
  const { data: { result }} = await getMediaAll<IMedia>();
  return { medias: result };
}
export const loaderCamps = async () => {
  const { data: { result }} = await getCampsAll<ICamp>();
  return { camps: result };
}
export const loaderCoaches = async () => {
  const { data: { result }} = await getCoachesAll<ICoachExt>();
  return { coaches: result };
}

const baseSrc = 'data:image/jpeg;base64,';

export const Main = () => {
  const { main } = useLoaderData() as { main: { medias: IMedia[], camps: ICamp[], coaches: ICoachExt[] }};


  return (
    <div>
      {main.medias.length ? 'медиа:' : null}
      {main.medias.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.url} alt={item.name} />
            <p>{item.name}</p>
          </div>
        );
      })}

      {main.camps.length ? 'лагеря:' : null}
      {main.camps.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.info}</p>
            {item.coaches.map((item) => {

              return (
               <div key={item.id}>
                 <img src={`${baseSrc}${item.mainImage.data}`}  width={'100px'} height={'100px'} />
                 <p>{item.surename}</p>
               </div>
             );
})}
          </div>
        );
      })}

      {main.coaches.length ? 'тренеры:' : null}
      {main.coaches.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.infos.join(' ')}</p>
            <img src={`${baseSrc}${item.mainImage.data}`} width={'100px'} height={'100px'} />
          </div>
        );
      })}
    </div>
  );
}