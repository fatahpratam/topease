import './OrderDetails.css';
import { findBy, findNestedBy } from "../../../../utils/index.js";
import { products, paymentMethods } from "../../../../data/index.js";
import { useUserStorage, useOrder } from "../../../../contexts/index.js";
import dayjs from 'dayjs';

export default function OrderDetails({ order }) {
  const
    currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }),
    { loginInfo } = useUserStorage(),
    { getOrderStatus } = useOrder(),
    paymentMethod = findNestedBy(paymentMethods, 'subMethods', 'id', order.paymentMethodId),
    date = dayjs(order.orderDate),
    cartTotalAmount = order.cart.reduce((prev, curr) => {
      const
        product = findBy(products, 'id', curr.productId),
        nominalOption = findBy(product.nominalOptions, 'id', curr.nominalOptionId),
        totalAmount = nominalOption.idrAmount + nominalOption.adminAmount,
        discountAmount = Math.floor((totalAmount) * product.discount / 100),
        finalAmount = totalAmount - discountAmount;
      return prev + finalAmount;
    }, 0),
    finalAmount = cartTotalAmount + paymentMethod.adminAmount;

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
        <span className="order-details__span">{currencyFormatter.format(finalAmount)}</span>
      </p>
      <p className="order-details__p">
        Status pembayaran
        <span className="order-details__span">{order.paymentStatus}</span>
      </p>
      <p className="order-details__p">
        Status pesanan
        <span className="order-details__span">{getOrderStatus(order.orderId)}</span>
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
    currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }),
    product = findBy(products, 'id', item.productId),
    nominalOption = findBy(product.nominalOptions, 'id', item.nominalOptionId),
    totalAmount = nominalOption.idrAmount + nominalOption.adminAmount,
    discountAmount = Math.floor((totalAmount) * product.discount / 100),
    finalAmount = totalAmount - discountAmount;

  return (
    <li className="order-details__li">
      <img src={product.imgUrl} alt={product.name} className="order-details__icon" />
      <p>{product.name}</p>
      <div className="order-details__sub-container">
        <span className="order-details__span">{nominalOption.name}</span>
        <p>{currencyFormatter.format(finalAmount)}</p>
      </div>
    </li>
  )
}