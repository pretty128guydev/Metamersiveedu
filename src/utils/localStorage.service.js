export const persistLoggedIn = (isLoggedIn) => {
  localStorage.setItem("isLoggedIn", isLoggedIn);
};

export const readLoggedIn = () => {
  return localStorage.getItem("isLoggedIn")
    ? localStorage.getItem("isLoggedIn") === "true"
    : false;
};

export const persistUserInfo = (userInfo) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const readUserInfo = () => {
  const userStr = localStorage.getItem("userInfo");
  return userStr ? JSON.parse(userStr) : null;
};

export const deleteLoggedIn = () => localStorage.removeItem("isLoggedIn");
export const deleteUserInfo = () => localStorage.removeItem("userInfo");
