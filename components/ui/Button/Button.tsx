import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
};

const buttonClassName =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-8 text-base font-medium text-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-[3px]";

const Button = ({ children, href, type = "button" }: ButtonProps) => {
  if (href) {
    return (
      <a href={href} className={buttonClassName}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={buttonClassName}>
      {children}
    </button>
  );
};

export default Button;
