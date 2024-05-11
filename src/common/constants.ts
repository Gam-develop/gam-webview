import { KEYS } from './constants-keys';

// 환경 유형 정의
export const APP_ENV_TYPE = {
  // 개발환경
  DEV: 'development',
  // 프로덕션 환경
  PROD: 'production',
};

const AppConfig = {
  // 현재 애플리케이션의 환경을 나타냄
  ENV: APP_ENV_TYPE.PROD,
  /**
   * API SERVER
   */
  API_SERVER: import.meta.env.VITE_API_URI,
  // 프론트엔드 호스트 주소
  FRONT_HOST: import.meta.env.VITE_DEV_URL,
  // 카카오 로그인 redirect url
  REDIRECT_URL: import.meta.env.VITE_REDIRECT_URL,
  // 그 외
  KEYS,
};
export default AppConfig;
