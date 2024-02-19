import ProductItem from '@/components/ProductItem';
import { cn } from '@/lib/utils';
import { ProductImage } from '@/types/products';

export default function ProductList({ className, data = [] }: { className?: string; data?: ProductImage[] }) {
  return (
    <div className={cn('grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5', className)}>
      {data.map((product) => (
        <ProductItem key={product.id} product={product}></ProductItem>
      ))}
    </div>
  );
}
