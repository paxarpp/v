import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import ArrowLeft from '../../../assets/arrowLeft.svg?react';
import ArrowRight from '../../../assets/arrowRight.svg?react';
import Setting from '../../../assets/setting.svg?react';
import { Route } from '../+types';
import { IImage } from '../interfaces';
import { creatorRequest } from '../../../api';
import { api } from '../../../api/api';
import { useUser } from '../../../context';
import { Modal } from '../../../templates/modal';
import { IImageBase, ImagesMassSelect } from '../../../templates/imageSelect';
import styles from '../index.module.css';

export const Gallery = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();
  const revalidator = useRevalidator();

  const { logout, isAdmin } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(2);
  const [gallery, setGallery] = useState<IImage[]>([]);

  const onLeft = () => {
    if (!camp?.gallery?.length) return;
    setStartIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setLastIndex((prev) => (prev === 2 ? 2 : prev - 1));
  };
  const onRight = () => {
    if (!camp?.gallery?.length) return;
    if (camp?.gallery.length < 2) return;
    if (camp?.gallery.length - lastIndex !== 1) {
      setStartIndex((prev) =>
        prev === (camp.gallery as IImage[]).length
          ? (camp.gallery as IImage[]).length - 2
          : prev + 1,
      );
      setLastIndex((prev) =>
        prev === (camp.gallery as IImage[]).length
          ? (camp.gallery as IImage[]).length
          : prev + 1,
      );
    }
  };

  const closeModal = () => {
    setGallery([]);
    setOpen(false);
  };

  const openModal = () => {
    setGallery(camp?.gallery ? [...camp.gallery] : []);
    setOpen(true);
  };

  const updateGallery = () => {
    if (!camp) return;
    const updG = async () => {
      const axiosCall = creatorRequest(logout);
      const { error } = await axiosCall(
        api.updateGallery({
          ...camp,
          gallery,
        }),
      );
      if (!error) {
        closeModal();
        revalidator.revalidate();
      }
    };
    updG();
  };

  const deleteImgMass = (id: string) => {
    setGallery((prevG) => prevG.filter((img) => img.id !== id));
  };
  const onChangeImageMass = (img: IImageBase) => {
    if (!camp) return;
    const newImg = {
      entityId: camp.id,
      typeEntity: 'CAMP' as const,
      ...img,
    };
    setGallery((prevG) => prevG.concat([newImg]));
  };

  return (
    <div className={styles.images_scroller}>
      {isOpen ? (
        <Modal
          isOpen={isOpen}
          close={closeModal}
          footer={
            <div className={styles.activity_footer}>
              <button onClick={updateGallery} className={styles.button}>
                {'Сохранить'}
              </button>
            </div>
          }
        >
          <div>
            <ImagesMassSelect
              label={'Фотогалерея'}
              deleteImg={deleteImgMass}
              onChangeImage={onChangeImageMass}
              images={gallery}
            />
          </div>
        </Modal>
      ) : null}
      <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} />
      <ArrowRight className={styles.scroll_arrow_right} onClick={onRight} />
      {camp?.gallery
        ?.filter((_, i) => i >= startIndex && i <= lastIndex)
        .map((image) => {
          return (
            <div key={image.id} className={styles.image_card}>
              <img
                src={image.url}
                alt={image.name}
                className={styles.coach_image}
              />
            </div>
          );
        })}
      {isAdmin ? (
        <Setting onClick={openModal} className={styles.setting} />
      ) : null}
    </div>
  );
};
