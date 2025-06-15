import { useEffect, useState } from 'react';
import { useRevalidator } from 'react-router';
import { Modal } from '../../../templates/modal';
import { api } from '../../../api/api';
import { pl } from '../../../api/pageLoader';
import { creatorRequest } from '../../../api';
import { IPrice } from '../interfaces';
import { useUser } from '../../../context';
import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';

const initialPrices = (isChild: boolean) => ({
  id: '',
  title: !isChild ? 'Взрослые' : 'Детские',
  price: undefined,
  subTitle: '',
});

export const PriceEdit: React.FC<{
  priceId: string | null;
  onClose: () => void;
}> = ({ priceId, onClose }) => {
  const { logout } = useUser();
  const { isMobile } = useDeviceDetect();
  const [currentPrice, setPrice] = useState<IPrice | null>(null);
  const [priceOld, setPriceOld] = useState<IPrice['prices'][number] | null>(
    null,
  );
  const [priceChild, setPriceChild] = useState<IPrice['prices'][number] | null>(
    null,
  );

  const revalidator = useRevalidator();

  useEffect(() => {
    setPrice({
      id: '',
      name: '',
      prices: [],
    });
    setPriceOld(initialPrices(false));
    setPriceChild(initialPrices(true));
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
            setPrice(price);
            setPriceOld(price.prices[0]);
            setPriceChild(price.prices[1]);
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
      if (currentPrice) {
        const axiosCall = creatorRequest(logout);
        const { error } = await axiosCall(
          api.updateShedulePrice({
            ...currentPrice,
            prices: [
              priceOld as IPrice['prices'][number],
              priceChild as IPrice['prices'][number],
            ],
          }),
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
      classNameModal={
        isMobile ? styles.edit_modal_mobi : styles.edit_camp_modal
      }
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
        <div className={isMobile ? styles.flex_mobi : styles.flex}>
          <div className={styles.flex_column}>
            <h4>{'Взрослые группы'}</h4>
            <label>{'За одну тренировку'}</label>
            <input
              value={priceOld?.subTitle}
              onChange={(e) => {
                setPriceOld((prevPrice) => {
                  return prevPrice
                    ? {
                        ...prevPrice,
                        subTitle: e.target.value,
                      }
                    : initialPrices(false);
                });
              }}
              className={styles.input_field_sm}
            />
            <label>{'За абонемент'}</label>
            <input
              value={priceOld?.price}
              onChange={(e) => {
                setPriceOld((prevPrice) => {
                  return prevPrice
                    ? {
                        ...prevPrice,
                        price: e.target.value
                          ? isNaN(Number(e.target.value))
                            ? prevPrice.price
                            : Number(e.target.value)
                          : undefined,
                      }
                    : initialPrices(false);
                });
              }}
              className={styles.input_field_sm}
            />
          </div>
          <div className={styles.flex_column}>
            <h4>{'Детские группы'}</h4>
            <label>{'За одну тренировку'}</label>
            <input
              value={priceChild?.subTitle}
              onChange={(e) => {
                setPriceChild((prevPrice) => {
                  return prevPrice
                    ? {
                        ...prevPrice,
                        subTitle: e.target.value,
                      }
                    : initialPrices(true);
                });
              }}
              className={styles.input_field_sm}
            />
            <label>{'За абонемент'}</label>
            <input
              value={priceChild?.price}
              onChange={(e) => {
                setPriceChild((prevPrice) => {
                  return prevPrice
                    ? {
                        ...prevPrice,
                        price: e.target.value
                          ? isNaN(Number(e.target.value))
                            ? prevPrice.price
                            : Number(e.target.value)
                          : undefined,
                      }
                    : initialPrices(true);
                });
              }}
              className={styles.input_field_sm}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
