import { createContext, useContext, useState } from "react";

export const StorageContext = createContext({
  loginInfo: {},
  setLoginInfo: () => { },
  getLoginInfo: () => { },
  removeLoginInfo: () => { },
  checkLoginInfo: () => { },
  isLoginInfoExist: () => { },
});

export const StorageProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState({});

  function setLoginInfo(name, email, password) {
    if (getRemember()) {
      localStorage.setItem('loginInfo', JSON.stringify({
        name, email, password
      }));
    } else {
      sessionStorage.setItem('loginInfo', JSON.stringify({
        name, email, password
      }));
    }
  }

  function getLoginInfo() {
    if (getRemember())
      return JSON.parse(localStorage.getItem('loginInfo'));
    else
      return JSON.parse(sessionStorage.getItem('loginInfo'));
  }

  function removeLoginInfo() {
    if (getRemember())
      localStorage.removeItem('loginInfo');
    else
      sessionStorage.removeItem('loginInfo');
  }

  function checkLoginInfo(email, password) {
    const loginInfo = getLoginInfo();
    return loginInfo.email === email && loginInfo.password === password;
  }

  function isLoginInfoExist() {
    const loginInfo = getLoginInfo();
    console.log(loginInfo);
    return Object.keys(loginInfo).length > 0;
  }
  return (
    <StorageContext.Provider>
      {children}
    </StorageContext.Provider>
  )
};

export function useStorage() {
  return useContext(StorageContext);
}