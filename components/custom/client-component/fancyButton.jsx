
"use client"
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default function FancyButton({ children, href }) {
  return (
    <Link href="/users/create" passHref>
      <button
        type="button"
        className={`
          group inline-flex items-center rounded-md px-3 h-8 text-white 
          bg-violet-700 dark:bg-violet-600
          shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12),
                  0_2px_2px_-1px_rgba(0,0,0,0.16),
                  0_4px_4px_-2px_rgba(0,0,0,0.24),
                  0_0_0_1px_rgba(0,0,0,0.12)]
          relative overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:transition-opacity
          hover:before:opacity-0
          focus:outline-none focus:ring-2 focus:ring-violet-400
          transition-all duration-200 ease-in-out
        `}
      >
        <span className="flex items-center gap-1.5">
          <svg
            className="w-4 h-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 3.75V8M8 8V12.25M8 8H12.25M8 8L3.75 8" />
          </svg>
          <span>{children}</span>
        </span>
      </button>
    </Link>
  );
}
