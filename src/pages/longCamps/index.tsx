import { CallMe } from '../../templates/callme';
import { Footer } from '../../templates/footer';
import { CampInfoIcons } from './campInfoIcons';
import { CampsList } from './campsList';

export const LongCamps = () => {
  return (
    <div>
      <h2>Недельные кемпы</h2>

      <CampInfoIcons />

      <CampsList />

      <CallMe />

      <Footer />
    </div>
  );
};
