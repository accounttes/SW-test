import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.REACT_APP_API_URL;
const version = "/v1";

const config: AxiosRequestConfig = {
  baseURL: `${baseURL}/${version}`,
};

export const instance = axios.create(config);

interface AxiosRequestExtendedConfig<T> extends AxiosRequestConfig {}

export const httpRequest = async <T>(
  options: AxiosRequestExtendedConfig<T>
) => {
  try {
    const { ...opt } = options;
    const { data } = await instance<T>(opt);

    return data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
