import useArrowNavigation from "../../../hooks/useArrowNavigation ";
import cx from "../../../lib/cx";

interface Props {
  optsLength: number;
  options: string[];
  isActive: boolean;
}

const SelectOpt = ({ optsLength, options, isActive }: Props) => {
  const { selectOpt } = useArrowNavigation(
    optsLength,
    0,
    "horizontal",
    isActive
  );
  return (
    <>
      {options &&
        options.map((opt, i) => (
          <div
            key={i}
            className={cx(selectOpt === i ? "text-[red]" : "text-[#6e6d6c]")}
            style={{
              textShadow: `2px 2px 4px ${selectOpt === i ? "red" : "#6e6d6c"}`,
            }}
          >
            {opt}
          </div>
        ))}
    </>
  );
};

export default SelectOpt;
