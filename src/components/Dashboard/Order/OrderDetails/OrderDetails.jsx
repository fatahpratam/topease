import './OrderDetails.css';
import { findBy, findNestedBy } from "../../../../utils/index.js";
import { products, paymentMethods } from "../../../../data/index.js";
import { useUserStorage, useOrder } from "../../../../contexts/index.js";
import dayjs from 'dayjs';

export default function OrderDetails({ order }) {
  const
    currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }),
    { loginInfo } = useUserStorage(),
    { getOrderStatus, simulateCancel } = useOrder(),
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
    finalAmount = cartTotalAmount + paymentMethod.adminAmount,
    orderStatuses = getOrderStatus(order.orderId);

  const handleOnClick = () => {
    simulateCancel(order.orderId);
  };

  return (
    <div className="order-details">
      <div className="order-details__container">
        <h2 className="order-details__h2">Detail Pembayaran</h2>
        <ProductList cart={order.cart} />
        <hr className="order-details__hr" />
        <p className="order-details__p">
          <span className="order-details__span">ID pesanan</span>
          {order.orderId}
        </p>
        <p className="order-details__p">
          <span className="order-details__span">Nomor WhatsApp</span>
          {loginInfo.phoneNumber}
        </p>
        <p className="order-details__p">
          <span className="order-details__span">Metode pembayaran</span>
          {paymentMethod.name}
        </p>
        <p className="order-details__p">
          <span className="order-details__span">Total tagihan</span>
          {currencyFormatter.format(finalAmount)}
        </p>
        <p className="order-details__p">
          <span className="order-details__span">Status pembayaran</span>
          {order.paymentStatus}
        </p>
        <p className="order-details__p">
          <span className="order-details__span">Status pesanan</span>
          {orderStatuses}
        </p>
        <p className="order-details__p">
          <span className="order-details__span">Waktu pesanan</span>
          {date.format('DD/MM/YYYY HH:mm')}
        </p>
      </div>
      <button
        className="order-details__button"
        onClick={handleOnClick}
        disabled={order.cancelled || orderStatuses.includes('Semua')}
      >Batalkan pesanan</button>
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