import dayjs from "dayjs";
import { useContext, createContext, useState, useEffect } from "react";

const OrderContext = createContext({
  startCountdown: (orderId) => { },
  addOrder: (userId, paymentMethodId, cart) => { },
  updateOrder: (orderId) => { },
  getOrder: (orderId) => { },
  filterOrderBy: (userId, duration, paymentStatus, orderStatus) => { },
  countdown: '--j --m --s',
  checkPaymentStatus: (orderId) => { },
  getOrderStatus: (orderId) => { },
  simulateOrder: (orderId) => { },
  simulateCancel: (orderId) => { },
  mountAction: (orderId) => { },
  unmountAction: () => { }
});

export const OrderStorageProvider = ({ children }) => {
  const
    [countdown, setCountdown] = useState('--j --m --s'),
    [actionIntervalId, setActionIntervalId] = useState(0),
    [countdownIntervalId, setCountdownIntervalId] = useState(0),
    [orders, setOrders] = useState(
      JSON.parse(localStorage.getItem('orders')) || []
    );

  function startCountdown(orderId) {
    const order = getOrder(orderId);
    useEffect(() => {
      let intervalId = 0;
      if (order.paymentStatus === 'Menunggu pembayaran') {
        intervalId = setInterval(() => {
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
              localStorage.setItem('orders', JSON.stringify(newOrders));
              return newOrders;
            });
          }
          setCountdown(countdown);
        }, 1000);
        setCountdownIntervalId(prev => {
          clearInterval(prev);
          return intervalId;
        });
      }

      return () => clearInterval(intervalId);
    }, []);
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
      localStorage.setItem('orders', JSON.stringify(newOrders));
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
      localStorage.setItem('orders', JSON.stringify(newOrders));
      return newOrders;
    });
  }

  function getOrder(orderId) {
    return orders.find(
      order => order.orderId === orderId
    );
  }

  function filterOrderBy(userId, duration, paymentStatus, orderStatus) {
    const pastDate = dayjs().subtract(duration, 'day');
    return orders.filter(order => {
      return order.userId === userId;
    }).filter(order => {
      return duration === 'Semua' || dayjs(order.orderDate).diff(pastDate) > 0;
    }).filter(order => {
      return paymentStatus === 'Semua' || order.paymentStatus === paymentStatus;
    }).filter(order => {
      return orderStatus === 'Semua' || getOrderStatus(order.orderId) === orderStatus;
    });
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
      localStorage.setItem('orders', JSON.stringify(newOrders));
      clearInterval(countdownIntervalId);
      setCountdown('--j --m --s');
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

  function simulateOrder(orderId) {
    const newIntervalId = setInterval(() => {
      setOrders((prev) => {
        let modified = false;
        const newOrders = prev.map((order) => {
          if (order.orderId === orderId) {
            const newCart = order.cart.map((cartItem) => {
              if (cartItem.orderStatus !== 'Terkirim' && !modified) {
                modified = true;
                return { ...cartItem, orderStatus: 'Terkirim' };
              }
              return { ...cartItem };
            });
            return { ...order, cart: newCart };
          }
          return { ...order };
        });
        if (!modified) clearInterval(newIntervalId);
        localStorage.setItem('orders', JSON.stringify(newOrders));
        return newOrders;
      });
    }, 2000);
    setActionIntervalId(prev => {
      clearInterval(prev);
      return newIntervalId;
    });
  }

  function simulateCancel(orderId) {
    clearInterval(countdownIntervalId);
    setCountdown('--j --m --s');
    if (getOrder(orderId).paymentStatus === 'Menunggu pembayaran') {
      setOrders(prev => {
        const newOrders = prev.map(order => {
          if (order.orderId === orderId) {
            const newCart = order.cart.map(cartItem => {
              return { ...cartItem, orderStatus: 'Dibatalkan' };
            });
            return { ...order, cart: newCart, paymentStatus: 'Dibatalkan', cancelled: true };
          }
          return { ...order };
        });
        localStorage.setItem('orders', JSON.stringify(newOrders));
        return newOrders;
      });
    }
    else {
      setOrders(prev => {
        const newOrders = prev.map(order => {
          if (order.orderId === orderId) {
            return { ...order, paymentStatus: 'Dibatalkan', cancelled: true };
          }
          return { ...order };
        });
        localStorage.setItem('orders', JSON.stringify(newOrders));
        return newOrders;
      });
      const newIntervalId = setInterval(() => {
        setOrders(prev => {
          let modified = false;
          const newOrders = prev.map(order => {
            if (order.orderId === orderId) {
              const newCart = order.cart.map(cartItem => {
                if (cartItem.orderStatus !== 'Dibatalkan' && !modified) {
                  modified = true;
                  return { ...cartItem, orderStatus: 'Dibatalkan' };
                }
                return { ...cartItem };
              });
              return { ...order, cart: newCart };
            }
            return { ...order };
          });
          if (!modified) clearInterval(newIntervalId);
          localStorage.setItem('orders', JSON.stringify(newOrders));
          return newOrders;
        });
      }, 2000);
      setActionIntervalId(prev => {
        clearInterval(prev);
        return newIntervalId;
      });
    }
  }

  function mountAction(orderId) {
    useEffect(() => {
      const order = getOrder(orderId);
      if (order.paymentStatus === 'Lunas' && getOrderStatus(orderId) !== 'Semua terkirim')
        simulateOrder(orderId);
      else if (order.paymentStatus === 'Dibatalkan' && getOrderStatus(orderId) !== 'Semua dibatalkan')
        simulateCancel(orderId)
    }, []);
  }

  function unmountAction() {
    useEffect(() => {
      return () => {
        clearInterval(actionIntervalId);
      };
    }, [actionIntervalId]);
  }

  return (<OrderContext.Provider value={{
    addOrder, updateOrder, getOrder, filterOrderBy, countdown,
    startCountdown, checkPaymentStatus, getOrderStatus, simulateOrder,
    simulateCancel, mountAction, unmountAction
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