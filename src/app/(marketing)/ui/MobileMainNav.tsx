'use client';

import 'client-only';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { Logo } from '@/shared/ui/Logo';
import MainNav from './MainNav';
import { HamburgerMenuSvg } from '@/shared/ui/HamburgerMenuSvg';
import { XIconSvg } from '@/shared/ui/XIconSvg';

export default function MobileMainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className="sr-only">Open main menu</span>
        <HamburgerMenuSvg aria-hidden="true" />
      </button>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XIconSvg aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <MainNav callback={() => setMobileMenuOpen(false)} />
              </div>
              <div className="py-6">
                <Link
                  href="/auth/sign-in"
                  className="-mx-3 block px-3 py-2.5 text-base font-medium leading-7 text-gray-900"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}