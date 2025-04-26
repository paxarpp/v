import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { useDeviceDetect } from '../../../hooks';
import { Control } from '../../../templates/controlArrow';
import { CampCard } from '../../../templates/CampCard';
import { CampsMobileScroller } from '../../../templates/CampMobileScroller';
import styles from '../index.module.css';

export const CampsScroller: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  return (
    <div className={isMobile ? styles.camps_wrap_mobi : styles.camps_wrap}>
      <h2 className={isMobile ? styles.camps_header_mobi : styles.camps_header}>
        Ближайшие кемпы
      </h2>
      <div
        className={
          isMobile ? styles.camps_scroller_mobi : styles.camps_scroller
        }
      >
        <CampsTemplate />
      </div>
    </div>
  );
};

const CampsTemplate = () => {
  const { home } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(2);

  const onLeft = () => {
    if (!home?.camps.length) return;
    setStartIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setLastIndex((prev) => (prev === 2 ? 2 : prev - 1));
  };

  const onRight = () => {
    if (!home?.camps.length) return;
    if (home.camps.length < 2) return;
    if (home.camps.length - lastIndex !== 1) {
      setStartIndex((prev) =>
        prev === home.camps.length - 2 ? home.camps.length - 2 : prev + 1,
      );
      setLastIndex((prev) =>
        prev === home.camps.length ? home.camps.length : prev + 1,
      );
    }
  };

  if (!home?.camps.length) return null;

  return (
    <>
      <Control
        onLeft={onLeft}
        onRight={onRight}
        show={!!home?.camps.length && !isMobile}
      />
      {isMobile ? (
        <CampsMobileScroller list={home?.camps || []} />
      ) : (
        home?.camps
          .filter((_, i) => i >= startIndex && i <= lastIndex)
          .map((item) => (
            <CampCard
              key={item.id}
              id={item.id}
              name={item.name}
              dateString={item.dateString}
              url={item.imageCart?.url}
              isMobile={isMobile}
            />
          ))
      )}
    </>
  );
};
