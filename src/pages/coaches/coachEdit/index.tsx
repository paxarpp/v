import { useEffect, useState } from 'react';
import { useRevalidator } from 'react-router-dom';
import { Modal } from '../../../templates/modal';
import {
  getCoach,
  updateCoach,
  deleteCoach as deleteCch,
  creatorRequest,
} from '../../../api';
import { ICoach } from '../interfaces';
import { useUser } from '../../../context';
import styles from '../index.module.css';
import { IImageBase, ImageSelect } from '../../../templates/imageSelect';

export const CoachEdit: React.FC<{
  open: boolean;
  coachId: string | null;
  onClose: () => void;
}> = ({ open, coachId, onClose }) => {
  const { logout } = useUser();
  const [currentCoach, setCoach] = useState<ICoach | null>(null);

  const revalidator = useRevalidator();

  useEffect(() => {
    if (coachId) {
      // edit
      const getC = async (id: string) => {
        const axiosCall = creatorRequest(logout);
        setCoach({
          id,
          name: '',
          infos: [],
          promo: '',
          mainImage: null,
          campTypes: [],
        });
        const { result } = await axiosCall<ICoach>(getCoach(id));
        if (result.data.result) {
          setCoach({ ...result.data.result });
        }
      };
      getC(coachId);
    }
    return () => {
      setCoach(null);
    };
  }, [coachId]);

  const saveCoach = () => {
    const saveC = async () => {
      if (currentCoach) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall<string>(
          updateCoach({ ...currentCoach }),
        );
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    saveC();
  };

  const deleteCoach = () => {
    const delC = async () => {
      if (currentCoach) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall<boolean>(deleteCch(currentCoach.id));
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    delC();
  };

  const deleteImg = () => {
    setCoach((prevCoach) => ({ ...(prevCoach as ICoach), mainImage: null }));
  };

  const onChangeImage = (img: IImageBase) => {
    setCoach((prevCoach) => ({
      ...(prevCoach as ICoach),
      mainImage: {
        typeEntity: 'COACH' as const, // todo typeEntity from url
        ...img,
      },
    }));
  };

  return (
    <Modal
      classNameModal={styles.edit_coach_modal}
      isOpen={open}
      close={onClose}
      footer={
        <div className={styles.modal_footer}>
          <button onClick={saveCoach} className={styles.button}>
            {'Сохранить'}
          </button>
          <button onClick={deleteCoach} className={styles.button}>
            {'Удалить карточку тренера'}
          </button>
        </div>
      }
      header={<div className={styles.modal_header}>{'Карточка тренера'}</div>}
    >
      <div className={styles.edit_coach_content}>
        <ImageSelect
          label={'Фото тренера'}
          currentImage={currentCoach?.mainImage}
          onChangeImage={onChangeImage}
          deleteImg={deleteImg}
        />
        <label>{'Имя и Фамилия'}</label>
        <input
          value={currentCoach?.name}
          onChange={(e) => {
            setCoach((prevCoach) => ({
              ...(prevCoach as ICoach),
              name: e.target.value,
            }));
          }}
          className={styles.input_field}
        />
        <label>{'О тренере'}</label>
        <textarea
          value={(currentCoach?.infos || []).join(';')}
          onChange={(e) => {
            setCoach((prevCoach) => ({
              ...(prevCoach as ICoach),
              infos: e.target.value.split(';'),
            }));
          }}
          rows={4}
          cols={5}
          className={styles.textarea_field}
        />
        <label>{'Поле профайла'}</label>
        <input
          className={styles.input_field}
          value={currentCoach?.promo}
          onChange={(e) => {
            setCoach((prevCoach) => ({
              ...(prevCoach as ICoach),
              promo: e.target.value,
            }));
          }}
        />
        <label className={styles.checkbox_field}>
          <input
            type={'checkbox'}
            checked={currentCoach?.isBeach}
            onChange={(e) => {
              setCoach((prevCoach) => ({
                ...(prevCoach as ICoach),
                isBeach: e.target.checked,
              }));
            }}
          />
          {'Пляжный'}
        </label>
        <label className={styles.checkbox_field}>
          <input
            type={'checkbox'}
            checked={currentCoach?.isClassic}
            onChange={(e) => {
              setCoach((prevCoach) => ({
                ...(prevCoach as ICoach),
                isClassic: e.target.checked,
              }));
            }}
          />
          {'Классический'}
        </label>
      </div>
    </Modal>
  );
};
