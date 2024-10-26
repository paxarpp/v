import { useEffect, useState } from "react";
import { Modal } from "../../../templates/modal";
import BasketIcon from '../../../assets/basket.svg?react';
import { getQuestion } from "../../../api";
import { IQuestion } from "../../main/interfaces";
import styles from '../index.module.css';


export const CoachEdit: React.FC<{
  isOpen: boolean;
  coachId: string | null;
  onClose: () => void;
}> = ({ isOpen, coachId, onClose }) => {

  useEffect(() => {
    if (isOpen && coachId) {
      // edit
      const getQ = async (id: string) => {
        // setLoading(true);
        // setQuestion({ id, answer: '', question: '' });
        const { question, error } = await getQuestion<IQuestion>(id);
        // if (!error) {
        //   setQuestion(question);
        // }
        // setLoading(false);
        // setError(error);
      }
      getQ(coachId);
    } else if (isOpen && !coachId) {
      // add
    }
  }, [isOpen, coachId]);

  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState("");

  const useDisplayImage = () => {
    const uploader = (e) => {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        setResult(event.target.result as string);
      });
      reader.readAsDataURL(imageFile);
    }
    return { uploader };
  }

  const { uploader } = useDisplayImage();

  const deleteImg = () => {
    setImage(null);
    setResult("");
  }

  return (
    <Modal
      isOpen={isOpen}
      title={"Карточка тренера"}
      close={onClose}
      footer={
        <div>
          <button>{'Сохранить'}</button>
        </div>
      }
    >
      <div className={styles.edit_coach_modal}>
        <label>{'Фото тренера'}</label>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files?.[0] || null);
            uploader(e);
          }}
        />
       {result ? (
          <>
            <img src={result} alt="" className={styles.upload_coach_img} />
            <BasketIcon onClick={deleteImg} />
          </>
        ) : null}
        <label>{'Имя и Фамилия'}</label>
        <input />
        <label>{'О тренере'}</label>
        <textarea />
        <label>{'Поле профайла'}</label>
        <input />  
      </div>
    </Modal>
  );
}