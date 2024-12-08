import { CallMe } from '../../templates/callme';
import { BlockIcons } from './blockIcons';
import { Collapsed } from './collapsed';
import { Contacts } from './contacts';
import { CampsScroller } from './campsScroller';
import { MainImg } from './mainImg';

export const Main = () => {
  return (
    <div>
      <MainImg />

      <BlockIcons />

      <CampsScroller />

      <Collapsed />

      <Contacts />

      <CallMe />
    </div>
  );
};
