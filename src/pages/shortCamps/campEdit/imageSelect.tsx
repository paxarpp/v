import { IImage } from '../interfaces';
import BasketIcon from '../../../assets/basket.svg?react';
import styles from '../index.module.css';

export const imageSelect = ({
  label,
  onBtnImg,
  onChangeImage,
  deleteImg,
  formRef,
  imageRef,
  currentImage,
}: {
  label: string;
  onBtnImg: () => void;
  onChangeImage: (e: any) => void;
  deleteImg: () => void;
  formRef: any;
  imageRef: any;
  currentImage?: IImage | null;
}) => {
  return (
    <div className={styles.img_col}>
      <span className={styles.text_align_l}>
        <span className={styles.img_label}>{label}</span>
        <button onClick={onBtnImg} className={styles.button}>
          Выбрать файл
        </button>
      </span>
      <form ref={formRef}>
        <input
          className={styles.input_image}
          type="file"
          onChange={onChangeImage}
          ref={imageRef}
        />
      </form>
      <span className={styles.image_name}>
        {currentImage?.name || 'Название документа'}
      </span>
      {currentImage ? (
        <span className={styles.text_align_l}>
          <img
            src={currentImage.url}
            alt=""
            className={styles.upload_coach_img}
          />
          <BasketIcon onClick={deleteImg} />
        </span>
      ) : (
        <div className={styles.stub_img}>+</div>
      )}
    </div>
  );
};

export const imageesMassSelect = ({
  label,
  onBtnImg,
  onChangeImage,
  deleteImg,
  formRef,
  imageRef,
  images,
}: {
  label: string;
  onBtnImg: () => void;
  onChangeImage: (e: any) => void;
  deleteImg: (id: string) => void;
  formRef: any;
  imageRef: any;
  images?: IImage[] | null;
}) => {
  return (
    <div className={styles.img_col}>
      <span className={styles.text_align_l}>
        <span className={styles.img_label}>{label}</span>
        <button onClick={onBtnImg} className={styles.button}>
          Выбрать файл
        </button>
      </span>
      <form ref={formRef}>
        <input
          className={styles.input_image}
          type="file"
          onChange={onChangeImage}
          ref={imageRef}
        />
      </form>
      <div className={styles.images_row}>
        {images?.length ? (
          <>
            {images.map((image) => {
              return (
                <div key={image.id} className={styles.images_img_col}>
                  <span className={styles.image_name}>{image.name}</span>

                  <span className={styles.text_align_l}>
                    <img
                      src={image.url}
                      alt=""
                      className={styles.upload_coach_img}
                    />
                    <BasketIcon onClick={() => deleteImg(image.id)} />
                  </span>
                </div>
              );
            })}
          </>
        ) : (
          <div className={styles.images_img_col}>
            <span className={styles.image_name}>{'Название документа'}</span>
            <div className={styles.stub_img}>+</div>
          </div>
        )}
      </div>
    </div>
  );
};
