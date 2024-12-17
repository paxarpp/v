import React, { useRef, useState } from 'react';
import BasketIcon from '../../assets/basket.svg?react';
import SquareAdd from '../../assets/sqareAdd.svg?react';
import Aye from '../../assets/aye.svg?react';
import { creatorRequest, api } from '../../api';
import { Viewer } from '../modal';
import { useUser } from '../../context';
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
  const [isOpen, setOpen] = useState(false);
  const { logout } = useUser();

  const upload = (e) => {
    const imageUploader = async () => {
      const file = e.target.files?.[0];
      if (file) {
        const axiosCall = creatorRequest(logout);
        const formData = new FormData();
        formData.append('file', file);
        const { result, error } = await axiosCall<{ id: string; url: string }>(
          api.uploadImg(formData),
        );
        if (!error && result) {
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

  const view = () => {
    setOpen(true);
  };
  return (
    <div className={styles.img_col}>
      {isOpen ? (
        <Viewer close={() => setOpen(false)}>
          <img src={currentImage?.url} />
        </Viewer>
      ) : null}
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
        <span className={styles.img_wrapper}>
          <img
            src={currentImage.url}
            alt=""
            className={styles.upload_real_img}
          />
          <Aye className={styles.aye} onClick={view} />
          <BasketIcon className={styles.trash} onClick={deleteI} />
        </span>
      ) : (
        <SquareAdd className={styles.stub_img} onClick={onBtnImg} />
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
  const [openId, setOpen] = useState('');
  const { logout } = useUser();

  const upload = (e) => {
    const imageUploader = async () => {
      const file = e.target.files?.[0];
      if (file) {
        const axiosCall = creatorRequest(logout);
        const formData = new FormData();
        formData.append('file', file);
        const { result, error } = await axiosCall<{ id: string; url: string }>(
          api.uploadImg(formData),
        );
        if (!error && result) {
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

  const view = (id: string) => {
    setOpen(id);
  };
  return (
    <div className={styles.img_col}>
      {openId ? (
        <Viewer close={() => setOpen('')}>
          <img src={images?.find((image) => image.id === openId)?.url} />
        </Viewer>
      ) : null}
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

                  <span className={styles.img_wrapper}>
                    <img
                      src={image.url}
                      alt=""
                      className={styles.upload_real_img}
                    />
                    <Aye
                      className={styles.aye}
                      onClick={() => view(image.id)}
                    />
                    <BasketIcon
                      className={styles.trash}
                      onClick={() => deleteI(image.id)}
                    />
                  </span>
                </div>
              );
            })}
          </>
        ) : (
          <div className={styles.images_img_col}>
            <span className={styles.image_name}>{'Название документа'}</span>
            <SquareAdd className={styles.stub_img} onClick={onBtnImg} />
          </div>
        )}
      </div>
    </div>
  );
};
