import { getInfo } from "../../api";

export const loaderInfo = async () => {
  const info = await getInfo();
  return { info };
}

export const Main = () => {
  return (
    <div>

    </div>
  );
}