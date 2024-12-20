import { createContext, useContext, useState } from "react";
import { users } from "../data/index.js";

const UserStorageContext = createContext({
  loginInfo: {},
  loginDatabase: {},
  remember: false,
  toggleRemember: () => { },
  register: (name, phoneNumber, password) => { },
  login: (phoneNumber, password) => { },
  logout: () => { },
  isLoggedIn: () => { },
  changePassword: (phoneNumber, newPassword) => { },
  isAccountExist: (name, phoneNumber) => { },
  isNumberExist: (phoneNumber) => { },
  addToCart: (product) => { },
  handleCartItemChange: (productId, property, value) => { },
  getCartItem: (productId) => { },
  removeFromCart: (productId) => { },
  isCartItemExist: (productId) => { },
  toggleCartItem: (productId) => { },
  toggleAllCartItem: (isChecked) => { },
  isEveryCartItemChecked: () => { },
  getCheckedCartItem: () => { },
  removeCheckedFromCart: () => { }
});

export const UserStorageProvider = ({ children }) => {
  const [remember, setRemember] = useState(
    JSON.parse(localStorage.getItem('remember')) || false
  );
  const [loginInfo, setLoginInfo] = useState(
    JSON.parse(accessStorage('getItem', 'loginInfo')) || {}
  );
  const [loginDatabase, setLoginDatabase] = useState(
    JSON.parse(accessStorage('getItem', 'loginDatabase')) || users
  );

  function accessStorage(property, ...args) {
    if (remember)
      return localStorage[property](...args);
    else
      return sessionStorage[property](...args);
  }

  function toggleRemember() {
    setRemember(prev => {
      const newRemember = !prev;
      localStorage.setItem('remember', `${newRemember}`);
      const loginInfo = accessStorage('getItem', 'loginInfo');
      const loginDatabase = accessStorage('getItem', 'loginDatabase');
      accessStorage('removeItem', 'loginInfo');
      accessStorage('removeItem', 'loginDatabase');
      if (newRemember) {
        loginInfo && localStorage.setItem('loginInfo', loginInfo);
        loginDatabase && localStorage.setItem('loginDatabase', loginDatabase);
      } else {
        loginInfo && sessionStorage.setItem('loginInfo', loginInfo);
        loginDatabase && sessionStorage.setItem('loginDatabase', loginDatabase);
      }
      return newRemember;
    });
  }

  function register(name, phoneNumber, password) {
    const newUser = {
      id: crypto.randomUUID(), name, phoneNumber, password
    };
    setLoginDatabase(prev => {
      const updatedDatabase = [...prev, newUser];
      accessStorage('setItem', 'loginDatabase', JSON.stringify(updatedDatabase));
      return updatedDatabase;
    });
    setLoginInfo(newUser);
    accessStorage('setItem', 'loginInfo', JSON.stringify(newUser));
  }

  function login(phoneNumber, password) {
    const user = loginDatabase.find(user => {
      return user.phoneNumber === phoneNumber && user.password === password
    });
    if (user !== undefined) {
      setLoginInfo(user);
      accessStorage('setItem', 'loginInfo', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  function changePassword(phoneNumber, newPassword) {
    const user = loginDatabase.find(
      user => user.phoneNumber === phoneNumber && user.password === newPassword
    );
    if (user === undefined) {
      setLoginDatabase(prev => {
        const updatedDatabase = prev.map(user => {
          if (user.phoneNumber === phoneNumber)
            return { ...user, password: newPassword };
          return { ...user };
        });
        accessStorage('setItem', 'loginDatabase', JSON.stringify(updatedDatabase));
        return updatedDatabase;
      });
      return true;
    }
    else {
      return false;
    }
  }

  function logout() {
    setLoginInfo(() => {
      accessStorage('removeItem', 'loginInfo');
      return {};
    });
  }

  function isLoggedIn() {
    return Object.keys(loginInfo).length !== 0;
  }

  function isAccountExist(name, phoneNumber) {
    const user = loginDatabase.find(
      user => user.name === name && user.phoneNumber === phoneNumber
    );
    return user !== undefined;
  }

  function isNumberExist(phoneNumber) {
    const user = loginDatabase.find(
      user => user.phoneNumber === phoneNumber
    );
    return user !== undefined;
  }

  function addToCart(product) {
    setLoginDatabase(prev => {
      const updatedDatabase = prev.map(user => {
        if (user.id === loginInfo.id) {
          return {
            ...user,
            cart: [product, ...(user.cart || [])]
          };
        }
        return { ...user };
      });
      const updatedUser = updatedDatabase.find(
        user => user.id === loginInfo.id
      );
      setLoginInfo(updatedUser);
      accessStorage('setItem', 'loginInfo', JSON.stringify(updatedUser));
      accessStorage('setItem', 'loginDatabase', JSON.stringify(updatedDatabase));
      return updatedDatabase;
    });
  }

  function handleCartItemChange(productId, property, value) {
    setLoginDatabase(prev => {
      const updatedDatabase = prev.map(user => {
        if (user.id === loginInfo.id) {
          const newCart = user.cart.map(item => {
            if (item.productId === productId) {
              return { ...item, [property]: value }
            };
            return { ...item };
          });
          return { ...user, cart: newCart };
        }
        return { ...user };
      });
      const updatedUser = updatedDatabase.find(
        user => user.id === loginInfo.id
      )
      setLoginInfo(updatedUser);
      accessStorage('setItem', 'loginInfo', JSON.stringify(updatedUser));
      accessStorage('setItem', 'loginDatabase', JSON.stringify(updatedDatabase));
      return updatedDatabase;
    });
  }

  function toggleCartItem(productId) {
    setLoginDatabase(prev => {
      const updatedDatabase = prev.map(user => {
        if (user.id === loginInfo.id) {
          const newCart = user.cart.map(item => {
            if (item.productId === productId) {
              return { ...item, isChecked: !item.isChecked };
            }
            return { ...item };
          });
          return { ...user, cart: newCart };
        }
        return { ...user };
      });
      const updatedUser = updatedDatabase.find(
        user => user.id === loginInfo.id
      );
      setLoginInfo(updatedUser);
      accessStorage('setItem', 'loginInfo', JSON.stringify(updatedUser));
      accessStorage('setItem', 'loginDatabase', JSON.stringify(updatedDatabase));
      return updatedDatabase;
    });
  }

  function toggleAllCartItem(isChecked) {
    setLoginDatabase(prev => {
      const updatedDatabase = prev.map(user => {
        if (user.id === loginInfo.id) {
          const newCart = user.cart.map(
            item => ({ ...item, isChecked: isChecked })
          );
          return { ...user, cart: newCart };
        }
        return { ...user };
      });
      const updatedUser = updatedDatabase.find(
        user => user.id === loginInfo.id
      );
      setLoginInfo(updatedUser);
      accessStorage('setItem', 'loginInfo', JSON.stringify(updatedUser));
      accessStorage('setItem', 'loginDatabase', JSON.stringify(updatedDatabase));
      return updatedDatabase;
    });
  }

  function isEveryCartItemChecked() {
    return Object.keys(loginInfo.cart).length > 0
      && loginInfo.cart.every(
        item => item.isChecked
      );
  }

  function getCartItem(productId) {
    return loginInfo.cart.find(
      item => item.productId === productId
    );
  }

  function getCheckedCartItem() {
    return loginInfo.cart.filter(
      item => item.isChecked
    ).map(item => {
      delete item.isChecked;
      return { ...item };
    });
  }

  function removeFromCart(productId) {
    setLoginDatabase(prev => {
      const updatedDatabase = prev.map(user => {
        if (user.id === loginInfo.id) {
          const newCart = user.cart.filter(
            item => item.productId !== productId
          );
          return { ...user, cart: newCart };
        }
        return { ...user };
      });
      const updatedUser = updatedDatabase.find(
        user => user.id === loginInfo.id
      );
      setLoginInfo(updatedUser);
      accessStorage('setItem', 'loginInfo', JSON.stringify(updatedUser));
      accessStorage('setItem', 'loginDatabase', JSON.stringify(updatedDatabase));
      return updatedDatabase;
    });
  }

  function removeCheckedFromCart() {
    setLoginDatabase(prev => {
      const updatedDatabase = prev.map(user => {
        if (user.id === loginInfo.id) {
          const newCart = user.cart.filter(
            item => !item.isChecked
          );
          return { ...user, cart: newCart };
        }
        return { ...user };
      });
      const updatedUser = updatedDatabase.find(
        user => user.id === loginInfo.id
      );
      setLoginInfo(updatedUser);
      accessStorage('setItem', 'loginInfo', JSON.stringify(updatedUser));
      accessStorage('setItem', 'loginDatabase', JSON.stringify(updatedDatabase));
      return updatedDatabase;
    });
  }

  function isCartItemExist(productId) {
    return loginInfo.cart?.find(
      item => item.productId === productId
    ) !== undefined;
  }

  return (
    <UserStorageContext.Provider
      value={{ loginInfo, loginDatabase, remember, toggleRemember, register, login, logout, isLoggedIn, changePassword, isAccountExist, isNumberExist, addToCart, handleCartItemChange, getCartItem, removeFromCart, isCartItemExist, toggleCartItem, getCheckedCartItem, removeCheckedFromCart, toggleAllCartItem, isEveryCartItemChecked }}
    >
      {children}
    </UserStorageContext.Provider>
  )
}

export function useUserStorage() {
  return useContext(UserStorageContext);
}