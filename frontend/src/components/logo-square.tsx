import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-center border border-brand-clay/20 bg-brand-oatmilk',
        {
          'h-[40px] w-[40px] rounded-xl': !size,
          'h-[30px] w-[30px] rounded-lg': size === 'sm',
        }
      )}
    >
      <LogoIcon
        className={clsx({
          'h-5 w-5': !size,
          'h-4 w-4': size === 'sm',
        })}
      />
    </div>
  );
}
