import { useEffect, useState } from 'react';
import { useRevalidator } from 'react-router';
import { Modal } from '../../../templates/modal';
import { api, creatorRequest } from '../../../api';
import { ISheduleGroup } from '../interfaces';
import { useUser } from '../../../context';
import { weekDays } from '../sheduleTable';
import styles from '../index.module.css';

export const nameDay: Record<(typeof weekDays)['number'], string> = {
  MONDAY: 'Понедельник',
  TUESDAY: 'Вторник',
  WEDNESDAY: 'Среда',
  THURSDAY: 'Четверг',
  FRIDAY: 'Пяятница',
};

export const TreinEdit: React.FC<{
  treinId: string | null;
  onClose: () => void;
}> = ({ treinId, onClose }) => {
  const { logout } = useUser();
  const [currentTrein, setTrein] = useState<ISheduleGroup | null>(null);

  const revalidator = useRevalidator();

  useEffect(() => {
    setTrein({
      id: '',
      name: '',
      days: weekDays.map((id) => ({
        id,
        time: '',
        address: '',
      })),
    });
    if (treinId) {
      // edit
      const getT = async (id: string) => {
        const axiosCall = creatorRequest(logout);
        const { result, error } = await axiosCall<ISheduleGroup>(
          api.getShedule(id),
        );
        if (!error && result?.data) {
          setTrein({ ...result.data.result });
        }
      };
      getT(treinId);
    }
    return () => {
      setTrein(null);
    };
  }, [treinId]);

  const saveTrein = () => {
    const saveT = async () => {
      if (currentTrein) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(
          api.updateSheduleTrein({ ...currentTrein }),
        );
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    saveT();
  };

  const deleteTrein = () => {
    const delC = async () => {
      if (currentTrein?.id) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(
          api.deleteSheduleTrein(currentTrein.id),
        );
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    delC();
  };

  return (
    <Modal
      classNameModal={styles.edit_camp_modal}
      isOpen={true}
      close={onClose}
      footer={
        <div className={styles.modal_footer}>
          <button onClick={saveTrein} className={styles.button}>
            {'Сохранить'}
          </button>
          <button onClick={deleteTrein} className={styles.button}>
            {'Удалить'}
          </button>
        </div>
      }
      header={
        <div
          className={styles.modal_header}
        >{`Расписание тренировок ${currentTrein?.name || ''}`}</div>
      }
    >
      <div className={styles.edit_shedule_content}>
        <label>{'Название группы'}</label>
        <input
          value={currentTrein?.name}
          onChange={(e) => {
            setTrein((prevTrein) =>
              prevTrein
                ? {
                    ...prevTrein,
                    name: e.target.value,
                  }
                : { name: e.target.value, id: null, days: [] },
            );
          }}
          className={styles.input_field}
        />
        {weekDays.map((dayName) => {
          return (
            <div key={dayName} className={styles.day}>
              <label>{nameDay[dayName]}</label>
              <div className={styles.row_day}>
                <div className={styles.col_day}>
                  <label>{'Время тренировки'}</label>
                  <input
                    value={
                      currentTrein?.days.find((d) => d.id === dayName)?.time
                    }
                    onChange={(e) => {
                      const treinIndex =
                        currentTrein?.days.findIndex((d) => d.id === dayName) ||
                        -1;
                      setTrein((prevTrein) =>
                        prevTrein
                          ? {
                              ...prevTrein,
                              days:
                                treinIndex >= 0
                                  ? prevTrein.days.map((d) => {
                                      if (d.id === dayName) {
                                        return {
                                          ...d,
                                          time: e.target.value,
                                        };
                                      }
                                      return d;
                                    })
                                  : prevTrein.days.concat({
                                      id: dayName,
                                      time: e.target.value,
                                      address: '',
                                    }),
                            }
                          : {
                              name: '',
                              id: null,
                              days: [
                                {
                                  id: dayName,
                                  time: e.target.value,
                                  address: '',
                                },
                              ],
                            },
                      );
                    }}
                    className={styles.field_day}
                  />
                </div>
                <div className={styles.col_day}>
                  <label>{'Адрес тренировки'}</label>
                  <input
                    value={
                      currentTrein?.days.find((d) => d.id === dayName)?.address
                    }
                    onChange={(e) => {
                      const treinIndex =
                        currentTrein?.days.findIndex((d) => d.id === dayName) ||
                        -1;
                      setTrein((prevTrein) =>
                        prevTrein
                          ? {
                              ...prevTrein,
                              days:
                                treinIndex >= 0
                                  ? prevTrein.days.map((d) => {
                                      if (d.id === dayName) {
                                        return {
                                          ...d,
                                          address: e.target.value,
                                        };
                                      }
                                      return d;
                                    })
                                  : prevTrein.days.concat({
                                      id: dayName,
                                      address: e.target.value,
                                      time: '',
                                    }),
                            }
                          : {
                              name: '',
                              id: null,
                              days: [
                                {
                                  id: dayName,
                                  address: e.target.value,
                                  time: '',
                                },
                              ],
                            },
                      );
                    }}
                    className={styles.field_day}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
