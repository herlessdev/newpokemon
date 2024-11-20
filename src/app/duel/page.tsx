import { useContext, useEffect, useState } from "react";
import cx from "../../lib/cx";
import DivText from "../../components/shared/div-text";
import PlatformDuel from "../../components/shared/platform-duel";
import { PokemonDataContext } from "../../context/PokemonDataProvider";
import { listPokemon, probability } from "../../data/data";
import useTypingEffect from "../../hooks/useTypingEffect";
import BarPokemon from "./bar-pokemon";
import { motion } from "framer-motion";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../../data/types";
import { UserDataContext } from "../../context/UserDataProvider";
import SelectOptionMultipleDirection from "../../components/shared/select-option-multiple-direction";
import { useDuelData } from "../../hooks/useDuel";
import WritingText from "../../components/shared/writing-text";

const Duel = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext);
  const pokemonData = useContext(PokemonDataContext);
  const { randomNumber, sequence, setSequence } = useDuelData();

  const [textDuel, setTextDuel] = useState("");
  const { displayText, finishedTyping } = useTypingEffect(textDuel, 20);

  const sequenceConditions: Partial<Record<Sequence, boolean>> = {
    inicio: !finishedTyping,
    invocar: finishedTyping,
    effect: finishedTyping,
    "trans-options": finishedTyping,
    "receive-attack": true,
    "give-experience": true,
    "finish-duel": true,
  };

  const sequenceActions: Partial<
    Record<Sequence, { action: (pokemon: string) => void }>
  > = {
    inicio: {
      action: (pokemon: string) => {
        setTextDuel(`Wild ${pokemon} appeared!`);
        setSequence("invocar");
      },
    },
    invocar: {
      action: (pokemon: string) => {
        setTimeout(() => {
          setTextDuel(`Go! ${pokemon}!`);
          setSequence("effect");
        }, 500);
      },
    },
    effect: {
      action: (pokemon: string) => {
        setTimeout(() => {
          //manejar probabilidad de effect, hacerlo escalable
          if (probability(0)) {
            setTextDuel(`${pokemon} ha paralizado a su oponente`);
            pokemonEnemy.setStatus("paralyzed");
          } else {
            setTextDuel(" ");
          }
          setSequence("trans-options");
        }, 500);
      },
    },
    "trans-options": {
      action: () => {
        setTimeout(() => {
          setTextDuel(" ");
          setSequence("options");
        }, 500);
      },
    },
    "receive-attack": {
      action: () => {
        setTimeout(() => {
          if (pokemonEnemy.status === "paralyzed") {
            setTextDuel("Pokemon enemigo se encuentra paralizado");
            setSequence("trans-options");
          } else {
            if (pokemonEnemy.stats.current_hp <= 0) {
              setTextDuel("Pokemon enemigo se ha debilitado");
              setSequence("give-experience");
            } else {
              setTextDuel("Pokemon enemigo ataca");
              setSequence("trans-options");
            }
          }
        }, 500);
      },
    },
    "give-experience": {
      action: () => {
        setTimeout(() => {
          const experienceGained = Math.ceil(
            (pokemonData?.[pokemonEnemy.pokemon_number - 1]?.base_experience *
              pokemonEnemy?.level *
              1) /
              7
          );
          setTextDuel(`Has ganado ${experienceGained}`);
          if (!finishedTyping) {
            const updatedPokemonUserList = pokemonUserList && [
              ...pokemonUserList,
            ];
            const pokemon = updatedPokemonUserList?.[0];
            if (pokemon) {
              pokemon.addXP(experienceGained);
            }
            setPokemonUserList(updatedPokemonUserList);
          }

          setSequence("finish-duel");
        }, 1000);
      },
    },
    "finish-duel": {
      action: () => {
        if (!finishedTyping) {
          updateUserDataWithPokemonList();
        }
        setTimeout(() => {
          navigate("/world");
        }, 1250);
      },
    },
  };

  const [selectOpt, setSelectOpt] = useState({ row: 0, column: 0 });

  const optionsDuel = [
    [
      { name: "fight", action: () => setSequence("fight") },
      {
        name: "bag",
        action: () => navigate("/bag", { state: { someProp: "duel" } }),
      },
    ],
    [
      { name: "pokémon", action: () => navigate("/pokemon") },
      {
        name: "run",
        action: () => {
          setSequence("inicio");
          navigate("/world");
        },
      },
    ],
  ];

  const [selectOptFight, setSelectOptFight] = useState({ row: 0, column: 0 });

  const optionsFight = [
    ["Impactrueno", "-"],
    ["-", "-"],
  ];

  const pokemonsUser = userData?.pokemons?.filter(
    (x: { location: { place: string } }) => x.location.place === "team"
  );
  const [pokemonUserList, setPokemonUserList] = useState<Pokemon[] | null>(
    null
  );
  const NumberPokemonEnemy = listPokemon[randomNumber ?? 0];
  const NumberEnemyPokemonData = NumberPokemonEnemy - 1;
  const initialEnemy = new Pokemon(
    NumberPokemonEnemy,
    pokemonData?.[NumberEnemyPokemonData]?.stats?.[0].base_stat,
    2000
  );

  const [pokemonEnemy] = useState<Pokemon>(initialEnemy);

  const updateUserDataWithPokemonList = () => {
    const updatedPokemons = userData.pokemons.map(
      (pokemon: { pokemon_id: number | undefined }) => {
        const updatedPokemon = pokemonUserList?.find(
          (p) => p.pokemon_id === pokemon.pokemon_id
        );

        if (updatedPokemon) {
          return {
            ...pokemon, // Mantiene el resto de los datos
            hp: updatedPokemon.stats.current_hp,
            lvl: updatedPokemon.level,
            xp: updatedPokemon.xp,
            status: updatedPokemon.status,
          };
        }

        return pokemon; // Si no se encuentra en la lista actualizada, lo dejamos como está
      }
    );

    const updatedUserData = {
      ...userData,
      pokemons: updatedPokemons,
    };

    setUserData(updatedUserData);
  };

  useEffect(() => {
    if (pokemonData && randomNumber && pokemonUserList) {
      const namePokemonSelect =
        pokemonData?.[
          pokemonUserList?.[0]?.pokemon_number - 1
        ]?.name.toUpperCase();

      if (sequenceConditions[sequence]) {
        sequenceActions[sequence]?.action(namePokemonSelect);
      }
    }
  }, [pokemonData, finishedTyping, pokemonUserList]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLocaleLowerCase() === "z") {
        if (sequence === "options") {
          const inSelectOption = optionsDuel[selectOpt.row][selectOpt.column];
          if (inSelectOption?.action) {
            inSelectOption?.action();
          }
        }
        //continuar aquí
        if (sequence === "fight" && selectOptFight.row === 0) {
          setSequence("attack");
          setTextDuel("PIKACHU a lanzado un impactrueno");
          pokemonEnemy.takeDamage(10);
        }
      }

      if (event.key.toLocaleLowerCase() === "x") {
        if (sequence === "fight") {
          setSequence("options");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sequence, selectOpt, selectOptFight, navigate]);

  useEffect(() => {
    const mappedPokemons = pokemonsUser?.map(
      (filteredPokemon: any, i: number) => {
        const newPokemon = new Pokemon(
          filteredPokemon.pokemon_number,
          pokemonData?.[
            filteredPokemon?.pokemon_number - 1
          ]?.stats[0].base_stat,
          filteredPokemon.xp,
          filteredPokemon.pokemon_id
        );

        if (filteredPokemon.ivs) {
          newPokemon.updateIVs({
            hp: filteredPokemon.ivs.hp,
            attack: filteredPokemon.ivs.attack,
            defense: filteredPokemon.ivs.defense,
            specialAttack: filteredPokemon.ivs.specialAttack,
            specialDefense: filteredPokemon.ivs.specialDefense,
            speed: filteredPokemon.ivs.speed,
          });
        }

        newPokemon.updateLocation({ place: "team", position: i });
        newPokemon.updateCurrentHP(filteredPokemon.hp);
        return newPokemon;
      }
    );
    setPokemonUserList(mappedPokemons);
  }, []);
  console.log(sequence);
  return (
    <div className="relative w-full h-full">
      <div className={cx("duel-bg-green")}>
        {/*pokemon enemy*/}
        <PlatformDuel className="top-1/4 right-0 absolute">
          {listPokemon &&
            randomNumber != null &&
            listPokemon[randomNumber] != null && (
              <img
                alt="pokemon-enemy"
                src={
                  pokemonData[NumberEnemyPokemonData]?.sprites?.versions?.[
                    "generation-iii"
                  ]?.emerald?.["front_default"]
                }
                className={cx(
                  "w-[100px] bottom-0 translate-y-[-25%] left-1/2 absolute translate-x-[-50%]"
                )}
                style={{
                  transition: "filter 0.3s",
                  filter:
                    sequence === "attack" ? "brightness(0) invert(1)" : "",
                }}
              />
            )}

          <BarPokemon
            gender_rate={pokemonData?.[NumberEnemyPokemonData]?.gender_rate}
            statePokemon={pokemonEnemy?.status}
            name={pokemonData?.[NumberEnemyPokemonData]?.name.toUpperCase()}
            lvl={pokemonEnemy.level}
            className={"absolute bottom-[125%] right-[125%]"}
            max_hp={pokemonEnemy.stats.max_hp}
            current_hp={pokemonEnemy.stats.current_hp}
          />
        </PlatformDuel>
        {/*pokemon user */}
        {pokemonUserList && (
          <>
            <PlatformDuel className="top-1/2 translate-y-[50%] left-0 absolute">
              <img
                alt="pokemon-main"
                src={
                  pokemonData[pokemonsUser?.[0].pokemon_number - 1]?.sprites
                    ?.versions?.["generation-iii"]?.["ruby-sapphire"]?.[
                    "back_default"
                  ]
                }
                className={cx(
                  "w-[100px] bottom-0 translate-y-[-25%] left-1/2 absolute translate-x-[-50%]"
                )}
              />
              <BarPokemon
                gender_rate={
                  pokemonData?.[pokemonUserList?.[0]?.pokemon_number - 1]
                    ?.gender_rate
                }
                statePokemon={pokemonUserList?.[0]?.status}
                name={pokemonData?.[
                  pokemonUserList?.[0]?.pokemon_number - 1
                ]?.name.toUpperCase()}
                lvl={pokemonUserList?.[0]?.level}
                className={"absolute bottom-[50%] right-[-75%]"}
                max_hp={pokemonUserList?.[0]?.stats?.max_hp}
                current_hp={pokemonUserList?.[0]?.stats?.current_hp}
                show_values={true}
              />
            </PlatformDuel>

            {sequence === "attack" && (
              <div className="container">
                <motion.div
                  className="lightning right-[17.5%] absolute top-[-20%]"
                  animate={{
                    translateY: [0, 20, 0],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "linear",
                  }}
                  onAnimationComplete={() => {
                    setSequence("receive-attack");
                  }}
                />
              </div>
            )}

            <DivText className="bottom-0 absolute w-full">
              {sequence !== "options" && sequence !== "fight" && displayText}

              {sequence === "options" && (
                <>
                  {/*`What will ${pokemonData?.[
                pokemonUserList?.[0]?.pokemon_number - 1
              ]?.name.toUpperCase()} do?`*/}
                  {}
                  <WritingText
                    className="w-[48%]"
                    text={
                      "What will " +
                      pokemonData?.[
                        pokemonUserList?.[0]?.pokemon_number - 1
                      ]?.name.toUpperCase() +
                      " do?"
                    }
                  />
                  <SelectOptionMultipleDirection
                    selectOpt={selectOpt}
                    setSelectOpt={setSelectOpt}
                    options={optionsDuel?.map((fileOpts) =>
                      fileOpts?.map((opt) => opt?.name)
                    )}
                    className="w-[50%] absolute right-0 top-[1px] p-3.5 border-8 rounded-[16px]"
                  />
                </>
              )}
              {sequence === "fight" && (
                <SelectOptionMultipleDirection
                  selectOpt={selectOptFight}
                  setSelectOpt={setSelectOptFight}
                  options={optionsFight}
                  className="w-full absolute right-0 top-0 p-4 border-[7px] rounded-[8px] text-3xl font-mono"
                />
              )}
            </DivText>
          </>
        )}
      </div>
    </div>
  );
};
export default Duel;
