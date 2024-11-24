import { Suspense } from 'react';
import { Await, useAsyncValue, useLoaderData } from 'react-router-dom';
import { ICampItem } from '../shotCamps/interfaces';
import { CallMe } from '../../templates/callme';
import { MainImage } from './mainImage';
import { Info } from './info';
import styles from './index.module.css';
import { Packages } from './packages';
import { Coaches } from './coaches';

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
    <div className={styles.camp}>
      <MainImage />

      <Info />

      <Packages />

      <Coaches />

      <CallMe />
    </div>
  );
};