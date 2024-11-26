import { CallMe } from '../../templates/callme';
import { Footer } from '../../templates/footer';
import { CampInfoIcons } from './campInfoIcons';
import { CampsList } from './campsList';

export const ShortCamps = () => {
  return (
    <div>
      <h2>Кемпы выходного дня</h2>

      <CampInfoIcons />

      <CampsList />

      <CallMe />

      <Footer />
    </div>
  );
};
