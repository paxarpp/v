import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { IAbout } from './interfaces';
import { Info } from './info';
import { Activities } from './activities';
import { Master } from './master';
import { Videos } from './videos';
import { Reviews } from './reviews';

export const About = () => {
  const { about, error } = useLoaderData() as {
    about: IAbout;
    error?: string;
  };

  return (
    <Suspense fallback={'Загрузка...'}>
      <Await resolve={about}>
        <AboutTemplate />
      </Await>
    </Suspense>
  );
};

const AboutTemplate = () => {
  return (
    <>
      <Info />

      <Activities />

      <Master />

      <Videos />

      <Reviews />
    </>
  );
};
