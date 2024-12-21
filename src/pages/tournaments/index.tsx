import { loaderPageTournaments } from './loaders';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  return await loaderPageTournaments();
}

export default function Tournaments() {
  return <div>Tournaments</div>;
}
