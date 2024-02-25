import { ResponseApi, TimeTamps } from "./utils";

export interface IImage extends TimeTamps {
  _id: string;
  url: string;
}

export interface IProduct extends TimeTamps {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  user_id: string;
  images: IImage[] | string[] | string;
}

export type TProductResponse = ResponseApi<{
  data: IProduct[];
  page: number;
  limit: number;
  total: number;
}>;

export type TProductDetailResponse = ResponseApi<IProduct>;

export type TSortDirection = "asc" | "desc";
export enum ESortDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface ProductCheckout {
  id: string;
  quantity: number;
}
