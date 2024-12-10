import './Home.css';
import { Link } from "react-router-dom";
import { products, categories } from "../../../data/index.js";
import { sellIcon, starIcon, shoppingCartIcon } from "../../../assets/icons/index.js";
import { sortBy, sortByYearSold, sortByStar } from "../../../utils/index.js";

export default function Home() {
  const trendingList = sortBy(products, 'currentMonthSold');
  const popularList = sortByYearSold(products);
  const discountList = sortBy(products, 'discount');
  const ratingList = sortByStar(products);

  return (
    <div className="home">
      <CategoryList categories={categories} />
      <ProductList
        title='Produk Trending'
        text='Produk berikut sedang trending! Jangan ketinggalan!'
        list={trendingList}
      />
      <ProductList
        title='Produk Populer'
        text='Produk-produk yang paling populer tahun ini!'
        list={popularList}
      />
      <ProductList
        title='Produk Promo'
        text='Produk-produk yang paling berdiskon!'
        list={discountList}
      />
      <ProductList
        title='Produk Rating Tertinggi'
        text='Produk-produk yang paling disukai!'
        list={ratingList}
      />
    </div>
  )
}

function CategoryList({ categories }) {
  return (
    <div className="home__category">
      <h2 className="home__category-h2">Kategori</h2>
      <p className="home__category-p">Cari produk bedasarkan kategori berikut.</p>
      <ul className="home__category-ul">
        {categories.map(category => <CategoryItem {...category} key={category.id} />)}
      </ul>
    </div>
  )
}

function CategoryItem({ id, name, iconUrl }) {
  return (
    <li className="home__category-li">
      <Link className="home__category-link" to={`../category/${id}`}>
        <img src={iconUrl} alt={`${name} icon`} className="home__category-icon" />
        {name}
      </Link>
    </li>
  )
}

function ProductList({ title, text, list }) {
  return (
    <div className="home__container">
      <h2 className="home__h2">{title}</h2>
      <p>{text}</p>
      <ul className="home__ul">
        {list.map(item => (
          <ProductItem {...item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

function ProductItem({ id, name, rating, imgUrl, discount, sold }) {
  const isDiscount = () => {
    if (discount !== 0)
      return <span className="home__span home__span--discount">
        {discount}%
        <img src={sellIcon} alt="Sell icon" className="home__icon" loading="lazy" />
      </span>
  }
  return (
    <li className="home__li">
      <Link className="home__link" to={`../product/${id}`}>
        <img src={imgUrl} alt={name} className="home__img" />
        <h3 className="home__h3">{name}</h3>
        <p className="home__tag">
          <span className="home__span home__span--rating">
            {rating.star}
            <img src={starIcon} alt="Star icon" className="home__icon" />
          </span>
          {isDiscount()}
        </p>
        <hr />
        <p className="home__p">
          <img src={shoppingCartIcon} alt="Shopping cart icon" className="home__icon" />
          Terjual {sold}+
        </p>
      </Link>
    </li>
  )
}