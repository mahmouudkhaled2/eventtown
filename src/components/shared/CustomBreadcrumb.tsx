import React, { FC } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type BreadcrumbItemType = {
  name: string;
  link: string;
};

interface CustomBreadcrumbProps
  extends React.ComponentProps<typeof Breadcrumb> {
  breadcrumbItems?: BreadcrumbItemType[];
  breadcrumbPage?: string;
}

const CustomBreadcrumb: FC<CustomBreadcrumbProps> = ({
  className,
  breadcrumbItems = [],
  breadcrumbPage = '',
  ...props
}) => {
  return (
    <Breadcrumb className={cn('flex', className)} {...props}>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink asChild>
                <Link href={item.link} className="capitalize">
                  {item.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">
            {breadcrumbPage}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
