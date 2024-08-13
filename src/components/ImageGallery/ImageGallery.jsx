import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.imageGalleryList}>
      {images.map(image => {
        return (
          <li className={css.imageGalleryListItem} key={image.id}>
            <ImageCard
              image={image}
              onImageClick={() =>
                onImageClick(
                  image.urls.regular,
                  image.alt_description,
                  image.user.name,
                  image.likes,
                  image.description,
                )
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
