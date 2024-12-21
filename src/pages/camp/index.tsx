import { CallMe } from '../../templates/callme';
import { MainImage } from './mainImage';
import { Info } from './info';
import { Packages } from './packages';
import { Coaches } from './coaches';
import { Users } from './users';
import { Route } from './+types';
import { ICampItem } from './interfaces';
import { pl } from '../../api/pageLoader';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader({ params: { id } }: Route.ClientLoaderArgs) {
  const {
    data: { result, error },
  } = await pl.getCamp<ICampItem>(id);
  return { camp: result, error };
}

export default function Camp() {
  return (
    <>
      <MainImage />

      <Info />

      <Packages />

      <Coaches />

      <Users />

      <CallMe />
    </>
  );
}
