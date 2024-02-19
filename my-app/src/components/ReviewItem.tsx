import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ReviewItem() {
  return (
    <div className='flex gap-3'>
      <Avatar className='h-8 w-8'>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h4 className='font-semibold'>thintthi996</h4>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora aperiam quos pariatur, vero, eum, architecto
          tenetur facere repellendus nostrum eos molestias ipsam magni odit. Exercitationem, sequi! Similique quaerat
          dolores sint!
        </p>
      </div>
    </div>
  );
}
