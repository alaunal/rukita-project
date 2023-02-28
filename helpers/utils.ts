const APP_CONSTANT = {

  // -- rapid api 

  rapidapi_base_host: process.env.NEXT_PUBLIC_X_RAPIDAPI_BASE_HOST,
  rapidapi_host: process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST,
  rapidapi_key: process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY,

  // -- open street api

  osa_nominatim_base_host: process.env.NEXT_PUBLIC_NOMINATIM_BASE_URL,

  // -- google api

  google_api_key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
};

export default APP_CONSTANT;
