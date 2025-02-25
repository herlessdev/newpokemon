import { useContext, useEffect, useRef, useState } from "react";
import { PokemonDataContext } from "../../context/PokemonDataProvider";
import cx from "../../lib/cx";
import { UserDataContext } from "../../context/UserDataProvider";

const Pokedex = () => {
  const staticCanvasRef = useRef<HTMLCanvasElement>(null);
  const dynamicCanvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentSyRef = useRef(25); // Posición actual animada
  const currentDwRef = useRef(95); // Ancho actual
  const isAnimatingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const pokemonData = useContext<PokemonData[]>(PokemonDataContext);
  const { userData } = useContext(UserDataContext);
  console.log(pokemonData);
  useEffect(() => {
    const canvas = dynamicCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}sprites/miscellaneous.png`;

    const drawCanvas = (dynamicSy: number, dynamicDw: number) => {
      // Limpiar el canvas antes de redibujar
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Dibuja el indicador dinámico
      ctx.drawImage(img, 506, dynamicSy, 75, 12.5, 32, 10, dynamicDw, 10);
    };

    img.onload = () => {
      const dynamicSy = selectedIndex * currentSyRef.current + 25; // Ejemplo de cálculo
      drawCanvas(dynamicSy, currentDwRef.current);
    };

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [selectedIndex]);
  console.log(userData);
  useEffect(() => {
    const canvas = staticCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}sprites/miscellaneous.png`;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 262, 224, 240, 160, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnimatingRef.current) return; // Ignorar si la animación está en progreso

      if (event.key === "ArrowDown" && selectedIndex < 149) {
        setSelectedIndex((prev) => prev + 1);
      }
      if (event.key === "ArrowUp" && selectedIndex > 0) {
        setSelectedIndex((prev) => prev - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="relative w-full h-full bg-[blue]">
      <canvas ref={staticCanvasRef} className="w-full h-full absolute" />
      <div className="w-[200px] h-[340px] rounded-md left-[26.75%] top-1/2 translate-y-[-50%] overflow-hidden absolute">
        {pokemonData?.map((pkm, i) => (
          <img
            src={pkm?.sprites?.front_default}
            alt={(i + 1).toString()}
            style={{
              transform: `translateY(${
                -50 - 170 * selectedIndex + 170 * i
              }%) translateX(-50%) scale(2)`,
            }}
            className={cx("absolute left-1/2 top-1/2 duration-300")}
          />
        ))}
      </div>
      <div className="w-[278px] h-[400px] rounded-md translate-y-[-50%] overflow-hidden absolute left-[58%] top-1/2">
        {userData &&
          pokemonData &&
          pokemonData?.map((pkm, i) => {
            const isCaptured = userData?.pokemons?.some(
              (pokemon: { pokemon_number: number }) => pokemon?.pokemon_number === i + 1
            );
            return (
              <p
                key={i}
                style={{
                  transform: `translateY(${
                    -50 - 200 * selectedIndex + 200 * i
                  }%) scale(2)`,
                  transformOrigin: "left",
                }}
                className={cx(
                  "absolute top-1/2 duration-300 font-sans ml-6 px-1 uppercase text-sm tracking-tighter"
                )}
              >
                {isCaptured && (
                  <img
                    width={12.5}
                    height={12.5}
                    alt=""
                    src="/newpokemon/icons/pokeball.svg"
                    className="absolute right-[100%] top-1/2 translate-y-[-50%]"
                  />
                )}

                <span className="text-xs">N°</span>
                {String(i + 1)?.padStart(3, "0") + " " + pkm?.name}
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default Pokedex;
