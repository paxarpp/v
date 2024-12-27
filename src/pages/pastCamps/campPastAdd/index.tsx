import { useEffect, useState } from 'react';
import { Modal } from '../../../templates/modal';
import styles from '../index.module.css';
import { ICampItem } from '../interfaces';
import { pl } from '../../../api/pageLoader';
import { useRevalidator } from 'react-router';
import { creatorRequest } from '../../../api';
import { useUser } from '../../../context';
import { api } from '../../../api/api';

export const CampPastAdd: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { logout } = useUser();
  const [campsAll, setCamps] = useState<ICampItem[]>([]);
  const [selectedCamps, setSelectedCamps] = useState<string[]>([]);

  const revalidator = useRevalidator();

  useEffect(() => {
    const getCampsPastAll = async () => {
      setCamps([]);
      const { data } = await pl.getCampsAll<ICampItem>();
      if (data?.result) {
        setCamps([...data.result]);
      }
    };
    getCampsPastAll();
  }, []);

  const onChangePastCamp = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedCamps.includes(selectedId)) {
      setSelectedCamps(selectedCamps.filter((id) => id !== selectedId));
    } else {
      setSelectedCamps([...selectedCamps, selectedId]);
    }
  };

  const addPastCamps = () => {
    const saveC = async () => {
      if (selectedCamps.length) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(api.addCampPast(selectedCamps));
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    saveC();
  };

  return (
    <Modal
      classNameModal={styles.add_camp_modal}
      isOpen={true}
      close={onClose}
      footer={
        <div className={styles.modal_footer}>
          <button className={styles.button} onClick={addPastCamps}>
            {'Сохранить'}
          </button>
        </div>
      }
      header={<div className={styles.modal_header}>{'Прошедшие кэмпы'}</div>}
    >
      <div className={styles.add_camp_content}>
        <label>{'Прошедшие кэмпы'}</label>
        <select
          value={0}
          onChange={onChangePastCamp}
          className={styles.input_field}
        >
          <option value={0}>{'Кэмп'}</option>
          {campsAll.map((camp) => {
            return (
              <option
                value={camp.id}
                key={camp.id}
                className={
                  selectedCamps.includes(camp.id) ? styles.selected_camp : ''
                }
              >{`${camp.dateString} ${camp.name}`}</option>
            );
          })}
        </select>
      </div>
    </Modal>
  );
};
