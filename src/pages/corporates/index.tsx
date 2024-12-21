import { pl } from '../../api';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getCorporates();
  return { corporates: result, error };
}

export default function Corporates() {
  return <div>Corporates</div>;
}
