import css from './ImageCard.module.css';
import { CiHeart, CiUser } from 'react-icons/ci';

const ImageCard = ({ image, onImageClick }) => {
  return (
    <div className={css.imageCardContainer}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={onImageClick}
      />
      <ul className={css.imageCardHoverInfo}>
        <li className={css.imageCardHoverInfoItem}>
          <CiUser size="20" />
          {image.user.name}
        </li>
        <li className={css.imageCardHoverInfoItem}>
          <CiHeart size="20" />
          {image.likes}
        </li>
      </ul>
    </div>
  );
};

export default ImageCard;
