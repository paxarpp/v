import { useLoaderData } from 'react-router';
import { Route } from '../+types';
import { ImagePack } from '../../../templates/imagesPack';
import { useDeviceDetect } from '../../../hooks';
import styles from '../index.module.css';

export const Info = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();
  const { isMobile } = useDeviceDetect();

  return (
    <div className={isMobile ? styles.info_wrap_mobi : styles.info_wrap}>
      <h2
        className={
          isMobile ? styles.camp_info_title_mobi : styles.camp_info_title
        }
      >
        {camp?.name}
      </h2>
      <div className={isMobile ? styles.info_row_mobi : styles.info_row}>
        <ImagePack
          images={camp?.images}
          width={isMobile ? 335 : undefined}
          height={isMobile ? 231 : undefined}
          widthPreview={isMobile ? 60 : undefined}
          heightPreview={isMobile ? 41 : undefined}
          gapPreview={isMobile ? 8 : undefined}
          marginPreviewTop={isMobile ? 16 : undefined}
        />
        <ul className={isMobile ? styles.info_list_mobi : styles.info_list}>
          {camp?.info
            ?.split(';')
            .filter(Boolean)
            .map((inf, i) => (
              <li
                key={i + 'info'}
                className={isMobile ? styles.info_item_mobi : styles.info_item}
              >
                {inf}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
