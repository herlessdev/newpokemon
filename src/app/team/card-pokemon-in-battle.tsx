import { useContext, useEffect } from "react";
import { PokemonDataContext } from "../../context/PokemonDataProvider";
import { useNavigate } from "react-router-dom";

const CardPokemonInBattle = ({ pokemon }) => {
  const pokemonData = useContext(PokemonDataContext);
  const navigate = useNavigate()
  console.log(pokemonData?.[pokemon?.pokemon_number - 1]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if(event.key === "Enter") {
        navigate("/world")
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #3996de 0%, #3996de 61%, #99d1ff 61%, #99d1ff 63%, #3996de 63%, #3996de 65%, #99d1ff 65%)",
      }}
      className="flex flex-col h-[100px] w-[185px] border-[#4b4a63] border-4 rounded-md relative left-[-25px] top-1/4 text-white"
    >
      <div className="flex">
        <img
          src={
            pokemonData?.[pokemon?.pokemon_number - 1]?.sprites?.versions?.[
              "generation-vii"
            ]?.icons?.front_default
          }
          className="w-20 object-contain ml-[-15px] mt-[-15px]"
        />

        <div className="pt-5 leading-[1] w-full text-lg">
          <p>Pikachu</p>
          <p className="flex ml-6 w-full gap-12">
            Lv{pokemon?.level}
            {pokemonData?.[pokemon.pokemon_number - 1].gender_rate !== -1 && (
              <img
                src="/newpokemon/icons/mars.svg"
                alt="mars"
                className="w-3 rotate-[-45deg]"
              />
            )}
          </p>
        </div>
      </div>
      <div className="mt-0.5 self-end mr-1">
        <div className="flex items-center bg-[#525152] w-[149px] rounded-md p-0.5">
          <div className="text-[#ffd551] text-[15px] leading-[0] font-bold px-0.5">
            HP
          </div>
          <div className="rounded-md overflow-hidden">
            <div className="w-[120px] h-[10px] bg-[#6ef7a5] border-2 border-white" />
          </div>
        </div>
        <div className="leading-[1] text-end mx-1">
          {pokemon.stats.current_hp}/ {pokemon.stats.max_hp}
        </div>
      </div>
    </div>
  );
};

export default CardPokemonInBattle;
