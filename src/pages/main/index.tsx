import { getMediaAll } from "../../api";
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
  const all = await getMediaAll<IMedia>();
  return { all };
}


export const Main = () => {
  const { all } = useLoaderData() as { all: { data: { result: IMedia[] }}};

  return (
    <div>
      {all.data.result.map((item) => {
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