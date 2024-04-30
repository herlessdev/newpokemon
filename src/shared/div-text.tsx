import { ReactNode } from "react";
import cx from "../lib/cx";

type Props = {
  children: ReactNode;
  className?: string;
};

const DivText = ({ children, className }: Props) => {
  return (
    <div className={cx("bg-[#00fb9c] p-2 rounded-[8px]", className)}>
      <div className="bg-[#00cbbd] px-3 py-[.5px] rounded-[6px]">
        <div className="bg-[white] rounded-[5px] h-[125px] p-4 font-nova text-2xl flex gap-2 text-[#636163]">
        {children}
        </div>
      </div>
    </div>
  );
};

export default DivText;
