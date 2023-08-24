'use client';

import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChildrenProps } from '@/app/modules/common/ChildrenProps';
import { ClassNamePropsOptional } from '@/app/modules/common/ClassNameProps';

export default function HeroShell({ children, className }: ChildrenProps & ClassNamePropsOptional) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => setIsOpen(true), []);

  return (
    <Transition
      show={isOpen}
      as="div"
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-[50px]"
      enterTo="opacity-100 translate-y-0"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-[50px]"
    >
      <div className={`relative px-6 lg:px-8 ${className}`}>
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-20">{children}</div>
        </div>
      </div>
    </Transition>
  );
}