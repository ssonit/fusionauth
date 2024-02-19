import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductImage } from '@/types/products';

export default function ProductItem({ product }: { product: ProductImage }) {
  const { images, name, price, id } = product;

  return (
    <div>
      <Link href={`/${id}`}>
        <Card className='cursor-pointer border-slate-400 transition-all hover:scale-[1.02] hover:shadow-2xl'>
          <div className='p-1.5'>
            <AspectRatio ratio={1 / 1} className='relative w-full'>
              <Image
                src={images[0].url}
                alt={name}
                className='h-full w-full select-none rounded-md object-cover transition'
                fill
                sizes='(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw'
                quality={100} //default 75
              ></Image>
            </AspectRatio>
          </div>
          <CardHeader className='px-3 pb-4'>
            <CardTitle className='text-base'>{name}</CardTitle>
          </CardHeader>
          <CardContent className='px-3 pb-3'>
            <p className='font-semibold text-red-600'>{price.toString()}</p>
          </CardContent>
          <CardFooter className='flex items-center justify-between px-3 pb-2'>
            <div className='flex items-center gap-1'>
              <Icons.Star className='h-4 w-4 stroke-yellow-400'></Icons.Star>
              <span className='text-sm'>5</span>
            </div>
            <Button className='h-9 w-9 rounded-full p-2'>
              <Icons.Plus className='h-5 w-5'></Icons.Plus>
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
