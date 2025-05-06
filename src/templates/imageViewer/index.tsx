import { useAuth } from '../../context';

interface IProps {
  src: string;
  alt?: string;
  className?: string;
}

export const ImageViewer: React.FC<IProps> = ({ src, alt, className }) => {
  const { image } = useAuth();

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={() => image.onPreview(src, alt)}
    />
  );
};
