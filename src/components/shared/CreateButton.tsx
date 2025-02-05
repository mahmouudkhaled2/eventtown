import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';

const ICON_SIZE = 20;

type TCreateButtonProps = React.ComponentProps<typeof Button> & {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
};

const CreateButton: FC<TCreateButtonProps> = ({
  href,
  icon,
  className,
  children,
  ...props
}) => {
  const Icon = icon;
  return (
    <Button {...props} asChild>
      <Link
        href={href}
        className={cn('flex items-center gap-2 text-sm md:text-xs', className)}
      >
        <Icon size={ICON_SIZE} />
        <span className="hidden capitalize sm:block">{children}</span>
      </Link>
    </Button>
  );
};

export default CreateButton;
