import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { useDeviceDetect } from '../../../hooks';
import { Control } from '../../../templates/controlArrow';
import { CampCard } from '../../../templates/CampCard';
import { CampsMobileScroller } from '../../../templates/CampMobileScroller';
import styles from '../index.module.css';

export const CampsScroller: React.FC = () => {
    const { home } = useLoaderData<Route.ComponentProps['loaderData']>();
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
        <CampsMobileScroller
          list={home?.camps || []}
          renderItem={(camp) => (
            <CampCard
              key={camp.id}
              id={camp.id}
              name={camp.name}
              dateString={camp.dateString}
              url={camp.imageCart?.url}
              isMobile={isMobile}
            />
          )}
        />
      </div>
    </div>
  );
};
