import { getMediaAll, getCampsAll, getCoachesAll } from "../../api";
import {
  useLoaderData,
} from "react-router-dom";
import { BlockIcons } from './blockIcons';
import styles from './index.module.css';
import { Collapsed } from "./collapsed";

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
      <div>
        <img src={'src/assets/main foto.jpg'} style={{ width: '100vw' }} />
      </div>

      <BlockIcons />

      <h2 className={styles.camps_header}>Ближайшие кемпы</h2>
      <div className={styles.camps_wrap}>
        {main.camps.map((item) => {
          return (
            <div key={item.id} className={styles.camp_card}>
              <p>{item.name}</p>
              <p>{item.dateStart}-{item.dateEnd}</p>
              <div className={styles.camp_img_wrap}>
                <img src={'/'} alt="картинка кэмпа" className={styles.camp_img} />
              </div>
              {/* <p>{item.info}</p> */}
              {/* <div className={styles.camp_coaches}>
                {item.coaches.map((item) => {

                  return (
                  <div key={item.id} className={styles.camp_coach_card}>
                    <img src={`${baseSrc}${item.mainImage.data}`}  width={'100px'} height={'100px'} />
                    <p>{item.surename}</p>
                  </div>
                );
                })}
              </div> */}
              <div className={styles.camp_info}>
                <button className={styles.button_camp}>Подробнее</button>
              </div>
            </div>
          );
        })}
      </div>

      <Collapsed />

      {main.coaches.map((item) => {
        return (
          <div key={item.id} className={styles.coach_card}>
            <p>{item.name}</p>
            <p>{item.infos.join(' ')}</p>
            <img src={`${baseSrc}${item.mainImage.data}`} width={'100px'} height={'100px'} />
          </div>
        );
      })}

      {main.medias.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.url} alt={item.name} />
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
}