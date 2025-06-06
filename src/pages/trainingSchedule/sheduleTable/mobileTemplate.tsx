import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import TGLink from '../../../assets/tgLink.svg?react';
import { createLinkTg } from '../../../constants';
import { dayIdToDisplayValue } from './const';
import styles from '../index.module.css';

export const MobileTemplate = () => {
  const { trainingShedule } =
    useLoaderData<Route.ComponentProps['loaderData']>();
  const [showGroup, setShowGroup] = useState('');

  const toggleGroup = (groupId: string) => {
    if (showGroup === groupId) {
      setShowGroup('');
    } else {
      setShowGroup(groupId);
    }
  };

  return (
    <div className={styles.container_groups_mobi}>
      {trainingShedule?.map((group) => {
        const timesToDays = {} as Record<string, string[]>;
        let timesByDay = '';
        group.days.forEach((day) => {
          const displayValue = dayIdToDisplayValue(day.id);
          if (timesToDays[day.time]) {
            timesToDays[day.time].push(displayValue);
          } else {
            timesToDays[day.time] = [displayValue];
          }
        });
        Object.entries(timesToDays).forEach(([t, days], i, arr) => {
          const isLast = i === arr.length - 1;
          timesByDay += `${days.join(', ')}: ${t}${isLast ? '' : '; '}`;
        });

        return (
          <div
            key={group.id}
            className={styles.group_mobi}
            onClick={() => toggleGroup(group.id as string)}
          >
            <div className={styles.group_name_mobi}>{group.name}</div>
            <div
              className={
                showGroup === group.id
                  ? styles.show_group_content_mobi
                  : styles.group_content_mobi
              }
            >
              <span>{timesByDay}</span>
              <br />
              <span>{group.days[0]?.address}</span>

              <a
                href={createLinkTg(group.link)}
                target={'_blank'}
                onClick={(e) => e.stopPropagation()}
              >
                <TGLink className={styles.tg_link} />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
