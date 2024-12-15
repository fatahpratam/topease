import './Product.css';
import { useParams } from "react-router-dom";
import { findBy } from "../../../utils/index.js";
import { products } from "../../../data/index.js";
import ProductInformation from './ProductInformation/ProductInformation.jsx';
import ProductPayment from './ProductPayment/ProductPayment.jsx';
import { ProductStorageProvider } from "../../../contexts/ProductStorageProvider.jsx";

export default function Product() {
  const { id } = useParams();
  const product = findBy(products, 'id', id);
  return (
    <div className="product">
      <ProductStorageProvider>
        <ProductInformation product={product} />
        <ProductPayment product={product} />
      </ProductStorageProvider>
    </div>
  )
}