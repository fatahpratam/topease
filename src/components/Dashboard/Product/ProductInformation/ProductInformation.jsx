import "./ProductInformation.css";
import { Link } from "react-router-dom";
import { starVariantIcon, shoppingCartIcon } from "../../../../assets/icons/index.js";

export default function ProductInformation({ product }) {
  return (
    <div className="info">
      <h2 className="info__h2">Top Up {product.name}</h2>
      <img src={product.imgUrl} alt={product.name} className="info__img" />
      <div className="info__column">
        <div className="info__div">
          {product.rating.star}
          <img src={starVariantIcon} alt="Ikon bintang" className="product__icon" />
        </div>
        <hr className="info__hr" />
        <div className="info__div">
          {product.rating.count}+
          Ratings
        </div>
        <hr className="info__hr" />
        <div className="info__div">
          {product.currentMonthSold}+
          <img src={shoppingCartIcon} alt="Ikon keranjang" className="product__icon" />
        </div>
        <hr className="info__hr" />
        <div className="info__div">
          <Link to={`../../category/${product.type}`} className='info__link'>{product.type}</Link>
        </div>
      </div>
      <h3 className="info__h3">Deskripsi</h3>
      <p className="info__p">{product.description}</p>
    </div>
  )
}