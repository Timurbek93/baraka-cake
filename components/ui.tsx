import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Container({ children }: { children: ReactNode }) {
  return <div className="container">{children}</div>;
}

export function Section({ eyebrow, title, description, children, className = "" }: SectionProps) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <Container>
        <div className="mb-10 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 inline-flex rounded-full border border-turquoise/20 bg-white/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-turquoise">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-4xl leading-tight text-chocolate sm:text-5xl">{title}</h2>
          {description ? <p className="mt-4 text-base leading-7 text-chocolate/75">{description}</p> : null}
        </div>
        {children}
      </Container>
    </section>
  );
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  children: ReactNode;
};

export function PrimaryButton({ href, children, className = "", ...props }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full bg-inkBlue px-6 py-3 text-sm font-semibold text-milk transition hover:bg-turquoise ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children, className = "", ...props }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full border border-inkBlue/15 bg-white/60 px-6 py-3 text-sm font-semibold text-inkBlue transition hover:border-turquoise hover:text-turquoise ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
