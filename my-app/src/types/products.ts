import { ResponseApi } from "./utils";

interface TimeTamps {
  createdAt: string;
  updatedAt: string;
}

export interface IImage extends TimeTamps {
  _id: string;
  url: string;
}

export interface IColor extends TimeTamps {
  _id: string;
  name: string;
}
export interface IStorage extends TimeTamps {
  _id: string;
  name: string;
  code: string;
  unit: number;
}

export interface IInventory {
  _id: string;
  quantity: number;
  price: number;
  color: IColor | string;
  storage: IStorage | string;
}
export interface IProduct extends TimeTamps {
  _id: string;
  name: string;
  description: string;
  price: number;
  user_id: string;
  images: IImage[] | string[] | string;
  // specs: IInventory[];
}

export type TProductResponse = ResponseApi<{
  data: IProduct[];
  page: number;
  limit: number;
  total: number;
}>;

export type TProductDetailResponse = ResponseApi<IProduct>;

export type SortDirection = "asc" | "desc";

export interface ProductCheckout {
  id: string;
  quantity: number;
}
