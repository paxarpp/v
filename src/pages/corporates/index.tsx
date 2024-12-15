import { loaderPageCorporates } from './loaders';

export async function clientLoader() {
  return await loaderPageCorporates();
}

export default function Corporates() {
  return <div>Corporates</div>;
};
