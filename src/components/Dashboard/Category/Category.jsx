import './Category.css';
import { useParams, Link } from "react-router-dom";
import { filterBy } from "../../../utils/index.js";
import { products } from "../../../data/index.js";
import { starIcon, shoppingCartIcon, sellIcon } from "../../../assets/icons/index.js";

export default function Category() {
  const { category } = useParams();
  const filteredProduct = filterBy(products, 'type', category);
  return (
    <div className="category">
      <h2 className="category__h2">{category}</h2>
      <p className="category__p">Berikut adalah daftar produk {category} yang ada.</p>
      <ul className="category__ul">
        {filteredProduct?.map(product => {
          return <ProductCard {...product} key={product.id} />
        })}
      </ul>
    </div>
  )
}

function ProductCard({ id, name, rating, imgUrl, discount, currentMonthSold }) {
  const isDiscount = () => {
    if (discount !== 0)
      return <span className="category__span category__span--discount">
        {discount}%
        <img src={sellIcon} alt="Ikon penjualan" className="category__icon" loading='lazy' />
      </span>
  }
  return (
    <li className="category__li">
      <Link className='category__link' to={`../../product/${id}`}>
        <img src={imgUrl} alt={name} className="category__img" />
        <h3 className="category__h3">{name}</h3>
        <p className="category__tag">
          <span className="category__span category__span--rating">
            {rating.star}
            <img src={starIcon} alt="Ikon bintang" className="category__icon" />
          </span>
          {isDiscount()}
        </p>
        <hr />
        <p className="category__p">
          <img src={shoppingCartIcon} alt="Ikon keranjang" className="category__icon" />
          Terjual {currentMonthSold}+
        </p>
      </Link>
    </li>
  )
}