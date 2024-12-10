import './SearchPopup.css';
import { products, categories } from "../../../../../data/index.js";
import { Link } from "react-router-dom";

export default function SearchPopup({ query, onInputChange }) {
  query = query.toLowerCase();
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(query);
  }).map(product => {
    return { id: product.id, name: product.name, type: 'product' };
  });
  const filteredCategories = categories.filter(category => {
    return category.name.toLowerCase().includes(query);
  }).map(category => {
    return { id: category.id, name: category.name, type: 'category' };
  });
  const results = [...filteredCategories, ...filteredProducts];
  return (
    <div className="search">
      <div className="search__container">
        <input
          type="text"
          placeholder='Cari di sini!'
          className='search__input'
          value={query}
          onChange={onInputChange}
        />
        {query !== ''
          ? <SearchResultList results={results} />
          : null
        }
      </div>
    </div>
  )
}

function SearchResultList({ results }) {
  return (
    <ul className="search__ul">
      {results.map(result => <SearchResultItem {...result} key={result.id} />)}
    </ul>
  )
}

function SearchResultItem({ id, name, type }) {
  return (
    <li className="search__li">
      <Link className='search__link' to={`/dashboard/${type}/${id}`}>{name}</Link>
    </li>
  )
}