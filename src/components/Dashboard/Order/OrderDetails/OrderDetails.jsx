import './OrderDetails.css';
import { findBy, findNestedBy } from "../../../../utils/index.js";
import { products, paymentMethods } from "../../../../data/index.js";
import { useUserStorage } from "../../../../contexts/index.js";
import dayjs from 'dayjs';

export default function OrderDetails({ order }) {
  const
    { loginInfo } = useUserStorage(),
    paymentMethod = findNestedBy(paymentMethods, 'subMethods', 'id', order.paymentMethodId),
    date = dayjs(order.date);

  return (
    <div className="order-details">
      <h2 className="order-details__h2">Detail Pembayaran</h2>
      <ProductList cart={order.cart} />
      <hr />
      <p className="order-details__p">
        ID pesanan
        <span className="order-details__span">{order.orderId}</span>
      </p>
      <p className="order-details__p">
        Nomor WhatsApp
        <span className="order-details__span">{loginInfo.phoneNumber}</span>
      </p>
      <p className="order-details__p">
        Metode pembayaran
        <span className="order-details__span">{paymentMethod.name}</span>
      </p>
      <p className="order-details__p">
        Total tagihan
        <span className="order-details__span">{paymentMethod.name}</span>
      </p>
      <p className="order-details__p">
        Status pembayaran
        <span className="order-details__span">{order.paymentStatus}</span>
      </p>
      <p className="order-details__p">
        Status pesanan
        <span className="order-details__span">{order.orderStatus}</span>
      </p>
      <p className="order-details__p">
        Waktu pesanan
        <span className="order-details__span">{date.format('DD/MM/YYYY HH:mm')}</span>
      </p>
    </div>
  )
}

function ProductList({ cart }) {
  return (
    <ul className="order-details__ul">
      {cart.map(
        item => <ProductItem item={item} key={item.productId} />
      )}
    </ul>
  )
}

function ProductItem({ item }) {
  const
    numberFormatter = Intl.NumberFormat('id-ID'),
    product = findBy(products, 'id', item.productId),
    nominalOption = findBy(product.nominalOptions, 'id', item.nominalOptionId),
    totalAmount = nominalOption.idrAmount + nominalOption.adminAmount,
    discountAmount = Math.floor((totalAmount) * discount / 100),
    finalAmount = totalAmount - discountAmount;

  return (
    <li className="order-details__li">
      <img src={product.imgUrl} alt={product.name} className="order-details__icon" />
      <p>{product.name}</p>
      <div className="order-detail__sub-container">
        <p>{nominalOption.name}</p>
        <p>{numberFormatter.format(finalAmount)}</p>
      </div>
    </li>
  )
}