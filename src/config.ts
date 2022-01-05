import { AxiosRequestConfig } from "axios";
import { template } from "koishi";

export interface MacroDictConfig {
  aliases?: string[];
  template?: template.Node;
  axiosConfig?: AxiosRequestConfig;
}
