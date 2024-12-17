import { useEffect, useState } from 'react';
import { useRevalidator } from 'react-router';
import { Modal } from '../../../templates/modal';
import { api, pl, creatorRequest } from '../../../api';
import { ISheduleGroup } from '../interfaces';
import { useUser } from '../../../context';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../index.module.css';

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
      days: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'].map(
        (id) => ({
          id,
          time: '',
          address: '',
        }),
      ),
    });
    if (treinId) {
      // edit
      const getT = async (id: string) => {
        const axiosCall = creatorRequest(logout);
        const { result, error } = await axiosCall<ISheduleGroup>(
          pl.getSheduleTrein(id),
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
    const saveC = async () => {
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
    saveC();
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
    ></Modal>
  );
};
