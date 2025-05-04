import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import { useDeviceDetect } from '../../../hooks';
import { IReview } from '../interfaces';
import Setting from '../../../assets/setting.svg?react';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import { Modal } from '../../../templates/modal';
import { creatorRequest } from '../../../api';
import { api } from '../../../api/api';
import { useUser } from '../../../context';
import { IImageBase, ImageSelect } from '../../../templates/imageSelect';
import { Route } from '../+types';
import { createImageUrl } from '../../../constants';
import { Control } from '../../../templates/controlArrow';
import { useSwipeable } from 'react-swipeable';
import { Dots } from '../../../templates/Dots';
import styles from '../index.module.css';

export const Reviews = () => {
  const { about } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();
  const revalidator = useRevalidator();

  const { isAdmin, logout } = useUser();
  const [reviewOpen, setReviewOpen] = useState<boolean>(false);
  const [currentReview, setReview] = useState<IReview | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(2);

  const onLeft = () => {
    if (!about?.reviews.length) return;
    setStartIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setLastIndex((prev) => (prev === 2 ? 2 : prev - 1)); //fixme
  };
  const onRight = () => {
    if (!about?.reviews.length) return;
    if (about?.reviews.length < 2) return;
    if (about?.reviews.length - lastIndex !== 1) {
      setStartIndex((prev) =>
        prev === about?.reviews.length - 2
          ? about?.reviews.length - 2
          : prev + 1,
      );
      setLastIndex((prev) =>
        prev === about?.reviews.length ? about?.reviews.length : prev + 1,
      );
    }
  };

  const onLeftM = () => {
    if (!about?.reviews.length) return;
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const onRightM = () => {
    if (!about?.reviews.length) return;
    if (currentIndex < about?.reviews.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: onRightM,
    onSwipedRight: onLeftM,
    trackMouse: true,
  });

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

        {isMobile ? (
          <div {...swipeHandlers}>
            {about?.reviews.length ? (
              <>
                <div
                  key={about?.reviews[currentIndex].id}
                  className={styles.review_card_mobi}
                >
                  <div className={styles.card_row_user}>
                    <img
                      src={createImageUrl(
                        about?.reviews[currentIndex].image?.url,
                      )}
                      alt="user"
                      className={styles.review_img_mobi}
                    />
                    <div className={styles.reviewer}>
                      <span className={styles.reviewer_t}>
                        {about?.reviews[currentIndex].name}
                      </span>
                      <span className={styles.reviewer_sub_t}>
                        {about?.reviews[currentIndex].date}
                      </span>
                    </div>
                    {isAdmin ? (
                      <Setting
                        onClick={() =>
                          openEditReview(
                            about?.reviews[currentIndex].image?.entityId,
                          )
                        }
                        className={styles.setting_review}
                      />
                    ) : null}
                  </div>
                  <div className={styles.card_row_comment_mobi}>
                    {about?.reviews[currentIndex].comment}
                  </div>
                </div>

                <Dots
                  currentIndex={currentIndex}
                  listLength={about?.reviews.length}
                  className={styles.dots_mt10}
                />
              </>
            ) : null}
          </div>
        ) : (
          <>
            <Control
              onLeft={onLeft}
              onRight={onRight}
              show={!!about?.reviews.length}
            />
            {about?.reviews
              .filter((_, i) => i >= startIndex && i <= lastIndex)
              .map((item, indx) => {
                return (
                  <div key={item.name + indx} className={styles.review_card}>
                    <div className={styles.card_row_user}>
                      <img
                        src={createImageUrl(item.image?.url)}
                        alt="user"
                        className={styles.review_img}
                      />
                      <div className={styles.reviewer}>
                        <span>{item.name}</span>
                        <span>{item.date}</span>
                      </div>
                      {isAdmin ? (
                        <Setting
                          onClick={() => openEditReview(item.image?.entityId)}
                          className={styles.setting_review}
                        />
                      ) : null}
                    </div>
                    <div className={styles.card_row_comment}>
                      {item.comment}
                    </div>
                  </div>
                );
              })}
          </>
        )}
        {isAdmin ? (
          <div className={styles.review_card_add} onClick={addReview}>
            <RoundAdd />
          </div>
        ) : null}
      </div>
    </div>
  );
};
