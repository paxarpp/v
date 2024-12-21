import { pl } from '../../api/pageLoader';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getTournaments();
  return { tournaments: result, error };
}

export default function Tournaments() {
  return <div>Tournaments</div>;
}
