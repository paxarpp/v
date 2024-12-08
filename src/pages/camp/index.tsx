import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { ICampItem } from './interfaces';
import { CallMe } from '../../templates/callme';
import { MainImage } from './mainImage';
import { Info } from './info';
import { Packages } from './packages';
import { Coaches } from './coaches';
import { Users } from './users';

export const Camp = () => {
  const { camp, error } = useLoaderData() as {
    camp: ICampItem[];
    error?: string;
  };

  return (
    <Suspense fallback={'Загрузка...'}>
      <Await resolve={camp}>
        <CampTemplate />
      </Await>
    </Suspense>
  );
};

const CampTemplate = () => {
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
};
