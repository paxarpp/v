import { Modal } from '../../../templates/modal';
import { ICoach } from '../interfaces';
import { baseSrc } from '../../../constants';
import styles from '../index.module.css';

export const CoachProfile: React.FC<{
  coach: ICoach | null;
  onClose: () => void;
}> = ({ coach, onClose }) => {
  return (
    <Modal
      isOpen={!!coach}
      close={onClose}
      header={<div className={styles.modal_header}>{'Карточка тренера'}</div>}
    >
      <div className={styles.edit_coach_modal}>
        {coach?.mainImage ? (
          <>
            <span className={styles.image_name}>{coach?.name}</span>
            <span className={styles.text_align_l}>
              <img
                src={`${baseSrc(coach.mainImage.contentType)}${coach.mainImage.data}`}
                alt=""
                className={styles.upload_coach_img}
              />
            </span>
          </>
        ) : (
          <div className={styles.stub_img} />
        )}
        <label>{'Имя и Фамилия'}</label>
        <span className={styles.input_field}>{coach?.name}</span>
        <label>{'О тренере'}</label>
        <ul>
          {coach?.infos.map((info) => {
            return <li key={info}>{info}</li>;
          })}
        </ul>
        <span className={styles.input_field}>{coach?.promo}</span>
      </div>
    </Modal>
  );
};
