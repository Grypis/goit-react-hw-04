import toast, { Toaster } from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import css from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const query = form.elements.searchInput.value.trim();
    if (query === '') {
      toast.error('Please set search query.');
    }
    onSearch(query);
    form.reset();
  };

  return (
    <header className={css.header}>
      <Toaster position="top-right" />
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchInput"
        />
        <button className={css.searchBtn} type="submit">
          <FiSearch size="18" />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
