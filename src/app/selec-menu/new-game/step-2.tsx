import { Dispatch, SetStateAction } from "react";
import TableKeyboard from "./table-keyboard";
import "./style.css";
import cx from "../../../lib/cx";
import ShowWords from "./show-words";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
  setIndexDialogue: Dispatch<SetStateAction<number>>;
  name: string,
  setName: Dispatch<SetStateAction<string>>;
}

const Step2 = ({ setStep, setIndexDialogue, name, setName }: Props) => {

  return (
    <div className="w-full h-full">
      <div className="h-8 bg-[#1071e7] flex gap-4 font-semibold text-lg">
        <div className="flex items-center text-[white]">
          <img
            src="/newpokemon/icons/cross-shape.svg"
            alt="cross-shape"
            className="h-[25px]"
          />{" "}
          MOVE
        </div>
        <div className="flex gap-0.5 text-[white] items-center">
          <div className="bg-[white] text-[black] rounded-[5px] px-1 text-xs h-4.5">
            A
          </div>{" "}
          OK
        </div>
        <div className="flex gap-0.5 text-[white] items-center">
          <div className="bg-[white] text-[black] rounded-[5px] px-1 text-xs h-4.5">
            B
          </div>{" "}
          BACK
        </div>
      </div>
      <div
        className={cx(
          "w-full h-full overflow-hidden flex gap-3 items-center justify-center flex-col relative",
          "escritor-datos"
        )}
      >
        <ShowWords name={name} />
        <TableKeyboard name={name} setName={setName} setStep={setStep} setIndexDialogue={setIndexDialogue}/>
      </div>
    </div>
  );
};
export default Step2;
