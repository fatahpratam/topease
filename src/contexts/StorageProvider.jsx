import { createContext, useContext, useState } from "react";
import { users } from "../data/index.js";

const StorageContext = createContext({
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
  isNumberExist: (phoneNumber) => { }
});

export const StorageProvider = ({ children }) => {
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
      prev.push(newUser);
      accessStorage('setItem', 'loginDatabase', JSON.stringify(prev));
      return prev;
    });
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
        for (const user of prev) {
          if (user.phoneNumber === phoneNumber) {
            user.password = newPassword;
            break;
          }
        }
        accessStorage('setItem', 'loginDatabase', JSON.stringify(prev));
        return prev;
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

  return (
    <StorageContext.Provider
      value={{ loginInfo, loginDatabase, remember, toggleRemember, register, login, logout, isLoggedIn, changePassword, isAccountExist, isNumberExist }}
    >
      {children}
    </StorageContext.Provider>
  )
}

export function useStorage() {
  return useContext(StorageContext);
}