import React, { useRef } from 'react';
import BasketIcon from '../../assets/basket.svg?react';
import { creatorRequest, logout, uploadImg } from '../../api';
import styles from './index.module.css';

export interface IImageBase {
  contentType: string;
  id: string;
  name: string;
  size: number;
  url: string;
}

interface IProps {
  label: string;
  onChangeImage: (img: IImageBase) => void;
  deleteImg: () => void;
  currentImage?: IImageBase | null;
}

interface IMassProps {
  label: string;
  onChangeImage: (img: IImageBase) => void;
  deleteImg: (id: string) => void;
  images?: IImageBase[] | null;
}

export const ImageSelect: React.FC<IProps> = ({
  label,
  onChangeImage,
  deleteImg,
  currentImage,
}) => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const upload = (e) => {
    const imageUploader = async () => {
      const file = e.target.files?.[0];
      if (file) {
        const axiosCall = creatorRequest(logout);
        const formData = new FormData();
        formData.append('file', file);
        const { result, error } = await axiosCall<{ id: string; url: string }>(
          uploadImg(formData),
        );
        if (!error) {
          onChangeImage({
            name: file.name,
            contentType: file.type,
            size: file.size,
            id: result.data.result.id,
            url: result.data.result.url,
          });
        }
      }
    };
    imageUploader();
  };

  const deleteI = () => {
    deleteImg();
    formRef.current?.reset();
  };

  const onBtnImg = () => {
    imageRef.current?.click();
  };
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
          onChange={upload}
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
          <BasketIcon onClick={deleteI} />
        </span>
      ) : (
        <div className={styles.stub_img} onClick={onBtnImg}>
          +
        </div>
      )}
    </div>
  );
};

export const ImagesMassSelect: React.FC<IMassProps> = ({
  label,
  onChangeImage,
  deleteImg,
  images,
}) => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const upload = (e) => {
    const imageUploader = async () => {
      const file = e.target.files?.[0];
      if (file) {
        const axiosCall = creatorRequest(logout);
        const formData = new FormData();
        formData.append('file', file);
        const { result, error } = await axiosCall<{ id: string; url: string }>(
          uploadImg(formData),
        );
        if (!error) {
          onChangeImage({
            name: file.name,
            contentType: file.type,
            size: file.size,
            id: result.data.result.id,
            url: result.data.result.url,
          });
        }
      }
    };
    imageUploader();
  };

  const deleteI = (id: string) => {
    deleteImg(id);
    formRef.current?.reset();
  };

  const onBtnImg = () => {
    imageRef.current?.click();
  };
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
          onChange={upload}
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
                    <BasketIcon onClick={() => deleteI(image.id)} />
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
