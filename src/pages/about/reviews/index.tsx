import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import { useDeviceDetect } from '../../../hooks';
import { IReview } from '../interfaces';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import { Modal } from '../../../templates/modal';
import { creatorRequest } from '../../../api';
import { api } from '../../../api/api';
import { useUser } from '../../../context';
import { IImageBase, ImageSelect } from '../../../templates/imageSelect';
import { Route } from '../+types';
import { ReviewScroller } from './reviewSroller';
import styles from '../index.module.css';

export const Reviews = () => {
  const { about } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();
  const revalidator = useRevalidator();

  const { isAdmin, logout } = useUser();
  const [reviewOpen, setReviewOpen] = useState<boolean>(false);
  const [currentReview, setReview] = useState<IReview | null>(null);

  const openEditReview = (id?: string | null) => {
    if (id) {
      const review = about?.reviews.find((r) => r.id === id);
      if (review) {
        setReview({ ...review });
        setReviewOpen(true);
      }
    }
  };
  const addReview = () => {
    setReview({ id: null, name: '', date: '', comment: '', image: null });
    setReviewOpen(true);
  };

  const onClose = () => {
    setReview(null);
    setReviewOpen(false);
  };

  const deleteImg = () => {
    setReview((prevR) => ({
      ...(prevR as IReview),
      image: null,
    }));
  };
  const onChangeImage = (img: IImageBase) => {
    const newImg = {
      entityId: currentReview ? currentReview.id : null,
      ...img,
    };
    setReview((prevR) => ({
      ...(prevR as IReview),
      image: newImg,
    }));
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview((prevR) => ({ ...prevR, name: e.target.value }) as IReview);
  };
  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview((prevR) => ({ ...prevR, date: e.target.value }) as IReview);
  };
  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview((prevR) => ({ ...prevR, comment: e.target.value }) as IReview);
  };

  const saveActivity = () => {
    const saveA = async () => {
      if (currentReview) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(
          api.updateReview({ ...currentReview }),
        );
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    saveA();
  };

  const deleteActivity = () => {
    const delC = async () => {
      if (currentReview?.id) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(api.deleteRvw(currentReview?.id));
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    delC();
  };

  return (
    <div
      className={isMobile ? styles.review_wrapper_mobi : styles.review_wrapper}
    >
      <div
        className={isMobile ? styles.reviews_block_mobi : styles.reviews_block}
        id="reviews"
      >
        {reviewOpen ? (
          <Modal
            isOpen={true}
            header={<h2>{'Карточка отзыва'}</h2>}
            footer={
              <div className={styles.activity_footer}>
                <button onClick={saveActivity} className={styles.button_save}>
                  {'Сохранить'}
                </button>
                {currentReview?.id ? (
                  <button
                    onClick={deleteActivity}
                    className={styles.button_save}
                  >
                    {'Удалить'}
                  </button>
                ) : null}
              </div>
            }
            close={onClose}
          >
            <div className={styles.review_modal_content}>
              <div className={styles.row}>
                <div className={styles.col}>
                  <label>{'Автор отзыва'}</label>
                  <input value={currentReview?.name} onChange={onChangeName} />
                </div>
                <div className={styles.col}>
                  <label>{'Дата отзыва'}</label>
                  <input
                    type={'date'}
                    value={currentReview?.date}
                    onChange={onChangeDate}
                  />
                </div>
              </div>
              <ImageSelect
                label={'Фотография автора'}
                deleteImg={deleteImg}
                onChangeImage={onChangeImage}
                currentImage={currentReview?.image}
              />
              <label>{'Комментарий'}</label>
              <textarea
                value={currentReview?.comment}
                onChange={onChangeComment}
                className={styles.textarea_field}
              />
            </div>
          </Modal>
        ) : null}

        <ReviewScroller
          list={about?.reviews || []}
          openEditReview={openEditReview}
          isAdmin={isAdmin}
          isMobile={isMobile}
        />

        {isAdmin ? (
          <div className={styles.review_card_add} onClick={addReview}>
            <RoundAdd />
          </div>
        ) : null}
      </div>
    </div>
  );
};
