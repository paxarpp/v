import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { useRevalidator } from 'react-router-dom';
import { Modal } from '../../../templates/modal';
import {
  getCamp,
  getPackages,
  updateCamp,
  deleteCamp as deleteCmp,
  creatorRequest,
  uploadImg,
  getCoaches,
} from '../../../api';
import { ICampItem, ICoach, IPackage } from '../interfaces';
import { useUser } from '../../../context';
import { imageesMassSelect, imageSelect } from './imageSelect';
import styles from '../index.module.css';

export const CampEdit: React.FC<{
  campId: string | null;
  onClose: () => void;
}> = ({ campId, onClose }) => {
  const { logout } = useUser();
  const [currentCamp, setCamp] = useState<ICampItem | null>(null);
  const [packs, setPacks] = useState<IPackage[]>([]);
  const [coachesAll, setCoaches] = useState<ICoach[]>([]);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const imageRef2 = useRef<HTMLInputElement | null>(null);
  const formRef2 = useRef<HTMLFormElement | null>(null);
  const imageRefMass = useRef<HTMLInputElement | null>(null);
  const formRefMass = useRef<HTMLFormElement | null>(null);

  const revalidator = useRevalidator();

  useEffect(() => {
    const getPacks = async () => {
      const axiosCall = creatorRequest(logout);
      setPacks([]);
      const { result } = await axiosCall<IPackage[]>(getPackages());
      if (result.data.result) {
        setPacks([...result.data.result]);
      }
    };
    const getCoachesAll = async () => {
      const axiosCall = creatorRequest(logout);
      setCoaches([]);
      const { result } = await axiosCall<ICoach[]>(getCoaches());
      if (result.data.result) {
        setCoaches([...result.data.result]);
      }
    };
    setCamp({
      id: '',
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
    if (campId) {
      // edit
      const getC = async (id: string) => {
        const axiosCall = creatorRequest(logout);
        const { result } = await axiosCall<ICampItem>(getCamp(id));
        if (result.data.result) {
          setCamp({ ...result.data.result });
        }
      };
      getC(campId);
    }
    getPacks();
    getCoachesAll();
    return () => {
      setCamp(null);
    };
  }, [campId]);

  const deleteImg = () => {
    setCamp((prevCamp) => ({ ...(prevCamp as ICampItem), mainImage: null }));
    formRef.current?.reset();
  };
  const deleteImg2 = () => {
    setCamp((prevCamp) => ({ ...(prevCamp as ICampItem), imageCart: null }));
    formRef2.current?.reset();
  };
  const deleteImgMass = (id: string) => {
    setCamp((prevCamp) => ({
      ...(prevCamp as ICampItem),
      images: prevCamp?.images
        ? prevCamp.images.filter((img) => img.id !== id)
        : [],
    }));
    formRefMass.current?.reset();
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

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imageUploader = async () => {
      const file = e.target.files?.[0];
      if (file) {
        const axiosCall = creatorRequest(logout);
        const formData = new FormData();
        formData.append('file', file);
        const { result, error } = await axiosCall<{ id: string; url: string }>(
          uploadImg(formData, 'CAMP'),
        );
        setCamp((prevCamp) => ({
          ...(prevCamp as ICampItem),
          mainImage: {
            typeEntity: 'CAMP' as const,
            name: file.name,
            contentType: file.type,
            size: file.size,
            id: result.data.result.id,
            url: result.data.result.url,
          },
        }));
      }
    };
    imageUploader();
  };
  const onChangeImage2 = (e: ChangeEvent<HTMLInputElement>) => {
    const imageUploader = async () => {
      const file = e.target.files?.[0];
      if (file) {
        const axiosCall = creatorRequest(logout);
        const formData = new FormData();
        formData.append('file', file);
        const { result, error } = await axiosCall<{ id: string; url: string }>(
          uploadImg(formData, 'CAMP'),
        );
        setCamp((prevCamp) => ({
          ...(prevCamp as ICampItem),
          imageCart: {
            typeEntity: 'CAMP' as const,
            name: file.name,
            contentType: file.type,
            size: file.size,
            id: result.data.result.id,
            url: result.data.result.url,
          },
        }));
      }
    };
    imageUploader();
  };
  const onChangeImageMass = (e: ChangeEvent<HTMLInputElement>) => {
    const imageUploader = async () => {
      const file = e.target.files?.[0];
      if (file) {
        const axiosCall = creatorRequest(logout);
        const formData = new FormData();
        formData.append('file', file);
        const { result, error } = await axiosCall<{ id: string; url: string }>(
          uploadImg(formData, 'CAMP'),
        );
        const newImg = {
          typeEntity: 'CAMP' as const,
          name: file.name,
          contentType: file.type,
          size: file.size,
          entityId: campId as string,
          id: result.data.result.id,
          url: result.data.result.url,
        };
        setCamp((prevCamp) => ({
          ...(prevCamp as ICampItem),
          images: prevCamp?.images
            ? prevCamp.images.concat([newImg])
            : [newImg],
        }));
      }
    };
    imageUploader();
  };

  const onBtnImg = () => {
    imageRef.current?.click();
  };
  const onBtnImg2 = () => {
    imageRef2.current?.click();
  };
  const onBtnImgMass = () => {
    imageRefMass.current?.click();
  };

  const onChangePack = (e: ChangeEvent<HTMLSelectElement>) => {
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
  };

  const onChangeCoach = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const isDeselect = !!currentCamp?.coaches.some(
      ({ id }) => id === selectedId,
    );
    setCamp((prevCamp) => {
      return {
        ...prevCamp,
        coaches: isDeselect
          ? prevCamp?.coaches.filter(({ id }) => id !== selectedId)
          : prevCamp?.coaches.concat([
              {
                ...(coachesAll.find(({ id }) => id === selectedId) as ICoach),
              },
            ]),
      } as ICampItem;
    });
  };

  const onChangePackForCamp = (
    e: ChangeEvent<HTMLInputElement>,
    packageId: number,
    field: keyof IPackage,
    toNumber?: boolean,
  ) => {
    setCamp((prevCamp) => ({
      ...(prevCamp as ICampItem),
      packages: (prevCamp as ICampItem).packages.map((p) => {
        if (p.packageId === packageId) {
          return {
            ...p,
            [field]: toNumber ? Number(e.target.value) : e.target.value,
          };
        } else {
          return p;
        }
      }),
    }));
  };

  return (
    <Modal
      classNameModal={styles.edit_camp_modal}
      isOpen={true}
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
        <div className={styles.images_row}>
          {imageSelect({
            label: 'Главная фотография карточки',
            deleteImg: deleteImg2,
            onBtnImg: onBtnImg2,
            onChangeImage: onChangeImage2,
            formRef: formRef2,
            imageRef: imageRef2,
            currentImage: currentCamp?.imageCart,
          })}
          {imageSelect({
            label: 'Главная фотография страницы кемпа',
            deleteImg,
            onBtnImg,
            onChangeImage,
            formRef: formRef,
            imageRef: imageRef,
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
          onChange={(e) => {
            setCamp((prevCamp) => ({
              ...(prevCamp as ICampItem),
              info: e.target.value as string,
            }));
          }}
          rows={4}
          cols={5}
          className={styles.textarea_field}
        />
        {imageesMassSelect({
          label: 'Фотография места проведения',
          deleteImg: deleteImgMass,
          onBtnImg: onBtnImgMass,
          onChangeImage: onChangeImageMass,
          formRef: formRefMass,
          imageRef: imageRefMass,
          images: currentCamp?.images,
        })}
        <label>{'Выбор пакета'}</label>
        <select
          className={styles.input_field}
          onChange={onChangePack}
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
                  <textarea
                    value={pack.info}
                    className={styles.pack_area}
                    onChange={(e) =>
                      onChangePackForCamp(e, pack.packageId, 'info', false)
                    }
                  />
                  <label>Стоимость</label>
                  <input
                    type={'number'}
                    value={pack.totalPrice}
                    className={styles.pack_input}
                    onChange={(e) =>
                      onChangePackForCamp(e, pack.packageId, 'totalPrice', true)
                    }
                  />
                  <div className={styles.row_prices}>
                    <div className={styles.col_price}>
                      <label className={styles.pack_label}>Цена</label>
                      <input
                        type={'number'}
                        value={pack.firstPrice}
                        className={styles.pack_col}
                        onChange={(e) =>
                          onChangePackForCamp(
                            e,
                            pack.packageId,
                            'firstPrice',
                            true,
                          )
                        }
                      />
                    </div>
                    <div className={styles.col_price}>
                      <label className={styles.pack_label}>До даты</label>
                      <input
                        type={'date'}
                        value={pack.firstLimitation}
                        className={styles.pack_col}
                        onChange={(e) =>
                          onChangePackForCamp(
                            e,
                            pack.packageId,
                            'firstLimitation',
                            false,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.row_prices}>
                    <div className={styles.col_price}>
                      <label className={styles.pack_label}>Цена</label>
                      <input
                        type={'number'}
                        value={pack.secondPrice}
                        className={styles.pack_col}
                        onChange={(e) =>
                          onChangePackForCamp(
                            e,
                            pack.packageId,
                            'secondPrice',
                            true,
                          )
                        }
                      />
                    </div>
                    <div className={styles.col_price}>
                      <label className={styles.pack_label}>До даты</label>
                      <input
                        type={'date'}
                        value={pack.secondLimitation}
                        className={styles.pack_col}
                        onChange={(e) =>
                          onChangePackForCamp(
                            e,
                            pack.packageId,
                            'secondLimitation',
                            false,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.row_prices}>
                    <div className={styles.col_price}>
                      <label className={styles.pack_label}>Цена</label>
                      <input
                        type={'number'}
                        value={pack.thirdPrice}
                        className={styles.pack_col}
                        onChange={(e) =>
                          onChangePackForCamp(
                            e,
                            pack.packageId,
                            'thirdPrice',
                            true,
                          )
                        }
                      />
                    </div>
                    <div className={styles.col_price}>
                      <label className={styles.pack_label}>До даты</label>
                      <input
                        type={'date'}
                        value={pack.thirdLimitation}
                        className={styles.pack_col}
                        onChange={(e) =>
                          onChangePackForCamp(
                            e,
                            pack.packageId,
                            'thirdLimitation',
                            false,
                          )
                        }
                      />
                    </div>
                  </div>
                  <label>Стоимость предоплаты</label>
                  <input
                    type={'number'}
                    value={pack.bookingPrice}
                    className={styles.pack_input}
                    onChange={(e) =>
                      onChangePackForCamp(
                        e,
                        pack.packageId,
                        'bookingPrice',
                        true,
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        ) : null}

        <label>{'Тренерский состав'}</label>
        <select
          className={styles.input_field}
          onChange={onChangeCoach}
          value={0}
        >
          <option disabled={true} value={0}>{`Тренер`}</option>
          {coachesAll.map((coach) => {
            const selected = currentCamp?.coaches.some(
              ({ id }) => id === coach.id,
            );
            return (
              <option
                className={selected ? styles.selected_option_pack : ''}
                value={coach.id}
                key={coach.id}
              >
                {coach.name}
              </option>
            );
          })}
        </select>
      </div>
    </Modal>
  );
};