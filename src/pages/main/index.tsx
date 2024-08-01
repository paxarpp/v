import { getMediaAll, getCampsAll, getCoachesAll } from "../../api";
import {
  useLoaderData,
} from "react-router-dom";

interface IMedia {
  contentType: string,
  id: string,
  name: string,
  size: number,
  url: string,
}

export const loaderMedia = async () => {
  const { data: { result }} = await getMediaAll<IMedia>();
  return { medias: result };
}
export const loaderCamps = async () => {
  const { data: { result }} = await getCampsAll<unknown>();
  return { camps: result };
}
export const loaderCoaches = async () => {
  const { data: { result }} = await getCoachesAll<unknown>();
  return { coaches: result };
}


export const Main = () => {
  const { main } = useLoaderData() as { main: { medias: IMedia[], camps: unknown[], coaches: unknown[] }};

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
          </div>
        );
      })}

      {main.coaches.length ? 'тренеры:' : null}
      {main.coaches.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
}