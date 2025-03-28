import { Fragment, useState } from 'react';
import { useLoaderData } from 'react-router';
import Ball from '../../../assets/ball.svg?react';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import Setting from '../../../assets/setting.svg?react';
import { Route } from '../+types';
import { useUser } from '../../../context';
import { PriceEdit } from '../priceEdit';
import imgUrl from '../../../assets/price_ball.jpg';
import styles from '../index.module.css';

export const Price = () => {
  const { isAdmin } = useUser();
  const [open, setIsOpen] = useState<boolean>(false);
  const [editPriceId, setEditPriceId] = useState<string | null>(null);

  const closePriceEdit = () => {
    setEditPriceId(null);
    setIsOpen(false);
  };

  return (
    <div className={styles.price_ball}>
      <h1 className={styles.price_title}>Стоимость тренировок</h1>
      <img className={styles.price_back} src={imgUrl} />
      {open ? (
        <PriceEdit priceId={editPriceId} onClose={closePriceEdit} />
      ) : null}
      <PriceTemplate
        isAdmin={isAdmin}
        setIsOpen={setIsOpen}
        setEditPriceId={setEditPriceId}
      />
    </div>
  );
};

const PriceTemplate: React.FC<{
  isAdmin: boolean;
  setIsOpen: (open: boolean) => void;
  setEditPriceId: (id: string) => void;
}> = ({ isAdmin, setIsOpen, setEditPriceId }) => {
  const { prices } = useLoaderData<Route.ComponentProps['loaderData']>();

  const openEditPrice = (id: string) => {
    setEditPriceId(id);
    setIsOpen(true);
  };

  const addPrice = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.price_list}>
      {prices?.map((pr, i) => {
        return (
          <div key={`p-${pr.id}${i}`} className={styles.price_item}>
            <p>
              {pr.name}
              {isAdmin ? (
                <Setting
                  onClick={() => openEditPrice(pr.id as string)}
                  className={styles.setting_price}
                />
              ) : null}
            </p>
            <div className={styles.price_prices}>
              {pr.prices.map((p, index) => {
                return (
                  <Fragment key={`sub-${p.id}${index}`}>
                    <div className={styles.price_card}>
                      <span>{p.title}</span>
                      {p.subTitle ? (
                        <span className={styles.price_message}>
                          {p.subTitle}
                        </span>
                      ) : (
                        <span className={styles.price_message_empty} />
                      )}
                      <span>{p.price}</span>
                    </div>
                    {index === 0 ? <Ball /> : null}
                  </Fragment>
                );
              })}
            </div>
            <div className={styles.sale}>
              <span>{'*студентам очной формы обучения скидка 10 %'}</span>
              <br />
              <span>{'*многодетным семьям скидка 10 %'}</span>
            </div>
          </div>
        );
      })}
      {isAdmin ? (
        <div className={styles.price_card_add}>
          <RoundAdd onClick={addPrice} />
        </div>
      ) : null}
    </div>
  );
};
