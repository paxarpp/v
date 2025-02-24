import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { CallMe } from '../../templates/callme';
import { BlockIcons } from './blockIcons';
import { Collapsed } from './collapsed';
import { Contacts } from './contacts';
import { CampsScroller } from './campsScroller';
import { MainImg } from './mainImg';
import { pl } from '../../api/pageLoader';
import { IHome } from './interfaces';

// eslint-disable-next-line react-refresh/only-export-components
export async function clientLoader() {
  const {
    data: { result, error },
  } = await pl.getHome<IHome>();
  return { home: result, error };
}

export default function Main() {
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
      <MainImg />

      <BlockIcons />

      <CampsScroller />

      <Collapsed />

      <Contacts />

      <CallMe />
    </>
  );
}
