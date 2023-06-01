import axios from "axios";

const NEXT_HOST = process.env.NEXT_PUBLIC_HOST_API;

export const configHeaders = (token: string, contentType?: string) => {
  const config = {
    headers: {
      "Content-Type": contentType ? `${contentType}` : "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

export const config = {
  optionsHeader: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  base_url: NEXT_HOST,
};

export const api = axios.create({
  baseURL: config.base_url,
  timeout: 25000,
  headers: config.optionsHeader,
});
