interface ImportMeta {
  env: {
    VITE_API_URI: string;
    VITE_TEMP_TOKEN: string;
    VITE_IMAGE_URL: string;
    VITE_DEV_URL: string;
    VITE_JS_KEY: string;
    VITE_REDIRECT_URL: string;
  };
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
