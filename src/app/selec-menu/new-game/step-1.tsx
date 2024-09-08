import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useTypingEffect from "../../../hooks/useTypingEffect";
import DivGradient from "../../../components/shared/div-gradient";
import Plataform from "../../../components/shared/plataform";
import { AnimatePresence, motion } from "framer-motion";
import DivText from "../../../components/shared/div-text";
import dataDialogue from "./dialogue.placeholder.json";
import { useQuery } from "react-query";
import { getPokemonById } from "../../../services/get";
import SelectOption from "../../../components/shared/select-option";
import cx from "../../../lib/cx";
import { useNavigate } from "react-router-dom";
import { addPokemon, nuevaPartida } from "../../../services/post";
import { Pokemon } from "../../../data/types";
import { PokemonDataContext } from "../../../context/PokemonDataProvider";

const options = ["BOY", "GIRL"];
const confirmOptions = ["YES", "NO"];

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
  indexOption: number;
  setIndexOption: Dispatch<SetStateAction<number>>;
  indexDialogue: number;
  setIndexDialogue: Dispatch<SetStateAction<number>>;
  name: string;
  confirmIndexOpt: number;
  setConfirmIndexOpt: Dispatch<SetStateAction<number>>;
}

const TextModify = (text: string, index: number, name?: string) => {
  if (index === 16 && name) {
    const newText = text.split(" ");
    newText.splice(1, 0, name);
    return newText.join(" ");
  } else {
    return text;
  }
};

const Step1 = ({
  setStep,
  indexOption,
  setIndexOption,
  indexDialogue,
  setIndexDialogue,
  name,
  confirmIndexOpt,
  setConfirmIndexOpt,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pokemonData = useContext<any>(PokemonDataContext);

  const [duration] = useState(0);

  const { displayText, finishedTyping } = useTypingEffect(
    TextModify(dataDialogue[indexDialogue], indexDialogue, name),
    5
  );

  const animation = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 200 },
    transition: { duration: 0.5 },
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useQuery("pokemon270", () => getPokemonById(270), {
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();

  const handleAnimationComplete = () => {};
  useEffect(() => {
    const handleKeyDown = async (event: { key: string }) => {
      if (
        event.key === "a" &&
        finishedTyping &&
        dataDialogue?.length >= indexDialogue + 1
      ) {
        setIndexDialogue(indexDialogue + 1);

        if (indexDialogue === 13) {
          setStep(1);
        }
        if (indexDialogue === 20) {
          const genderOpts = ["BOY", "GIRL"];
          const gender = genderOpts[confirmIndexOpt];

          const userData = {
            name: name,
            gender: gender,
          };
          const initialPokemon = new Pokemon(            
            25,
            10,
            pokemonData[25]?.stats?.[0].base_stat,
            1000
          );
          console.log(initialPokemon)
          const userResponse = await nuevaPartida(userData);
          const user_id = userResponse.user_id;
          await addPokemon( user_id, initialPokemon);
          navigate("/world");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexDialogue, finishedTyping]);

  return (
    <motion.div
      style={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      animate={{
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
      transition={{ duration: duration }}
      className="flex flex-col items-center bg-[#000000] h-full w-full"
      onAnimationComplete={handleAnimationComplete}
    >
      <DivGradient />
      <div className="w-full flex justify-center h-full">
        <AnimatePresence>
          {(indexDialogue <= 10 ||
            (indexDialogue > 14 && indexDialogue < 17)) && (
            <Plataform className="mt-28" animation={animation}>
              {indexDialogue >= 4 && (
                <img
                  src={
                    data?.sprites?.versions?.["generation-iii"]?.emerald?.[
                      "front_default"
                    ]
                  }
                  alt={data?.id}
                  className="absolute bottom-[-15%] left-[12%] w-[200px] h-[200px]"
                />
              )}
              <img
                src="/newpokemon/pjs/profesor-abedul.png"
                className="absolute bottom-[35%] left-[40%] h-[185px] w-[210px]"
              />
            </Plataform>
          )}

          {indexDialogue >= 12 && indexDialogue < 14 && (
            <>
              {indexDialogue === 12 && (
                <motion.div
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: -200 }}
                  transition={{ duration: 0.5 }}
                  className="top-[28%] absolute"
                >
                  <SelectOption
                    options={options}
                    selectOpt={indexOption}
                    setSelectOpt={setIndexOption}
                  />
                </motion.div>
              )}
              <Plataform className="ml-auto mt-28">
                <AnimatePresence>
                  {indexOption === 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 200, y: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 200 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src="/newpokemon/pjs/bruno.png"
                        className="absolute bottom-[35%] left-[50%] translate-x-[-50%] h-[175px] w-[170px]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {indexOption === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 200, y: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 200 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src="/newpokemon/pjs/aura.png"
                        className="absolute bottom-[35%] left-[50%] translate-x-[-50%] h-[175px] w-[170px]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Plataform>
            </>
          )}
          {indexDialogue === 14 ||
            (indexDialogue > 16 && (
              <>
                <Plataform
                  className={cx("mt-28", indexDialogue > 16 ? "" : "ml-auto")}
                  animation={{
                    initial: { opacity: 1 },
                    exit: { opacity: 0, x: -100 },
                    transition: { duration: 0.5 },
                  }}
                >
                  <motion.div
                    initial={{ opacity: 1, y: 50 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src="/newpokemon/pjs/bruno.png"
                      className="absolute bottom-[35%] left-[50%] translate-x-[-50%] h-[175px] w-[170px]"
                    />
                  </motion.div>
                </Plataform>
              </>
            ))}
          {indexDialogue === 14 && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: -200 }}
              transition={{ duration: 0.5 }}
              className="top-[25%] absolute"
            >
              <SelectOption
                options={confirmOptions}
                selectOpt={confirmIndexOpt}
                setSelectOpt={setConfirmIndexOpt}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DivText className="my-2 w-[740px]">
        {displayText}
        {indexDialogue === 14 && ` ${name} ?`}
        {/*finishedTyping && (
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
            }}
            style={{
              clipPath: "polygon(0 0, 0% 50%, 50% 100%, 100% 50%, 100% 0%)",
            }}
            className="bg-[#636163] w-[20px] h-[22px] p-[3px]"
          >
            <div
              style={{
                clipPath: "polygon(0 0, 0% 50%, 50% 100%, 100% 50%, 100% 0%)",
              }}
              className="bg-[red] w-full h-full"
            />
          </motion.div>
        )*/}
      </DivText>
    </motion.div>
  );
};

export default Step1;
