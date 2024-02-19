'use client';

import { useEffect, useState } from 'react';
import Divider from '@/components/Divider';
import ProductList from '@/components/ProductList';
import { ProductImage } from '@/types/products';
import axios from 'axios';

export default function RelatedProduct({ className }: { className?: string }) {
  const [products, setProducts] = useState<ProductImage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get<{ data: ProductImage[] }>('/api/products/related?page=1&limit=20');
      const data = res.data.data;
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div className={className}>
      <Divider className='my-5'>Có thể bạn cũng thích</Divider>
      <ProductList data={products}></ProductList>
    </div>
  );
}
