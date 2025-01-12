import dayjs from "dayjs";
import { useContext, createContext, useState, useEffect } from "react";

const OrderContext = createContext({
  startCountdown: (orderId) => { },
  addOrder: (userId, paymentMethodId, cart) => { },
  updateOrder: (orderId) => { },
  getOrder: () => { },
  filterOrderBy: (property, value) => { },
  countdown: '--j --m --s',
  checkPaymentStatus: (orderId) => { },
  getOrderStatus: (orderId) => { },
  simulateAction: (orderId, action) => { }
});

export const OrderStorageProvider = ({ children }) => {
  const
    [countdown, setCountdown] = useState('--j --m --s'),
    [intervalId, setIntervalId] = useState(0),
    [orders, setOrders] = useState(
      JSON.parse(localStorage.getItem('order')) || []
    )

  function startCountdown(orderId) {
    const order = getOrder(orderId);
    useEffect(() => {
      const intervalId = setInterval(() => {
        const countdown = getCountdown(order.expiredDate);
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
    const
      orderDate = dayjs().format(),
      expiredDate = dayjs().add(1, 'day').format(),
      orderId = Date.now().toString(),
      newCart = cart.map(cartItem => {
        const { isChecked: _, ...newCartItem } = cartItem;
        return { ...newCartItem, orderStatus: 'Menunggu pembayaran' };
      });

    setOrders(prev => {
      const newOrders = [{
        orderId: orderId,
        userId,
        paymentMethodId,
        orderDate,
        expiredDate,
        paymentStatus: 'Menunggu pembayaran',
        cart: newCart,
        cancelled: false,
        expired: false
      }, ...prev];
      localStorage.setItem('order', JSON.stringify(newOrders));
      return newOrders;
    });
    return orderId;
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
    const order = orders.find(
      order => order.orderId === orderId
    );
    return { ...order };
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

  function simulateAction(orderId, action) {
    const orderStatus = action === 'order'
      ? 'Terkirim'
      : action === 'cancel'
        ? 'Dibatalkan'
        : '';
    clearIntervalId();

    useEffect(() => {
      const newIntervalId = setInterval(() => {
        setOrders((prev) => {
          let modified = false;
          const newOrders = prev.map((order) => {
            if (order.orderId === orderId) {
              const newCart = order.cart.map((cartItem) => {
                if (cartItem.orderStatus !== orderStatus && !modified) {
                  modified = true;
                  return { ...cartItem, orderStatus };
                }
                return { ...cartItem };
              });
              return { ...order, cart: newCart };
            }
            return { ...order };
          });
          if (!modified) clearIntervalId();
          localStorage.setItem('order', JSON.stringify(newOrders));
          return newOrders;
        });
      }, 2000);
      setIntervalId(newIntervalId);

      return () => clearIntervalId();
    }, []);
  }

  function clearIntervalId() {
    clearInterval(intervalId);
    setIntervalId(0);
  }

  return (<OrderContext.Provider value={{
    addOrder, updateOrder, getOrder, filterOrderBy, countdown,
    startCountdown, checkPaymentStatus, getOrderStatus, simulateAction
  }}>
    {children}
  </OrderContext.Provider>)
}

export function useOrder() {
  return useContext(OrderContext);
}

function getCountdown(dateFormat) {
  const now = dayjs();
  const secondDifference = Math.max(dayjs(dateFormat).diff(now, 's'), 0);
  const hours = Math.floor(secondDifference / 3600);
  const minutes = Math.floor((secondDifference % 3600) / 60);
  const seconds = secondDifference % 60;

  return `${hours}j ${minutes}m ${seconds}s`;
}