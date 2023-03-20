const getUserToken = () => window.localStorage.getItem('AUTH_TOKEN');

const isLoggedIn = () => {
  const token = window.localStorage.getItem('AUTH_TOKEN');
  if (token !== undefined) {
    return token;
  } else {
    return null;
  }
};

const setUserToken = (token) =>
  window.localStorage.setItem('AUTH_TOKEN', token);

const removeUserToken = () => {
  window.localStorage.removeItem('AUTH_TOKEN');
};

export { isLoggedIn, setUserToken, getUserToken, removeUserToken };
