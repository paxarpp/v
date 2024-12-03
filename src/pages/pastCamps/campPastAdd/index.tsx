import { Modal } from '../../../templates/modal';
import styles from '../index.module.css';

export const CampPastAdd: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  return (
    <Modal
      classNameModal={styles.edit_camp_modal}
      isOpen={true}
      close={onClose}
      footer={
        <div className={styles.modal_footer}>
          <button className={styles.button}>{'Сохранить'}</button>
        </div>
      }
      header={<div className={styles.modal_header}>{'Карточка кемпа'}</div>}
    ></Modal>
  );
};
