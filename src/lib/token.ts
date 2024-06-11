// accessToken 관리 함수
export const setAccessToken = (key: string, item: string) => {
  localStorage.setItem(key, item);
};

export const getAccessToken = (key: string) => localStorage.getItem(key);

export const removeAccessToken = (key: string) => {
  localStorage.removeItem(key);
};

// refreshToken 관리 함수
export const setRefreshToken = (key: string, item: string) => {
  localStorage.setItem(key, item);
};

export const getRefreshToken = (key: string) => localStorage.getItem(key);

export const removeRefreshToken = (key: string) => {
  localStorage.removeItem(key);
};

export const setUserSession = (accessToken: string, refreshToken: string) => {
  setAccessToken('accessToken', accessToken);
  setRefreshToken('refreshToken', refreshToken);
};

export const clearUserSession = () => {
  removeAccessToken('accessToken');
  removeRefreshToken('refreshToken');
};
