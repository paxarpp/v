import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { useUser } from '../../../context';
import { CampEdit } from '../campEdit';
import { Route } from '../+types';
import { useDeviceDetect } from '../../../hooks';
import { CampsTemplate } from '../../../templates/CapmsTemplate';
import styles from '../index.module.css';

export const CampsList = () => {
  const { childCamps } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isAdmin } = useUser();
  const { isMobile } = useDeviceDetect();
  const [open, setIsOpen] = useState<boolean>(false);
  const [editCampId, setEditCampId] = useState<string | null>(null);

  const closeCampEdit = () => {
    setEditCampId(null);
    setIsOpen(false);
  };

  return (
    <div className={isMobile ? styles.camp_list_mobi : styles.camp_list}>
      {open ? <CampEdit campId={editCampId} onClose={closeCampEdit} /> : null}
      <CampsTemplate
        list={childCamps || []}
        isAdmin={isAdmin}
        setIsOpen={setIsOpen}
        setEditCampId={setEditCampId}
        isMobile={isMobile}
      />
    </div>
  );
};
