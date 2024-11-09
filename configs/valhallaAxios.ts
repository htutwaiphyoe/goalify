import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.PROD_API_BASE_URL
      : process.env.DEV_API_BASE_URL,
});
