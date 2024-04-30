import { useState } from "react";
import Step1 from "./step-1";
import Step2 from "./step-2";

const NewGame = () => {
  const [step, setStep] = useState(0);
  const [indexOption, setIndexOption] = useState(0);
  const [confirmIndexOpt, setConfirmIndexOpt] = useState(0);
  const [indexDialogue, setIndexDialogue] = useState(0);
  const [name, setName] = useState("");

  return (
    <div className="w-full h-full">
      {step === 0 && (
        <Step1
          setStep={setStep}
          name={name}
          indexOption={indexOption}
          setIndexOption={setIndexOption}
          indexDialogue={indexDialogue}
          setIndexDialogue={setIndexDialogue}
          confirmIndexOpt={confirmIndexOpt}
          setConfirmIndexOpt={setConfirmIndexOpt}
        />
      )}
      {step === 1 && (
        <Step2
          setStep={setStep}
          name={name}
          setName={setName}
          setIndexDialogue={setIndexDialogue}
        />
      )}
    </div>
  );
};

export default NewGame;
