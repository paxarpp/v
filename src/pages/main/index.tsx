import { CallMe } from "../../templates/callme";
import { Footer } from "../../templates/footer";
import { BlockIcons } from './blockIcons';
import { Collapsed } from "./collapsed";
import { Contacts } from "./contacts";
import { CampsScroller } from "./campsScroller";
import styles from './index.module.css';

export const Main = () => {
  return (
    <div>
      <div>
        <img src={'src/assets/main foto.jpg'} className={styles.w_100} />
      </div>

      <BlockIcons />

      <CampsScroller />

      <Collapsed />

      <Contacts />

      <CallMe />

      <Footer />

    </div>
  );
}