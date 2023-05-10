import React, { useEffect, useState } from 'react';
import Collection from './Collection';
import './index.scss';

const limitOnPage = 6;

function App() {
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsContentLoading(true);
    const category = selectedCategory > 0 ? `&category=${selectedCategory}` : '';
    fetch(
      `http://localhost:3000/collections?name_like=${searchValue}${category}&_page=${currentPage}&_limit=${limitOnPage}`
    )
      .then((data) => data.json())
      .then((json) => setCollections(json))
      .catch((error) => console.error(error))
      .finally(() => setIsContentLoading(false));
  }, [searchValue, selectedCategory, currentPage]);

  useEffect(() => {
    fetch(`http://localhost:3000/categories`)
      .then((data) => data.json())
      .then((json) => setCategories(json))
      .catch((error) => console.error(error));
  }, []);

  const collectionItems =
    collections.length > 0 &&
    collections.map((collection, i) => <Collection key={i} {...collection} />);

  const categoriesItems =
    categories.length > 0 &&
    categories.map((category, i) => (
      <li
        key={i}
        className={selectedCategory === i ? 'active' : ''}
        onClick={() => setSelectedCategory(i)}
      >
        {category.name}
      </li>
    ));

  const paginationItems = [...Array(4)].map((_, i) => (
    <li
      onClick={() => setCurrentPage(i + 1)}
      className={currentPage === i + 1 ? 'active' : ''}
    >
      {i + 1}
    </li>
  ));

  return (
    <div className='App'>
      <h1>Моя коллекция фотографий</h1>
      <div className='top'>
        <ul className='tags'>{categoriesItems}</ul>
        <input
          className='search-input'
          placeholder='Поиск по названию'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
      <div className='content'>{isContentLoading ? <h2>loading</h2> : collectionItems}</div>
      <ul className='pagination'>{paginationItems}</ul>
    </div>
  );
}

export default App;
