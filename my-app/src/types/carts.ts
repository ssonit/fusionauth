import { IProduct } from "./products";
import { ResponseApi } from "./utils";

export type TCartProductItem = IProductCart;

export interface IProductCart {
  _id: string;

  user_id: string;

  product: IProduct;

  quantity: number;
}

export type TCartProductResponse = ResponseApi<{
  data: IProductCart[];
  page: number;
  limit: number;
  total: number;
}>;
