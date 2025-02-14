import { useEffect, useState } from 'react';
import { useRevalidator } from 'react-router';
import { Modal } from '../../../templates/modal';
import { api } from '../../../api/api';
import { pl } from '../../../api/pageLoader';
import { creatorRequest } from '../../../api';
import { IPrice } from '../interfaces';
import { useUser } from '../../../context';
import styles from '../index.module.css';

export const PriceEdit: React.FC<{
  priceId: string | null;
  onClose: () => void;
}> = ({ priceId, onClose }) => {
  const { logout } = useUser();
  const [currentPrice, setPrice] = useState<IPrice | null>(null);

  const revalidator = useRevalidator();

  useEffect(() => {
    setPrice({
      id: '',
      name: '',
      prices: [],
    });
    if (priceId) {
      // edit
      const getP = async () => {
        const axiosCall = creatorRequest(logout);
        const { result, error } = await axiosCall<IPrice[]>(
          pl.getPrice<IPrice>(),
        );
        if (!error && result?.data) {
          const price = result.data.result.find((p) => p.id === priceId);
          if (price) {
            setPrice({ ...price });
          }
        }
      };
      getP();
    }
    return () => {
      setPrice(null);
    };
  }, [priceId]);

  const savePrice = () => {
    const saveC = async () => {
      console.log({ ...currentPrice })
      if (currentPrice) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(
          api.updateShedulePrice({ ...currentPrice }),
        );
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    saveC();
  };

  const deletePrice = () => {
    const delC = async () => {
      if (currentPrice?.id) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(
          api.deleteShedulePrice(currentPrice.id),
        );
        if (!error) {
          onClose();
          revalidator.revalidate();
        }
      }
    };
    delC();
  };

  return (
    <Modal
      classNameModal={styles.edit_camp_modal}
      isOpen={true}
      close={onClose}
      footer={
        <div className={styles.modal_footer}>
          <button onClick={savePrice} className={styles.button}>
            {'Сохранить'}
          </button>
          <button onClick={deletePrice} className={styles.button}>
            {'Удалить'}
          </button>
        </div>
      }
      header={
        <div className={styles.modal_header}>{'Стоимость тренировок'}</div>
      }
    >
      <div className={styles.edit_camp_content}>
        <label>{'Название пакета'}</label>
        <input
          value={currentPrice?.name}
          onChange={(e) => {
            setPrice((prevPrice) =>
              prevPrice
                ? {
                    ...prevPrice,
                    name: e.target.value,
                  }
                : { name: e.target.value, id: null, prices: [] },
            );
          }}
          className={styles.input_field}
        />
        <div>
          <div>
            <h4>{'Взрослые группы'}</h4>
            <label>{'За одну тренировку'}</label>
            <input
              value={currentPrice?.prices[0]?.price}
              onChange={(e) => {
                setPrice((prevPrice) => {
                  return prevPrice
                    ? {
                        ...prevPrice,
                        prices: [
                          {
                            ...prevPrice.prices[0],
                            price: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                          },
                          { ...prevPrice.prices[1] },
                        ],
                      }
                    : {
                        id: null,
                        name: '',
                        prices: [
                          {
                            id: null,
                            price: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                            subTitle: '',
                            title: 'Взрослые',
                          },
                          {
                            id: null,
                            price: undefined,
                            subTitle: '',
                            title: 'Взрослые',
                          },
                        ],
                      };
                });
              }}
              className={styles.input_field}
            />
            <label>{'За абонемент'}</label>
            <input
              value={currentPrice?.prices[0]?.subTitle}
              onChange={(e) => {
                setPrice((prevPrice) => {
                  return prevPrice
                    ? {
                        ...prevPrice,
                        prices: [
                          {
                            ...prevPrice.prices[0],
                            subTitle: e.target.value,
                          },
                          prevPrice.prices[1],
                        ],
                      }
                    : {
                        id: null,
                        name: '',
                        prices: [
                          {
                            id: null,
                            price: undefined,
                            subTitle: e.target.value,
                            title: 'Взрослые',
                          },
                          {
                            id: null,
                            price: undefined,
                            subTitle: '',
                            title: 'Взрослые',
                          },
                        ],
                      };
                });
              }}
              className={styles.input_field}
            />
          </div>
          <div>
            <h4>{'Детские группы'}</h4>
            <label>{'За одну тренировку'}</label>
            <input
              value={currentPrice?.prices[1]?.price}
              onChange={(e) => {
                setPrice((prevPrice) => {
                  return prevPrice
                    ? {
                        ...prevPrice,
                        prices: [
                          { ...prevPrice.prices[0] },
                          {
                            ...prevPrice.prices[1],
                            price: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                          },
                        ],
                      }
                    : {
                        id: null,
                        name: '',
                        prices: [
                          {
                            id: null,
                            price: undefined,
                            subTitle: '',
                            title: 'Детские',
                          },
                          {
                            id: null,
                            price: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                            subTitle: '',
                            title: 'Детские',
                          },
                        ],
                      };
                });
              }}
              className={styles.input_field}
            />
            <label>{'За абонемент'}</label>
            <input
              value={currentPrice?.prices[1]?.subTitle}
              onChange={(e) => {
                setPrice((prevPrice) => {
                  return prevPrice
                    ? {
                        ...prevPrice,
                        prices: [
                          { ...prevPrice.prices[0] },
                          {
                            ...prevPrice.prices[1],
                            subTitle: e.target.value,
                          },
                        ],
                      }
                    : {
                        id: null,
                        name: '',
                        prices: [
                          {
                            id: null,
                            price: undefined,
                            subTitle: '',
                            title: 'Детские',
                          },
                          {
                            id: null,
                            price: undefined,
                            subTitle: e.target.value,
                            title: 'Детские',
                          },
                        ],
                      };
                });
              }}
              className={styles.input_field}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
