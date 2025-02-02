import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Info } from './info';
import { Activities } from './activities';
import { Master } from './master';
import { Videos } from './videos';
import { Reviews } from './reviews';
import { pl } from '../../api/pageLoader';
import { IAbout } from './interfaces';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getAbout<IAbout>();
  return { about: result, error };
}

export default function About() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);
  return (
    <>
      <Info />

      <Activities />

      <Master />

      <Videos />

      <Reviews />
    </>
  );
}
