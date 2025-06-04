import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { useDeviceDetect } from '../../../hooks';
import { CampCard } from '../../../templates/CampCard';
import { CarouselTemplate } from '../../../templates/carousel';
import styles from '../index.module.css';

export const CampsScroller: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  return (
    <>
      <div className={isMobile ? styles.camps_wrap_mobi : styles.camps_wrap}>
        <h2
          className={isMobile ? styles.camps_header_mobi : styles.camps_header}
        >
          Ближайшие кемпы
        </h2>
      </div>
      <CampsTemplate />
    </>
  );
};

const CampsTemplate = () => {
  const { home } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();

  if (!home?.camps.length) return null;

  const list =
    home?.camps.map((item) => (
      <CampCard
        key={item.id}
        id={item.id}
        name={item.name}
        dateString={item.dateString}
        url={item.imageCart?.url}
        isMobile={isMobile}
      />
    )) || [];

  return <CarouselTemplate>{list}</CarouselTemplate>;
};
