import dayjs from "dayjs";
import { useState } from "react";

const [orders, setOrders] = useState(
  JSON.parse(localStorage.getItem('order')) || []
);

function addOrder(userId, cart) {
  const date = dayjs().format();
  setOrders(prev => {
    const newOrder = [...prev].unshift({
      orderId: crypto.randomUUID(),
      userId,
      date,
      paymentStatus: 'Belum Bayar',
      orderStatus: 'Belum Bayar',
      cart
    });
    localStorage.setItem('order', JSON.stringify(newOrder));
    return newOrder;
  });
}

function updateOrder(orderId, property, value) {
  setOrders(prev => {
    const newOrder = prev.map(order => {
      if (order.orderId === orderId) {
        return { ...order, [property]: value };
      }
      return { ...order };
    });
    localStorage.setItem('order', JSON.stringify(newOrder));
    return newOrder;
  });
}

function getOrder(orderId) {
  return orders.find(
    order => order.orderId === orderId
  );
}

function filterOrderBy(property, value) {
  return orders.filter(order =>
    order[property] === value
  );
}

export function useOrder() {
  return { addOrder, updateOrder, getOrder, filterOrderBy };
}