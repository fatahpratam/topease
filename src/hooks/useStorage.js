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
  return loginInfo !== null && Object.keys(loginInfo).length > 0;
}

function setRemember(remember) {
  localStorage.setItem('remember', String(remember));
}

function getRemember() {
  return JSON.parse(localStorage.getItem('remember'));
}

export default function useStorage() {
  return { setLoginInfo, getLoginInfo, setRemember, getRemember, removeLoginInfo, checkLoginInfo, isLoginInfoExist };
}