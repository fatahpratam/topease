import './HistoryDetails.css';
import dayjs from 'dayjs';
import { useOrder, useUserStorage } from "../../../../contexts/index.js";
import { ProtectedRoute } from "../../../Utilities/index.js";
import { findBy, findNestedBy } from "../../../../utils/index.js";
import { products, paymentMethods } from "../../../../data/index.js";

export default function HistoryDetails({ id }) {
  const
    { getOrder, getOrderStatus } = useOrder(),
    { loginInfo } = useUserStorage(),
    order = getOrder(id),
    currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }),
    paymentMethod = findNestedBy(paymentMethods, 'subMethods', 'id', order.paymentMethodId),
    { cartTotalAmount, cartTotalAdmin } = order.cart.reduce((prev, curr) => {
      const
        product = findBy(products, 'id', curr.productId),
        nominalOption = findBy(product.nominalOptions, 'id', curr.nominalOptionId),
        totalAmount = nominalOption.idrAmount + nominalOption.adminAmount,
        discountAmount = Math.floor((totalAmount) * product.discount / 100),
        finalAmount = totalAmount - discountAmount;

      return {
        cartTotalAmount: prev.cartTotalAmount + finalAmount,
        cartTotalAdmin: prev.cartTotalAdmin + nominalOption.adminAmount
      };
    }, { cartTotalAmount: 0, cartTotalAdmin: 0 }),
    finalAmount = cartTotalAmount + paymentMethod.adminAmount,
    finalAdmin = cartTotalAdmin + paymentMethod.adminAmount,
    orderStatuses = getOrderStatus(order.orderId);

  return (
    <ProtectedRoute to={'/dashboard/history'} condition={!order || loginInfo.id !== order.userId}>
      <div className="history-details">
        <h2 className="history-details__h2">Detail Riwayat</h2>
        <p className="history-details__p">
          <span className="history-details__span">ID pesanan</span>
          {order.orderId}
        </p>
        <p className="history-details__p">
          Metode pembayaran
          <span className="history-details__span">{paymentMethod.name}</span>
        </p>
        <p className="history-details__p">
          Total admin
          <span className="history-details__span">{currencyFormatter.format(finalAdmin)}</span>
        </p>
        <p className="history-details__p">
          Total tagihan
          <span className="history-details__span">{currencyFormatter.format(finalAmount)}</span>
        </p>
        <p className="history-details__p">
          Status pembayaran
          <span className="history-details__span">{order.paymentStatus}</span>
        </p>
        <p className="history-details__p">
          Status pesanan
          <span className="history-details__span">{orderStatuses}</span>
        </p>
        <p className="history-details__p">
          Waktu pesanan
          <span className="history-details__span">{dayjs(order.orderDate).format('DD/MM/YYYY HH:mm')}</span>
        </p>
        <hr className="history-details__hr" />
        <h3 className="history-details__h3">Detail keranjang</h3>
        <CartList cart={order.cart} />
      </div>
    </ProtectedRoute>
  );
}

function CartList({ cart }) {
  return (
    <ul className="history-details__ul">
      {cart.map(
        item => <CartItem item={item} />
      )}
    </ul>
  );
}

function CartItem({ item }) {
  const
    { productId, nominalOptionId, orderStatus, ...extraFields } = item,
    currencyFormatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }),
    product = findBy(products, 'id', productId),
    nominalOption = findBy(product.nominalOptions, 'id', nominalOptionId),
    totalAmount = nominalOption.idrAmount + nominalOption.adminAmount,
    discountAmount = Math.floor((totalAmount) * product.discount / 100),
    finalAmount = totalAmount - discountAmount;

  return (
    <li className="history-details__li">
      <details className="history-details__details">
        <summary className="history-details__summary">
          <img src={product.imgUrl} alt={product.name} className="history-details__img" />
          <div className="history-details__sub-container">
            <p>{product.name}</p>
            <p>{nominalOption.name}</p>
          </div>
          <span>{currencyFormatter.format(finalAmount)}</span>
        </summary>
        <div className="history-details__container">
          <h3 className="history-details__h3">Informasi Tambahan</h3>
          {
            Object.keys(extraFields).map(field => {
              const labelId = `${product.name}-${field}`;
              return (
                <p className="history-details__p" key={labelId}>
                  <label
                    htmlFor={labelId}
                    className="history-details__label"
                  >
                    {field.toLowerCase()}:
                  </label>
                  <input
                    id={labelId}
                    type="text"
                    className="history-details__input"
                    value={extraFields[field]}
                    readOnly
                  />
                </p>
              )
            })
          }
        </div>
      </details>
    </li>
  )
}