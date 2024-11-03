import React from 'react';
import { Footer } from '../../templates/footer';
import { CoachesList } from './coachesList';
import styles from './index.module.css';

export const Coaches: React.FC = () => {
  return (
    <div>
      <h1 className={styles.title}>
        Тренерский состав в школе волейбола Magic Volley
      </h1>

      <CoachesList />

      <Footer />
    </div>
  );
};
