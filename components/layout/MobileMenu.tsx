"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { mainNav } from "@/data/site";

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function openMenu() {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  function closeOnBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeMenu();
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={openMenu}
        className="-mr-2 flex size-11 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-ink"
      >
        <span className="sr-only">Open menu</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => setIsOpen(false)}
        onClick={closeOnBackdropClick}
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm bg-white p-0 text-ink backdrop:bg-black/50"
      >
        <div className="flex h-16 items-center justify-end border-b border-neutral-200 px-4">
          <button
            type="button"
            onClick={closeMenu}
            className="flex size-11 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-ink"
          >
            <span className="sr-only">Close menu</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav aria-label="Main">
          <ul className="flex flex-col px-4 py-6">
            {mainNav.map((link) => (
              <li key={link.href} className="border-b border-neutral-200">
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-4 text-2xl font-medium focus-visible:outline-2 focus-visible:outline-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </div>
  );
}
