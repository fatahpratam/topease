import { useNavigate } from "react-router-dom";
import { products } from "../../../data/index.js";
import { sellIcon, starIcon, shoppingCartIcon } from "../../../assets/icons/index.js";
import { sortBy, sortByYearSold, sortByStar } from "../../../utils/index.js";
import './Home.css';

export default function Home() {
  const trendingList = sortBy(products, 'currentMonthSold');
  const popularList = sortByYearSold(products);
  const discountList = sortBy(products, 'discount');
  const ratingList = sortByStar(products);

  return (
    <div className="home">
      <HomeList
        title='Produk Trending'
        text='Produk berikut sedang trending! Jangan ketinggalan!'
        list={trendingList}
      />
      <HomeList
        title='Produk Populer'
        text='Produk-produk yang paling populer tahun ini!'
        list={popularList}
      />
      <HomeList
        title='Produk Promo'
        text='Produk-produk yang paling berdiskon!'
        list={discountList}
      />
      <HomeList
        title='Produk Rating Tertinggi'
        text='Produk-produk yang paling disukai!'
        list={ratingList}
      />
    </div>
  )
}

function HomeList({ title, text, list }) {
  return (
    <div className="home__container">
      <h2 className="home__h2">{title}</h2>
      <p>{text}</p>
      <ul className="home__ul">
        {list.map(item => (
          <HomeItem {...item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

function HomeItem({ id, name, rating, imgUrl, discount, sold }) {
  const navigate = useNavigate();
  const isDiscount = () => {
    if (discount !== 0)
      return <span className="home__span home__span--discount">
        {discount}%
        <img src={sellIcon} alt="Sell icon" className="home__icon" loading="lazy" />
      </span>
  }
  return (
    <li
      className="home__li"
      onClick={() => navigate(`../product/${id}`)}
    >
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
    </li>
  )
}