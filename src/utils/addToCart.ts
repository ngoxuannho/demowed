import { message } from "antd";
export interface iCart {
  id: number;
  thumbImg?: string;
  options: string;
  qty: number;
  size: number;
  name: string;
  price: number;
  colorway: string[],
}
