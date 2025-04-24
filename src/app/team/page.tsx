import { useContext, useMemo } from "react";
import { UserDataContext } from "../../context/UserDataProvider";
import { Pokemon } from "../../data/types";
import { PokemonDataContext } from "../../context/PokemonDataProvider";
import CardPokemonInBattle from "./card-pokemon-in-battle";

const Team = () => {
  const { userData } = useContext(UserDataContext);
  const pokemonData = useContext<PokemonData[]>(PokemonDataContext);

  const team = useMemo(() => {
    const filteredTeam = userData.pokemons
      .filter(
        (x: { location: { place: string } }) => x.location.place === "team"
      )
      .map(
        (pokemon: {
          pokemon_number: number;
          xp: number;
          pokemon_id: number | undefined;
        }) => {
          const newPokemon = new Pokemon(
            pokemon.pokemon_number,
            pokemonData?.[pokemon?.pokemon_number - 1]?.stats[0]?.base_stat,
            pokemon.xp,
            pokemon.pokemon_id
          );
          if (pokemon?.ivs) {
            newPokemon.updateIVs(pokemon.ivs);
          }
          return newPokemon;
        }
      );

    const filledTeam = filteredTeam.concat(
      Array(6 - filteredTeam.length).fill(null)
    );

    return filledTeam.slice(0, 6);
  }, []);
  console.log(team);

  return (
    <section className="bg-[#8c9e29] w-full h-full pl-16 py-6 relative">
      <div className="bg-[#c4cb6f] w-full h-full rounded-tl-[2.5rem] flex gap-4">
        <CardPokemonInBattle pokemon={team[0]} />
        <div className="py-5 flex flex-col gap-1">
          {team &&
            team
              .slice(1)
              .map((_uteam: any, i: number) => (
                <div
                  key={i}
                  style={{ boxShadow: "inset -3px -3px 0px 0px #6a6a61" }}
                  className="border-2 border-[#6a6a61] rounded-md w-[475px] h-[70px]"
                ></div>
              ))}
        </div>
      </div>
      <div className="flex absolute left-1 bottom-1 gap-1 items-center">
        <div className="bg-[#736984] text-[#293031] w-[550px] p-2 text-2xl font-[400] font-nova rounded-[8px] border-[#293031] border-4">
          <div className="bg-white rounded-[8px] px-1 py-2">
            Choose POKéMON or CANCEL.
          </div>
        </div>
        <div className="bg-[#a571f7] text-white text-xl py-0 px-3 border-[6px] border-[#fa7735] rounded-2xl">
          CANCEL
        </div>
      </div>
    </section>
  );
};

export default Team;
