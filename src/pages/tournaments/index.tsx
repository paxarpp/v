import { loaderPageTournaments } from './loaders';

export async function clientLoader() {
  return await loaderPageTournaments();
}

export default function Tournaments() {
  return <div>Tournaments</div>;
}
