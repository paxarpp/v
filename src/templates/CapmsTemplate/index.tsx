import RoundAdd from '../../assets/roundAdd.svg?react';
import { CampsMobileScroller } from '../../templates/CampMobileScroller';
import styles from './index.module.css';

export const CampsTemplate: React.FC<{
  list: {
    id: string;
    name: string;
    dateString: string;
    imageCart?: { url: string } | null;
  }[];
  isAdmin: boolean;
  isMobile: boolean;
  setIsOpen: (open: boolean) => void;
  setEditCampId: (id: string) => void;
  to?: string;
}> = ({ list, isAdmin, setIsOpen, setEditCampId, isMobile, to }) => {

  const openEditCamp = (id: string) => {
    setEditCampId(id);
    setIsOpen(true);
  };

  const addCamp = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div
        className={
          isMobile ? styles.camps_scroller_mobi : styles.camps_scroller
        }
      >
        <CampsMobileScroller
          list={list}
          isMobile={isMobile}
          isAdmin={isAdmin}
          openEditCamp={openEditCamp}
          to={to}
        />
      </div>
      {isAdmin ? (
        <div className={styles.camp_card_add}>
          <RoundAdd onClick={addCamp} />
        </div>
      ) : null}
    </>
  );
};
