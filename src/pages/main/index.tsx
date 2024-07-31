import { useEffect } from "react";
import { getInfo } from "../../api";

export const loaderInfo = async () => {
  const info = await getInfo();
  return { info };
}

export const Main = () => {
  useEffect(() => {
    loaderInfo();
  }, [])
  return (
    <div>

    </div>
  );
}