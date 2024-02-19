import { cn } from '@/lib/utils';

export default function Divider({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex items-center', className)}>
      <div className='h-0.5 w-full bg-slate-500'></div>
      <div className='mx-2 flex-shrink-0'>{children}</div>
      <div className='h-0.5 w-full bg-slate-500'></div>
    </div>
  );
}
