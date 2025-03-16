import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import imgUrlBack from '../../../assets/program_camp.jpg';
import styles from '../index.module.css';

export const ProgramCamp = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();

  return (
    <div>
      <h2 className={styles.camp_card_title}>Программа кемпа</h2>
      <div className={styles.programs_wrap}>
        {camp?.program?.programs?.map((program) => {
          return (
            <div key={program.id} className={styles.program_card}>
              <img src={imgUrlBack} className={styles.back_card} />
              <h4 className={styles.program_header}>{program.dayOfWeek}</h4>
              <ul>
                {program.info.split(';').map((p) => {
                  return <li>{p}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
