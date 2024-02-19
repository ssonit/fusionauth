export type ProductImage = any;
//  Product & {
//   images: Image[];
// };

export type SortDirection = "asc" | "desc";

export interface ProductCheckout {
  id: string;
  name: string;
  price: number;
  color: {
    name: string;
    id: string;
  };
  quantity: number;
  image: string;
  cartId?: string;
}
