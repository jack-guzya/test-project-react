import { SearchImagesResult } from '../../../services/unsplash';
import style from './ImageList.module.css';

type Props = {
  images: SearchImagesResult['results'];
};

export const ImageList: React.FC<Props> = ({ images }) => {
  return (
    <div className={style.container}>
      {images.map(({ urls, id }) => (
        <div
          key={id}
          className={style['img-container']}
          style={{ backgroundImage: `url(${urls.small})` }}
        />
      ))}
    </div>
  );
};
