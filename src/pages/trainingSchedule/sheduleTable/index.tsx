import {
  useLoaderData,
} from "react-router-dom";
import { IShedule } from "../interfaces";
import { Days } from "./days";
import { ErrorLocal } from "../../../templates/errorLocal";
import styles from '../index.module.css';


const weekDays = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY' ,
  'FRIDAY',
] as const;


export const SheduleTable = () => {
  const { shedule } = useLoaderData() as {
    shedule: {
      trainingShedule: {
        result: IShedule,
        error?: string
      },
    }
  };

  return (
    <div>
      <Days />
      {shedule.trainingShedule.error ? (<ErrorLocal error={shedule.trainingShedule.error} />) :
        shedule.trainingShedule.result.map((group) => {
          return (
            <div key={group.id} className={styles.group}>
              <div className={styles.group_name}>
                {group.name}
              </div>
              {weekDays.map((dayName) => {
                const day = group.days.find((d) => d.id === dayName);
                return day ? (
                  <div key={group.id + day.id} className={styles.group_day}>
                    <span>{day.time}</span>
                    <span>{day.address}</span>
                  </div>
                ) : (
                  <div key={group.id + dayName} className={styles.group_day}>
                    <div className={styles.empty_day} />
                  </div>
                );
              })
              }
            </div>
          );
        })
      }
    </div>
  );
};