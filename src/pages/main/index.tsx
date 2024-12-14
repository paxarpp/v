import { Suspense } from 'react';
import { Await } from 'react-router';
import { CallMe } from '../../templates/callme';
import { BlockIcons } from './blockIcons';
import { Collapsed } from './collapsed';
import { Contacts } from './contacts';
import { CampsScroller } from './campsScroller';
import { MainImg } from './mainImg';
import { loaderPageMain } from './loaders';
import { IHome } from './interfaces';

export async function clientLoader() {
  return await loaderPageMain();
}

export default function Main({
  loaderData,
}: {
  loaderData: {
    home: IHome;
  };
}) {
  return (
    <Suspense fallback={'Загрузка...'}>
      <Await resolve={loaderData.home}>
        <div>
          <MainImg />

          <BlockIcons />

          <CampsScroller />

          <Collapsed />

          <Contacts />

          <CallMe />
        </div>
      </Await>
    </Suspense>
  );
}
