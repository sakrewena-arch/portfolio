import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "text";

const base =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.98] cursor-pointer select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent px-6 text-accent-ink hover:bg-fg hover:text-bg",
  outline:
    "border border-line-strong px-6 text-fg hover:border-fg hover:bg-fg hover:text-bg",
  text: "px-1 text-fg underline decoration-line-strong underline-offset-8 hover:decoration-accent",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  /** Affiche la flèche diagonale. */
  arrow?: boolean;
}

type AnchorProps = CommonProps &
  Omit<ComponentProps<"a">, "className" | "children"> & { href: string };
type ButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = "primary", className, children, arrow = false } = props;
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        />
      )}
    </>
  );

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, className: _c, children: _ch, arrow: _a, href, ...rest } = props;
    const isFile = /\.(pdf|zip)$/i.test(href);
    const external = /^(https?:|mailto:|tel:)/.test(href) || isFile;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http") || isFile
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...rest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as object)}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, className: _c, children: _ch, arrow: _a, ...rest } = props as ButtonProps;
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
