import { CallMe } from '../../templates/callme';
import { MainImage } from './mainImage';
import { Info } from './info';
import { Coaches } from './coaches';
import { Gallery } from './gallery';
import { Route } from './+types';
import { ICampItem } from './interfaces';
import { pl } from '../../api/pageLoader';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader({ params: { id } }: Route.ClientLoaderArgs) {
  const {
    data: { result, error },
  } = await pl.getPastCamp<ICampItem>(id);
  return { camp: result, error };
}

export default function Camp() {
  return (
    <>
      <MainImage />

      <Info />

      <Coaches />

      <Gallery />

      <CallMe />
    </>
  );
}
