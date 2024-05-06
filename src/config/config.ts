const config = {
  NODE_ENV: import.meta.env.NODE_ENV,
  APP_ENV: import.meta.env.SGDG_APP_ENV,
  BASE_URI: `${import.meta.env.SGDG_API_URI}`,
  API_ENDPOINT: `${import.meta.env.SGDG_API_ENDPOINT}`,
};
export default config;
