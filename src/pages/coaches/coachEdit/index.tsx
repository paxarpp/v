import { useEffect, useState, useRef, useContext } from 'react';
import { useRevalidator } from 'react-router-dom';
import { Modal } from '../../../templates/modal';
import BasketIcon from '../../../assets/basket.svg?react';
import { getCoach, updateCoach, deleteCoach as deleteCch, creatorRequest } from '../../../api';
import { ICoach } from '../interfaces';
import styles from '../index.module.css';
import { baseSrc } from '../../../constants';
import { AuthContext } from '../../../context';

const readFile = (file): Promise<string> => {
  return new Promise((resolve) => {
    if (file.size) {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  });
};

export const CoachEdit: React.FC<{
  isOpen: boolean;
  coachId: string | null;
  onClose: () => void;
}> = ({ isOpen, coachId, onClose }) => {
  const authCtx = useContext(AuthContext);
  const [currentCoach, setCoach] = useState<ICoach | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const revalidator = useRevalidator();

  useEffect(() => {
    if (isOpen && coachId) {
      // edit
      const getC = async (id: string) => {
        const axiosCall = creatorRequest(() => authCtx.setUser!(null));
        setCoach({ id, name: '', infos: [], promo: '', mainImage: null });
        const { result } = await axiosCall<ICoach>(getCoach(id));
        if (result.data.result) {
          setCoach(result.data.result);
        }
      };
      getC(coachId);
    } else if (isOpen && !coachId) {
      // add
    }
    return () => {
      setCoach(null);
    };
  }, [isOpen, coachId]);

  const deleteImg = () => {
    setCoach((prevCoach) => ({ ...(prevCoach as ICoach), mainImage: null }));
    formRef.current?.reset();
  };

  const saveCoach = () => {
    const saveC = async () => {
      if (currentCoach) {
        const axiosCall = creatorRequest(() => authCtx.setUser!(null));
        const { error } = await axiosCall<string>(updateCoach(currentCoach));
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
        const axiosCall = creatorRequest(() => authCtx.setUser!(null));
        const { error } = await axiosCall<boolean>(deleteCch(currentCoach.id));
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    delC();
  }

  const onChangeImage = (e) => {
    const imageConverter = async () => {
      const file = e.target.files?.[0];
      if (file) {
        const base64: string = await readFile(file);
        setCoach((prevCoach) => ({
          ...(prevCoach as ICoach),
          mainImage: {
            data: base64.replace(baseSrc(file.type), ''),
            typeEntity: 'COACH' as const,
            name: file.name,
            contentType: file.type,
            size: file.size,
            id: null,
          },
        }));
      }
    };
    imageConverter();
  };

  const onBtnImg = () => {
    imageRef.current?.click();
  };

  return (
    <Modal
      isOpen={isOpen}
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
      <div className={styles.edit_coach_modal}>
        <span className={styles.text_align_l}>
          <span className={styles.img_label}>{'Фото тренера'}</span>
          <button onClick={onBtnImg} className={styles.button}>
            Выбрать файл
          </button>
        </span>
        <form ref={formRef}>
          <input className={styles.input_image} type="file" onChange={onChangeImage} ref={imageRef} />
        </form>
        {currentCoach?.mainImage ? (
          <>
            <span className={styles.image_name}>{currentCoach?.name}</span>
            <span className={styles.text_align_l}>
              <img
                src={`${baseSrc(currentCoach?.mainImage?.contentType)}${currentCoach?.mainImage?.data}`}
                alt=""
                className={styles.upload_coach_img}
              />
              <BasketIcon onClick={deleteImg} />
            </span>
          </>
        ) : (
          <div className={styles.stub_img} />
        )}
        <label>{'Имя и Фамилия'}</label>
        <input
          value={currentCoach?.name}
          onChange={(e) => {
            setCoach((prevCoach) => ({ ...(prevCoach as ICoach), name: e.target.value }));
          }}
          className={styles.input_field}
        />
        <label>{'О тренере'}</label>
        <textarea
          value={(currentCoach?.infos || []).join(';')}
          onChange={(e) => {
            setCoach((prevCoach) => ({ ...(prevCoach as ICoach), infos: e.target.value.split(';') }));
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
            setCoach((prevCoach) => ({ ...(prevCoach as ICoach), promo: e.target.value }));
          }}
        />
      </div>
    </Modal>
  );
};
