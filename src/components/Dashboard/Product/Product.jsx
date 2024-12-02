import './Product.css';
import { useParams } from "react-router-dom";
import { findBy } from "../../../utils/index.js";
import { products, nominalList } from "../../../data/index.js";
import ProductInformation from './ProductInformation/ProductInformation.jsx';
import ProductPayment from './ProductPayment/ProductPayment.jsx';

export default function Product() {
  const { id } = useParams();
  const product = findBy(products, 'id', id);
  const { nominalOptions } = nominalList[0];
  return (
    <div className="product">
      <ProductInformation product={product} />
      <ProductPayment product={product} nominalOptions={nominalOptions} />
    </div>
  )
}