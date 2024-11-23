import { useEffect, useState, useRef } from 'react';
import { useRevalidator } from 'react-router-dom';
import { Modal } from '../../../templates/modal';
import BasketIcon from '../../../assets/basket.svg?react';
import {
  getCamp,
  getPackages,
  updateCamp,
  deleteCamp as deleteCmp,
  creatorRequest,
} from '../../../api';
import { ICampItem, ICoach, IPackage } from '../interfaces';
import { baseSrc } from '../../../constants';
import { useUser } from '../../../context';
import styles from '../index.module.css';

const readFile = (file): Promise<string> => {
  return new Promise((resolve) => {
    if (file.size) {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  });
};

const imageSelect = ({
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
  currentImage: any;
}) => {
  return (
    <>
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
      {currentImage ? (
        <>
          <span className={styles.image_name}>{currentImage.name}</span>
          <span className={styles.text_align_l}>
            <img
              src={`${baseSrc(currentImage.contentType)}${currentImage.data}`}
              alt=""
              className={styles.upload_coach_img}
            />
            <BasketIcon onClick={deleteImg} />
          </span>
        </>
      ) : (
        <div className={styles.stub_img}>+</div>
      )}
    </>
  );
};

export const CampEdit: React.FC<{
  open: boolean;
  campId: string | null;
  onClose: () => void;
}> = ({ open, campId, onClose }) => {
  const { logout } = useUser();
  const [currentCamp, setCamp] = useState<ICampItem | null>(null);
  const [packs, setPacks] = useState<IPackage[]>([]);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const imageRef2 = useRef<HTMLInputElement | null>(null);
  const formRef2 = useRef<HTMLFormElement | null>(null);

  const revalidator = useRevalidator();

  useEffect(() => {
    const getPacks = async () => {
      const axiosCall = creatorRequest(logout);
      setPacks([]);
      const { result } = await axiosCall<IPackage>(getPackages());
      if (result.data.result) {
        setPacks([...result.data.result]);
      }
    };
    if (campId) {
      // edit
      const getC = async (id: string) => {
        const axiosCall = creatorRequest(logout);
        setCamp({
          id,
          name: '',
          info: '',
          dateStart: '',
          dateEnd: '',
          dateString: '',
          countAll: 0,
          countFree: 0,
          mainImage: null,
          imageCart: null,
          images: null,
          coaches: [] as ICoach[],
          packages: [] as IPackage[],
        });
        const { result } = await axiosCall<ICampItem>(getCamp(id));
        if (result.data.result) {
          setCamp({ ...result.data.result });
        }
      };
      getC(campId);
    }
    getPacks();
    return () => {
      setCamp(null);
    };
  }, [campId]);

  const deleteImg = () => {
    // setCamp((prevCamp) => ({ ...(prevCamp as ICampItem), mainImage: null }));
    // formRef.current?.reset();
  };

  const saveCamp = () => {
    const saveC = async () => {
      if (currentCamp) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall<string>(
          updateCamp({ ...currentCamp }),
        );
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    saveC();
  };

  const deleteCamp = () => {
    const delC = async () => {
      if (currentCamp) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall<boolean>(deleteCmp(currentCamp.id));
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    delC();
  };

  const onChangeImage = (e) => {
    const imageConverter = async () => {
      const file = e.target.files?.[0];
      if (file) {
        const base64: string = await readFile(file);
        // setCamp((prevCamp) => ({
        //   ...(prevCamp as ICampItem),
        //   mainImage: {
        //     data: base64.replace(baseSrc(file.type), ''),
        //     typeEntity: 'COACH' as const,
        //     name: file.name,
        //     contentType: file.type,
        //     size: file.size,
        //     id: null,
        //   },
        // }));
      }
    };
    imageConverter();
  };

  const onBtnImg = () => {
    imageRef.current?.click();
  };

  return (
    <Modal
      classNameModal={styles.edit_camp_modal}
      isOpen={open}
      close={onClose}
      footer={
        <div className={styles.modal_footer}>
          <button onClick={saveCamp} className={styles.button}>
            {'Сохранить'}
          </button>
          <button onClick={deleteCamp} className={styles.button}>
            {'Удалить карточку кемпа'}
          </button>
        </div>
      }
      header={<div className={styles.modal_header}>{'Карточка кемпа'}</div>}
    >
      <div className={styles.edit_camp_content}>
        <div>
          {imageSelect({
            label: 'Главная фотография карточки',
            deleteImg,
            onBtnImg,
            onChangeImage,
            formRef,
            imageRef,
            currentImage: currentCamp?.mainImage,
          })}
          {imageSelect({
            label: 'Главная фотография страницы кемпа',
            deleteImg,
            onBtnImg,
            onChangeImage,
            formRef: formRef2,
            imageRef: imageRef2,
            currentImage: currentCamp?.mainImage,
          })}
        </div>
        <label>{'Место проведения'}</label>
        <input
          value={currentCamp?.name}
          onChange={(e) => {
            setCamp((prevCamp) => ({
              ...(prevCamp as ICampItem),
              name: e.target.value,
            }));
          }}
          className={styles.input_field}
        />
        <label>{'Дата проведения'}</label>
        <input type={'date'} />
        <label>{'О месте проведения'}</label>
        <textarea
          value={currentCamp?.info}
          // onChange={(e) => {
          //   setCoach((prevCoach) => ({
          //     ...(prevCoach as ICoach),
          //     infos: e.target.value.split(';'),
          //   }));
          // }}
          rows={4}
          cols={5}
          className={styles.textarea_field}
        />
        {imageSelect({
          label: 'Фотография места проведения',
          deleteImg,
          onBtnImg,
          onChangeImage,
          formRef,
          imageRef,
          currentImage: currentCamp?.mainImage,
        })}
        <label>{'Выбор пакета'}</label>
        <select
          className={styles.input_field}
          onChange={(e) => {
            const selectedId = Number(e.target.value);
            const isDeselect = !!currentCamp?.packages.some(
              ({ packageId }) => packageId === selectedId,
            );
            setCamp((prevCamp) => {
              return {
                ...prevCamp,
                packages: isDeselect
                  ? prevCamp?.packages.filter(
                      ({ packageId }) => packageId !== selectedId,
                    )
                  : prevCamp?.packages.concat([
                      {
                        ...(packs.find(
                          ({ packageId }) => packageId === selectedId,
                        ) as IPackage),
                      },
                    ]),
              } as ICampItem;
            });
          }}
          value={0}
        >
          <option disabled={true} value={0}>{`Пакет`}</option>
          {packs.map((pack) => {
            const selected = currentCamp?.packages.some(
              ({ packageId }) => packageId === pack.packageId,
            );
            return (
              <option
                className={selected ? styles.selected_option_pack : ''}
                value={pack.packageId}
                key={pack.packageId}
              >{`Пакет “${pack.name}”`}</option>
            );
          })}
        </select>

        {currentCamp ? (
          <div className={styles.packages}>
            {currentCamp.packages.map((pack) => {
              return (
                <div key={pack.packageId} className={styles.package_card}>
                  <span>{`Пакет "${pack.name}"`}</span>
                  <textarea value={pack.info} className={styles.pack_area} />
                  <label>Стоимость</label>
                  <input
                    value={pack.totalPrice}
                    className={styles.pack_input}
                  />
                  <div className={styles.row_prices}>
                    <div className={styles.col_price}>
                      <label className={styles.pack_label}>Цена</label>
                      <input
                        value={pack.firstPrice}
                        className={styles.pack_col}
                      />
                    </div>
                    <div className={styles.col_price}>
                      <label className={styles.pack_label}>До даты</label>
                      <input
                        value={pack.firstLimitation}
                        className={styles.pack_col}
                      />
                    </div>
                  </div>
                  <div className={styles.row_prices}>
                    <div className={styles.col_price}>
                      <label className={styles.pack_label}>Цена</label>
                      <input
                        value={pack.secondPrice}
                        className={styles.pack_col}
                      />
                    </div>
                    <div className={styles.col_price}>
                      <label className={styles.pack_label}>До даты</label>
                      <input
                        value={pack.secondLimitation}
                        className={styles.pack_col}
                      />
                    </div>
                  </div>
                  <div className={styles.row_prices}>
                    <div className={styles.col_price}>
                      <label className={styles.pack_label}>Цена</label>
                      <input
                        value={pack.thirdPrice}
                        className={styles.pack_col}
                      />
                    </div>
                    <div className={styles.col_price}>
                      <label className={styles.pack_label}>До даты</label>
                      <input
                        value={pack.thirdLimitation}
                        className={styles.pack_col}
                      />
                    </div>
                  </div>
                  <label>Стоимость предоплаты</label>
                  <input
                    value={pack.bookingPrice}
                    className={styles.pack_input}
                  />
                </div>
              );
            })}
          </div>
        ) : null}

        <label>{'Тренерский состав'}</label>
        <select className={styles.input_field}>
          <option value="">1 1</option>
          <option value="">2 2</option>
        </select>
      </div>
    </Modal>
  );
};
