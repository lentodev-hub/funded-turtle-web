import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const Reveal = ({ children, className, delay = 0 }: Props) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </div>
  );
};

export default Reveal;
