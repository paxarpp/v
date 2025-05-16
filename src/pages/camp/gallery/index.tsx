import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import Setting from '../../../assets/setting.svg?react';
import { Route } from '../+types';
import { IImage } from '../interfaces';
import { creatorRequest } from '../../../api';
import { api } from '../../../api/api';
import { useUser } from '../../../context';
import { Modal } from '../../../templates/modal';
import { IImageBase, ImagesMassSelect } from '../../../templates/imageSelect';
import { createImageUrl } from '../../../constants';
import { Control } from '../../../templates/controlArrow';
import { ImagesMobileScroller } from '../../../templates/ImagesMobileScroller';
import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';

export const Gallery = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();
  const revalidator = useRevalidator();

  const [count, setCount] = useState(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef.current?.clientWidth && cardRef.current?.clientWidth) {
      const calcCount = Math.floor(
        divRef.current.clientWidth / cardRef.current.clientWidth,
      );
      setCount(calcCount);
    }
  }, [divRef.current?.clientWidth, cardRef.current?.clientWidth]);

  const { logout, isAdmin } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [gallery, setGallery] = useState<IImage[]>([]);

  const onLeft = () => {
    if (!camp?.gallery?.length) return;
    if (startIndex === 0) return;
    setStartIndex(startIndex - 1);
  };

  const onRight = () => {
    if (!camp?.gallery?.length) return;
    if (camp?.gallery.length < count) return;
    if (startIndex + count === camp.gallery.length) return;
    setStartIndex(startIndex + 1);
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
    <>
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
      {isMobile ? (
        <div className={styles.images_scroller_mobi}>
          <ImagesMobileScroller list={camp?.gallery || []} />
        </div>
      ) : (
        <div className={styles.images_scroller} ref={divRef}>
          <Control
            onLeft={onLeft}
            onRight={onRight}
            show={!!camp?.gallery?.length}
          />
          {camp?.gallery
            ?.filter((_, i) => i >= startIndex && i <= startIndex + count)
            .map((image) => {
              return (
                <div key={image.id} className={styles.image_card} ref={cardRef}>
                  <img
                    src={createImageUrl(image.url)}
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
      )}
    </>
  );
};
