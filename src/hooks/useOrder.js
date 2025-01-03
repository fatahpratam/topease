import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useCountdown } from "../hooks/index.js";

export function useOrder() {
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem('order')) || []
  );
  const [intervalId, setIntervalId] = useState(0);

  const [countdown, setCountdown] = useState('--j --m --s');

  function startCountdown(orderId) {
    const order = getOrder(orderId);
    useEffect(() => {
      const intervalId = setInterval(() => {
        const countdown = getCountdown(order.date);
        if (countdown === '0j 0m 0s') {
          clearInterval(intervalId);
          setOrders(prev => {
            const newOrders = prev.map(order => {
              if (order.orderId === orderId) {
                const newCart = order.cart.map(
                  cartItem => ({ ...cartItem, orderStatus: 'Jatuh tempo' })
                );
                return {
                  ...order,
                  cart: newCart,
                  paymentStatus: 'Jatuh tempo',
                  expired: true
                };
              }
              return { ...order };
            });
            localStorage.setItem('order', JSON.stringify(newOrders));
            return newOrders;
          });
        }
        setCountdown(countdown);
      }, 1000);

      return () => clearInterval(intervalId);
    }, [orderId]);
  }

  function addOrder(userId, paymentMethodId, cart) {
    const date = dayjs().format();
    setOrders(prev => {
      const newOrders = [...prev].unshift({
        orderId: crypto.randomUUID(),
        userId,
        paymentMethodId,
        date,
        paymentStatus: 'Menunggu pembayaran',
        cart: cart.map(cartItem => ({ ...cartItem, orderStatus: 'Menunggu pembayaran' })),
        cancelled: false,
        expired: false
      });
      localStorage.setItem('order', JSON.stringify(newOrders));
      return newOrders;
    });
  }

  function updateOrder(orderId, property, value) {
    setOrders(prev => {
      const newOrders = prev.map(order => {
        if (order.orderId === orderId) {
          return { ...order, [property]: value };
        }
        return { ...order };
      });
      localStorage.setItem('order', JSON.stringify(newOrders));
      return newOrders;
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

  function checkPaymentStatus(orderId) {
    setOrders(prev => {
      const newOrders = prev.map(order => {
        if (order.orderId === orderId) {
          const newCart = order.cart.map(
            cartItem => ({ ...cartItem, orderStatus: 'Dalam pemrosesan' })
          );
          return { ...order, paymentStatus: 'Lunas', cart: newCart };
        }
        return { ...order };
      });
      localStorage.setItem('order', JSON.stringify(newOrders));
      return newOrders;
    });
    simulateAction(orderId, 'order');
  }

  function clearIntervalId() {
    clearInterval(intervalId);
    setIntervalId(null);
  }

  function simulateAction(orderId, action) {
    const orderStatus = action === 'order'
      ? 'Terkirim'
      : action === 'cancel'
        ? 'Dibatalkan'
        : '';
    clearIntervalId();
    useEffect(() => {
      const intervalId = setInterval(() => {
        setOrders(prev => {
          let modified = false;
          const newOrders = prev.map(order => {
            if (order.orderId === orderId) {
              const newCart = order.cart.map(cartItem => {
                if (cartItem.orderStatus !== orderStatus && !modified) {
                  modified = true;
                  return { ...cartItem, orderStatus: orderStatus };
                }
                return { ...cartItem };
              });
              return { ...order, cart: newCart };
            }
            return { ...order };
          });
          if (!modified)
            clearIntervalId();
          localStorage.setItem('order', JSON.stringify(newOrders));
          return newOrders;
        });
      }, 2000);
      setIntervalId(intervalId);

      return () => clearIntervalId();
    }, []);
  }

  function getOrderStatus(orderId) {
    const order = getOrder(orderId);
    const { cart } = order;
    if (order.expired)
      return 'Jatuh tempo';
    else if (order.cancelled)
      return cart.every(cartItem => cartItem.orderStatus === 'Dibatalkan')
        ? 'Semua dibatalkan'
        : cart.some(cartItem => cartItem.orderStatus === 'Dibatalkan')
          ? 'Sebagian dibatalkan'
          : 'Dalam proses pengembalian';
    else
      return cart.every(cartItem => cartItem.orderStatus === 'Terkirim')
        ? 'Semua terkirim'
        : cart.some(cartItem => cartItem.orderStatus === 'Terkirim')
          ? 'Sebagian terkirim'
          : 'Dalam pemrosesan';
  }

  return {
    addOrder, updateOrder, getOrder, filterOrderBy, countdown,
    startCountdown, checkPaymentStatus, simulateAction, getOrderStatus
  };
}

function getCountdown(dateFormat) {
  const now = dayjs();
  const secondDifference = Math.max(dayjs(dateFormat).diff(now, 's'), 0);
  const hours = Math.floor(secondDifference / 3600);
  const minutes = Math.floor((secondDifference % 3600) / 60);
  const seconds = secondDifference % 60;

  return `${hours}j ${minutes}m ${seconds}s`;
}