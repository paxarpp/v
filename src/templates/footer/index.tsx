import { useDeviceDetect } from '../../hooks';
import { Template } from './template';
import { TemplateMobi } from './templateMobi.tsx';

export interface IProps {
  linkTg?: string;
  linkInstagram?: string;
  linkVk?: string;
}

export const Footer: React.FC<IProps> = (props) => {
  const { isMobile } = useDeviceDetect();
  return isMobile ? <TemplateMobi {...props} /> : <Template {...props} />;
};
