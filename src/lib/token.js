export const setAccessToken = (key, item) => {
  localStorage.setItem(key, item);
};

export const getAccessToken = (key) => localStorage.getItem(key);

export const removeAccessToken = (key) => {
  localStorage.removeItem(key);
};

export const setUserSession = (accessToken) => {
  setAccessToken('accessToken', accessToken);
};

export const clearUserSession = () => {
  removeAccessToken('accessToken');
};
