import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import { useDeviceDetect } from '../../../hooks';
import { IAbout, IReview } from '../interfaces';
import ArrowLeft from '../../../assets/arrowLeft.svg?react';
import ArrowRight from '../../../assets/arrowRight.svg?react';
import Setting from '../../../assets/setting.svg?react';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import { Modal } from '../../../templates/modal';
import { creatorRequest, deleteRvw, updateReview } from '../../../api';
import { useUser } from '../../../context';
import { IImageBase, ImageSelect } from '../../../templates/imageSelect';
import styles from '../index.module.css';

export const Reviews = () => {
  const {
    about: { reviews },
  } = useLoaderData<{ about: IAbout }>();
  const { isMobile } = useDeviceDetect();

  const revalidator = useRevalidator();

  const { isAdmin, logout } = useUser();
  const [reviewOpen, setReviewOpen] = useState<boolean>(false);
  const [currentReview, setReview] = useState<IReview | null>(null);
  const [currentId, setId] = useState<string | null>(null);

  const openEditReview = (id?: string | null) => {
    if (id) {
      const review = reviews.find((r) => r.image?.entityId === id);
      if (review) {
        setId(id);
        setReview({ ...review });
        setReviewOpen(true);
      }
    }
  };
  const addReview = () => {
    setReviewOpen(true);
  };

  const onClose = () => {
    setId(null);
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
      entityId: null,
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
        const { error } = await axiosCall<string>(
          updateReview({ ...currentReview }),
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
      if (currentId) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall<boolean>(deleteRvw(currentId));
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
    if (!about.reviews.length) return;
    setStartIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setLastIndex((prev) => (prev === 2 ? 2 : prev - 1)); //fixme
  };
  const onRight = () => {
    if (!reviews.length) return;
    if (reviews.length < 2) return;
    if (reviews.length - lastIndex !== 1) {
      setStartIndex((prev) =>
        prev === reviews.length - 2 ? reviews.length - 2 : prev + 1,
      );
      setLastIndex((prev) =>
        prev === reviews.length ? reviews.length : prev + 1,
      );
    }
  };

  return (
    <div className={styles.reviews_block}>
      {reviewOpen ? (
        <Modal
          isOpen={true}
          header={<h2>{'Карточка отзыва'}</h2>}
          footer={
            <div className={styles.activity_footer}>
              <button onClick={saveActivity} className={styles.button_save}>
                {'Сохранить'}
              </button>
              {currentId ? (
                <button onClick={deleteActivity} className={styles.button_save}>
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

      <ArrowLeft className={styles.scroll_arrow_left} onClick={onLeft} />
      <ArrowRight className={styles.scroll_arrow_right} onClick={onRight} />
      {reviews
        .filter((_, i) => i >= startIndex && i <= lastIndex)
        .map((item, indx) => {
          return (
            <div key={item.name + indx} className={styles.review_card}>
              <div className={styles.card_row_user}>
                <img
                  src={item.image?.url}
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
              <div className={styles.card_row_comment}>{item.comment}</div>
            </div>
          );
        })}
      {isAdmin ? (
        <div className={styles.review_card_add} onClick={addReview}>
          <RoundAdd />
        </div>
      ) : null}
    </div>
  );
};
