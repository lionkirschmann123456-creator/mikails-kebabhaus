import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2.5 text-fg no-underline", className)}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="28" height="28" rx="8" className="fill-primary" />
        <path
          d="M14 5.5v17M11 8.5c1.4 1 2.6 1 4 0M11 12c1.4 1 2.6 1 4 0M11.5 16c1.2.8 2.3.8 3.5 0"
          stroke="currentColor"
          className="stroke-primary-fg"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-medium italic tracking-tight">
          Mikail's
        </span>
        <span className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Kebabhaus
        </span>
      </span>
    </Link>
  );
}
