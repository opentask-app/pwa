import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { twMerge } from 'tailwind-merge';

export interface DropdownMenuProps extends ClassNamePropsOptional {
  readonly items: React.ReactNode;
  readonly itemsClassName?: string;
  readonly menuButton: React.ReactNode;
}

export const DropdownMenu = ({
  className,
  items,
  itemsClassName,
  menuButton,
}: DropdownMenuProps) => {
  return (
    <div {...(className && { className })}>
      <Menu as="div" className="relative inline-block text-left">
        <div>{menuButton}</div>
        <Transition
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="transform opacity-0 scale-90"
          enterTo="transform opacity-100 scale-100"
          leave="-in duration-200"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-90"
        >
          <Menu.Items
            className={twMerge(
              'divide-y divide-gray-100 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
              itemsClassName,
            )}
          >
            <div className="px-1 py-1 ">{items}</div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
