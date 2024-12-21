import { useEffect, useState, ChangeEvent } from 'react';
import { useRevalidator } from 'react-router';
import { Modal } from '../../../templates/modal';
import { pl } from '../../../api/pageLoader';
import { api } from '../../../api/api';
import { creatorRequest } from '../../../api';
import { ICampItem, ICoach, IImage, IPackage } from '../interfaces';
import { useUser } from '../../../context';
import {
  IImageBase,
  ImagesMassSelect,
  ImageSelect,
} from '../../../templates/imageSelect';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../index.module.css';

export const CampEdit: React.FC<{
  campId: string | null;
  onClose: () => void;
}> = ({ campId, onClose }) => {
  const { logout } = useUser();
  const [currentCamp, setCamp] = useState<ICampItem | null>(null);
  const [packs, setPacks] = useState<IPackage[]>([]);
  const [coachesAll, setCoaches] = useState<ICoach[]>([]);

  const revalidator = useRevalidator();

  useEffect(() => {
    const getPacks = async () => {
      const axiosCall = creatorRequest(logout);
      setPacks([]);
      const { result } = await axiosCall<IPackage[]>(api.getPackages());
      if (result?.data.result) {
        setPacks([...result.data.result]);
      }
    };
    const getCoachesAll = async () => {
      const axiosCall = creatorRequest(logout);
      setCoaches([]);
      const { result } = await axiosCall<ICoach[]>(api.getCoachesDropdown());
      if (result?.data.result) {
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
      images: [] as IImage[],
      coaches: [] as ICoach[],
      packages: [] as IPackage[],
    });
    if (campId) {
      // edit
      const getC = async (id: string) => {
        const axiosCall = creatorRequest(logout);
        const { result } = await axiosCall<ICampItem>(pl.getCamp(id));
        if (result?.data.result) {
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
  };
  const deleteImg2 = () => {
    setCamp((prevCamp) => ({ ...(prevCamp as ICampItem), imageCart: null }));
  };
  const deleteImgMass = (id: string) => {
    setCamp((prevCamp) => ({
      ...(prevCamp as ICampItem),
      images: prevCamp?.images
        ? prevCamp.images.filter((img) => img.id !== id)
        : [],
    }));
  };

  const saveCamp = () => {
    const saveC = async () => {
      if (currentCamp) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(
          api.updateCampLong({ ...currentCamp }),
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
        const { error } = await axiosCall(api.deleteCamp(currentCamp.id));
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    delC();
  };

  const onChangeImage = (img: IImageBase) => {
    setCamp((prevCamp) => ({
      ...(prevCamp as ICampItem),
      mainImage: {
        typeEntity: 'CAMP' as const,
        ...img,
      },
    }));
  };
  const onChangeImage2 = (img: IImageBase) => {
    setCamp((prevCamp) => ({
      ...(prevCamp as ICampItem),
      imageCart: {
        typeEntity: 'CAMP' as const,
        ...img,
      },
    }));
  };
  const onChangeImageMass = (img: IImageBase) => {
    const newImg = {
      typeEntity: 'CAMP' as const,
      ...img,
    };
    setCamp((prevCamp) => ({
      ...(prevCamp as ICampItem),
      images: prevCamp?.images ? prevCamp.images.concat([newImg]) : [newImg],
    }));
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
          <ImageSelect
            label={'Главная фотография карточки'}
            deleteImg={deleteImg2}
            onChangeImage={onChangeImage2}
            currentImage={currentCamp?.imageCart}
          />
          <ImageSelect
            label={'Главная фотография страницы кемпа'}
            deleteImg={deleteImg}
            onChangeImage={onChangeImage}
            currentImage={currentCamp?.mainImage}
          />
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
        <div className={styles.date_picker}>
          <DatePicker
            onChange={(dates) => {
              const [start, end] = dates;
              setCamp((prevCamp) => ({
                ...(prevCamp as ICampItem),
                dateStart: start?.toISOString().slice(0, 10) as string,
                dateEnd: end?.toISOString().slice(0, 10) as string,
              }));
            }}
            startDate={
              currentCamp?.dateStart
                ? new Date(currentCamp.dateStart)
                : undefined
            }
            endDate={
              currentCamp?.dateEnd ? new Date(currentCamp.dateEnd) : undefined
            }
            selectsRange={true}
            inline={true}
          />
        </div>
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
        <ImagesMassSelect
          label={'Фотография места проведения'}
          deleteImg={deleteImgMass}
          onChangeImage={onChangeImageMass}
          images={currentCamp?.images}
        />
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
        <ul>
          {currentCamp?.coaches.map((coach) => {
            return <li key={coach.id}>{coach.name}</li>;
          })}
        </ul>
      </div>
    </Modal>
  );
};
