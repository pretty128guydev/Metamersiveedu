export const getLoggedIn = () => {
  if (typeof window !== "undefined") {
    const isLogedIn = localStorage.getItem("isLoggedIn");
    return isLogedIn === "true";
  }
  return false;
};

export const getUserInfo = () => {
  if (typeof window !== "undefined") {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : undefined;
  }
  return undefined;
};

export const textAreaShow = (string) => {
  return string.replace(/\n/g, "<br />");
};

export const convertBytes = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = (bytes / Math.pow(1024, i)).toFixed(2);
  return `${value} ${sizes[i]}`;
};
