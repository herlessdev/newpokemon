import SelectOptionMultipleDirection from "../../components/shared/select-option-multiple-direction";

const OptionsFight = ({}) => {
  return (
    <SelectOptionMultipleDirection
      selectOpt={selectOptFight}
      setSelectOpt={setSelectOptFight}
      options={["IMPACTRUENO"]}
      className="w-full absolute right-0 top-0 p-4 border-[7px] rounded-[8px] text-3xl font-mono"
    />
  );
};

export default OptionsFight;
