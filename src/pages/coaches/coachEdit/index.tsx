import { useEffect, useState } from "react";
import { Modal } from "../../../templates/modal";
import BasketIcon from '../../../assets/basket.svg?react';
import { getCoach, updateCoach } from "../../../api";
import { ICoach } from "../interfaces";
import styles from '../index.module.css';

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
}


export const CoachEdit: React.FC<{
  isOpen: boolean;
  coachId: string | null;
  onClose: () => void;
}> = ({ isOpen, coachId, onClose }) => {

  const [currentCoach, setCoach] = useState<ICoach | null>(null);

  useEffect(() => {
    if (isOpen && coachId) {
      // edit
      const getC = async (id: string) => {
        // setLoading(true);
        setCoach({ id, name: '', infos: '', promo: '', mainImage: null });
        const resp: { data?: {
          result: ICoach
        }} = await getCoach<ICoach>(id);
        if (resp.data) {
          setCoach(resp.data.result);
        }
        // setLoading(false);
        // setError(error);
      }
      getC(coachId);
    } else if (isOpen && !coachId) {
      // add
    }
  }, [isOpen, coachId]);

  const deleteImg = () => {
    setCoach((prevCoach) => ({ ...(prevCoach as ICoach), mainImage: null }));
  }

  const saveCoach= () => {
    const saveC = async () => {
      if (currentCoach) {
        const { result, error } = await updateCoach<string>(currentCoach);
        if (!error) {
          onClose();

        }
      }
    }
    saveC();
  }

  return (
    <Modal
      isOpen={isOpen}
      title={"Карточка тренера"}
      close={onClose}
      footer={
        <div>
          <button onClick={saveCoach}>{'Сохранить'}</button>
        </div>
      }
    >
      <div className={styles.edit_coach_modal}>
        <label>{'Фото тренера'}</label>
        <input
          type="file"
          onChange={(e) => {
            const imageConverter = async () => {
              const file = e.target.files?.[0];
              if (file) {
                const base64: string = await readFile(file);
                setCoach((prevCoach) => ({ ...(prevCoach as ICoach), mainImage: {
                  data: base64,
                  typeEntity: 'COACH' as const,
                  updateAt: file.lastModified.toString(),
                  name: file.name,
                  contentType: file.type,
                  size: file.size,
                  id: null,
                } }));
              }
            }
            imageConverter();
          }}
        />
       {currentCoach?.mainImage ? (
          <>
            <img src={currentCoach?.mainImage?.data} alt="" className={styles.upload_coach_img} />
            <BasketIcon onClick={deleteImg} />
          </>
        ) : null}
        <label>{'Имя и Фамилия'}</label>
        <input value={currentCoach?.name} onChange={(e) => {
          setCoach((prevCoach) => ({ ...(prevCoach as ICoach), name: e.target.value }));
        }} />
        <label>{'О тренере'}</label>
        <textarea  value={currentCoach?.infos} onChange={(e) => {
          setCoach((prevCoach) => ({ ...(prevCoach as ICoach), infos: e.target.value }));
        }} />
        <label>{'Поле профайла'}</label>
        <input value={currentCoach?.promo} onChange={(e) => {
          setCoach((prevCoach) => ({ ...(prevCoach as ICoach), promo: e.target.value }));
        }}  />  
      </div>
    </Modal>
  );
}