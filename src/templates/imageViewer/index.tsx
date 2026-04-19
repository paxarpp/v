import { useAuth } from '../../context';

interface IProps {
  src: string;
  id?: string;
  alt?: string;
  className?: string;
  images?: {
    src: string;
    alt: string;
    id?: string;
  }[];
}

export const ImageViewer: React.FC<IProps> = ({
  src,
  id,
  alt = '',
  className,
  images,
}) => {
  const { image } = useAuth();

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={() =>
        image.onPreview(images ? images : [{ src, alt }], id ? id : src)
      }
    />
  );
};
