import { ReactNode } from "react";
import cx from "../lib/cx";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  animation?: {
    initial?: Record<string, unknown>;
    animate?: Record<string, unknown>;
    exit?: Record<string, unknown>;
    transition?: Record<string, unknown>;
  };
};
const Plataform = ({ children, className, animation }: Props) => {
  const { initial, animate, exit, transition } = animation || {};
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className={cx(
        "relative max-w-sm w-full h-[100px] bg-[#fffba5] rounded-[100%] border-4 border-[#797730]",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Plataform;
