import { CartItem, Color } from '@prisma/client';
import { ProductImage } from './products';

export type TCartProductItem = CartItem & {
  product: ProductImage;
  color: Color;
};
