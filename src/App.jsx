import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import SearchBar from './components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import toast from 'react-hot-toast';
import getImages from './js/unsplash-api';

import { useState, useEffect, useRef } from 'react';

import './App.css';

function App() {
  const MODAL_INITIAL_STATE = {
    modalIsOpen: false,
    srcUrl: '',
    altDescription: '',
    authorName: '',
    likes: '',
    largeDescription: '',
  };

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [modalState, setModalState] = useState(MODAL_INITIAL_STATE);
  const mainElem = useRef();

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreBtn = () => {
    setPage(page + 1);
  };

  const handleModalOpen = (
    srcUrl,
    altDescription,
    authorName,
    likes,
    largeDescription,
  ) => {
    setModalState({
      modalIsOpen: true,
      srcUrl,
      altDescription,
      authorName,
      likes,
      largeDescription,
    });
  };

  const handleModalClose = () => {
    setModalState(MODAL_INITIAL_STATE);
  };

  useEffect(() => {
    async function getImagesData() {
      try {
        setError(false);
        if (query === '') {
          setShowLoadMoreBtn(false);
          return;
        }
        setLoading(true);
        const data = await getImages(query, page);
        if (data.total === 0) {
          setShowLoadMoreBtn(false);
          toast('There are no results!');
          return;
        }
        setImages(prevImages => [...prevImages, ...data.results]);
        setShowLoadMoreBtn(data.total_pages !== page);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImagesData();
  }, [query, page]);

  useEffect(() => {
    if (page === 1) return;
    mainElem.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [images, page]);

  return (
    <div ref={mainElem}>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleModalOpen} />
      )}
      {showLoadMoreBtn && !loading && (
        <LoadMoreBtn onLoadMoreBtn={handleLoadMoreBtn} />
      )}
      {loading && <Loader />}
      <ImageModal onModalClose={handleModalClose} modalState={modalState} />
    </div>
  );
}

export default App;
