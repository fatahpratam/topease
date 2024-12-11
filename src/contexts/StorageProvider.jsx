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
  isLoggedIn: () => { }
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
    const existingUser = loginDatabase.find(user => {
      return user.name === name || user.phoneNumber === phoneNumber;
    });
    if (existingUser === undefined) {
      const newUser = {
        id: crypto.randomUUID(), name, phoneNumber, password
      };
      setLoginDatabase(prev => {
        prev.push(newUser);
        accessStorage('setItem', 'loginDatabase', JSON.stringify(prev));
        return prev;
      });
      return true;
    } else {
      return false;
    }
  }

  function login(phoneNumber, password) {
    const user = loginDatabase.find(data => {
      return data.phoneNumber === phoneNumber && data.password === password
    });
    if (user === undefined) {
      return false;
    } else {
      setLoginInfo(user);
      accessStorage('setItem', 'loginInfo', JSON.stringify(user));
      return true;
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
  return (
    <StorageContext.Provider
      value={{ loginInfo, loginDatabase, remember, toggleRemember, register, login, logout, isLoggedIn }}
    >
      {children}
    </StorageContext.Provider>
  )
}

export function useStorage() {
  return useContext(StorageContext);
}