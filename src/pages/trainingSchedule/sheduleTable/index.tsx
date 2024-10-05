import {
  useLoaderData,
} from "react-router-dom";
import { IShedule } from "../interfaces";
import { Days } from "./days";
import styles from '../index.module.css';


export const SheduleTable = () => {
  const { shedule } = useLoaderData() as {
    shedule: {
      trainingShedule: IShedule
    }
  };

  return (
    <div>
      <Days />
      {
        shedule.trainingShedule.map((group) => {
          return (
            <div key={group.id} className={styles.group}>
              <div className={styles.group_name}>
                {group.name}
              </div>
              {group.days.map((day, indx) => {
                return day ? (
                  <div key={day.id} className={styles.group_day}>
                    <span>{day.time}</span>
                    <span>{day.address}</span>
                  </div>
                ) : (
                  <div key={group.id + indx} className={styles.group_day}>
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