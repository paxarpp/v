import { useEffect, useState } from 'react';
import { useRevalidator } from 'react-router';
import { Modal } from '../../../templates/modal';
import { api } from '../../../api/api';
import { creatorRequest } from '../../../api';
import { ICoach } from '../interfaces';
import { useUser } from '../../../context';
import {
  IImageBase,
  ImageSelect,
  ImagesMassSelect,
} from '../../../templates/imageSelect';
import styles from '../index.module.css';

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
          images: [],
          isBeach: false,
          isClassic: false,
        });
        const { result } = await axiosCall<ICoach>(api.getCoach(id));
        if (result?.data.result) {
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
        const { error } = await axiosCall(api.updateCoach({ ...currentCoach }));
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
        const { error } = await axiosCall(api.deleteCoach(currentCoach.id));
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
        typeEntity: 'COACH' as const,
        entityId: currentCoach ? currentCoach.id : null,
        ...img,
      },
    }));
  };

  const deleteImgMass = (id: string) => {
    setCoach((prevC) => ({
      ...(prevC as ICoach),
      images: prevC?.images ? prevC.images.filter((img) => img.id !== id) : [],
    }));
  };
  const onChangeImageMass = (img: IImageBase) => {
    const newImg = {
      entityId: currentCoach ? currentCoach.id : null,
      typeEntity: 'COACH' as const,
      ...img,
    };
    setCoach((prevC) => ({
      ...(prevC as ICoach),
      images: prevC?.images ? prevC.images.concat([newImg]) : [newImg],
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
        <ImagesMassSelect
          label={'Фотографии тренера'}
          deleteImg={deleteImgMass}
          onChangeImage={onChangeImageMass}
          images={currentCoach?.images}
        />
      </div>
    </Modal>
  );
};
