import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./style.css";
import { Bruno, mapaProps, probability } from "../../data/data";
import { useNavigate } from "react-router-dom";
import useTypingEffect from "../../hooks/useTypingEffect";
import DivText from "../../shared/div-text";

type PersonajeCoordenadas = {
  x: number;
  y: number;
};

interface Props {
  randomNumber: number | null;
  generateRandomNumber: () => void;
  personajeCoordenadas: PersonajeCoordenadas;
  setPersonajeCoordenadas: Dispatch<SetStateAction<PersonajeCoordenadas>>;
  mapa: mapaProps[][];
  setMapa: Dispatch<SetStateAction<mapaProps[][]>>;
}

const World = ({
  mapa,
  setMapa,
  //randomNumber,
  generateRandomNumber,
  personajeCoordenadas,
  setPersonajeCoordenadas,
}: Props) => {
  const [direction, setDirection] = useState("Down");
  const [scaleX, setScaleX] = useState("");
  const [backgroundImagePosition, setBackgroundPosition] = useState("");
  const [debounce, setDebounce] = useState(false);
  const spriteBruno = "/newpokemon/sprites/sprite-bruno.png";
  const [text] = useState("");
  const [event, setEvent] = useState(false);
  const { displayText, finishedTyping } = useTypingEffect(text, 20);
  const navigate = useNavigate();

  const moverPersonaje = (deltaX: number, deltaY: number) => {
    const newPosX = personajeCoordenadas.x + deltaX;
    const newPosY = personajeCoordenadas.y + deltaY;

    if (
      newPosX >= 0 &&
      newPosX < mapa.length &&
      newPosY >= 0 &&
      newPosY < mapa[0].length &&
      mapa[newPosX][newPosY].superficie?.available === "yes" &&
      mapa[newPosX][newPosY].be?.available !== "no"
    ) {
      const nuevoMapa = [...mapa.map((fila) => [...fila])];
      const x: number = personajeCoordenadas.x;
      const y: number = personajeCoordenadas.y;

      mapa[x][y].be = null;

      nuevoMapa[newPosX][newPosY].be = Bruno;
      setMapa(nuevoMapa);
      setPersonajeCoordenadas({ x: newPosX, y: newPosY });
    }
  };
  useEffect(() => {
    if (debounce) {
      return;
    }
    if (event) {
      return;
    }
    const handleKeyDown = (event: { key: string }) => {
      switch (event.key) {
        case "ArrowUp":
          setDirection("Up");
          if (direction === "Up") {
            setBackgroundPosition("-70px -35px");
            setTimeout(() => {
              setBackgroundPosition("-242.5px -35px");
            }, 33);
            setTimeout(() => {
              setBackgroundPosition("-70px -35px");
            }, 50);
            moverPersonaje(0, -1);
          } else {
            setBackgroundPosition("-70px -35px");
          }
          break;
        case "ArrowLeft":
          setDirection("Left");
          setScaleX("scaleX(1)");

          if (direction === "Left") {
            setBackgroundPosition("-370px -35px");
            setTimeout(() => {
              setBackgroundPosition("-325px -35px");
            }, 33);
            setTimeout(() => {
              setBackgroundPosition("-109.5px -35px");
            }, 50);
            moverPersonaje(-1, 0);
          } else {
            setBackgroundPosition("-109.5px -35px");
          }
          break;
        case "ArrowRight":
          setDirection("Right");

          setScaleX("scaleX(-1)");

          if (direction === "Right") {
            setBackgroundPosition("-370px -35px");
            setTimeout(() => {
              setBackgroundPosition("-325px -35px");
            }, 33);
            setTimeout(() => {
              setBackgroundPosition("-109.5px -35px");
            }, 50);
            moverPersonaje(1, 0);
          } else {
            setBackgroundPosition("-109.5px -35px");
          }
          break;
        case "ArrowDown":
          setDirection("Down");

          if (direction === "Down") {
            setBackgroundPosition("-150px -35px");
            setTimeout(() => {
              setBackgroundPosition("-195px -35px");
            }, 33);
            setTimeout(() => {
              setBackgroundPosition("-30.5px -35px");
            }, 50);
            moverPersonaje(0, 1);
          } else {
            setBackgroundPosition("-30.5px -35px");
          }
          break;
        default:
          break;
      }

      setDebounce(true);
      setTimeout(() => {
        setDebounce(false);
      }, 50);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mapa, backgroundImagePosition, debounce, event, direction]);

  useEffect(() => {
    const nuevoMapa = [...mapa.map((fila) => [...fila])];
    nuevoMapa[personajeCoordenadas.x][personajeCoordenadas.y].be = Bruno;
    setMapa(nuevoMapa);
  }, []);

  useEffect(() => {
    if (
      mapa[personajeCoordenadas.x][personajeCoordenadas.y].plant?.name ===
        "hierva" &&
      probability(0.25)
    ) {
      setEvent(true);
    }

    if (event) {
      generateRandomNumber();
      const timeoutDuel = setTimeout(() => {
        navigate("/duel");
      }, 1000);
      return () => {
        clearTimeout(timeoutDuel);
      };
    }
  }, [personajeCoordenadas, event, finishedTyping, navigate]);

  return (
    <div id="world">
      <div className="relative before:content-[''] before:w-full before:bg-[black] before:absolute before:left-0 before:z-[9999] before:rounded-[50%]">
        {mapa &&
          mapa.map((x, i) => (
            <div key={i}>
              {x.map((y, j) => (
                <div
                  key={j}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(/newpokemon/superface/${y.superficie.name}.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  className="celda"
                >
                  {y.plant && (
                    <img
                      width="100%"
                      alt={j.toString()}
                      src={"/newpokemon/plant/" + y.plant.name + ".png"}
                    />
                  )}
                  {y.be?.name === "rock" && (
                    <img
                      width="100%"
                      alt={j.toString()}
                      src={"/newpokemon/elements/" + y.be.name + ".png"}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}

        <div
          className="personaje absolute"
          style={{
            backgroundImage: `url(${spriteBruno}`,
            backgroundPosition: backgroundImagePosition,
            transform: scaleX + "translateY(-37px)",
            backgroundRepeat: "no-repeat",
            top: `${personajeCoordenadas.y * 37}px`,
            left: `${personajeCoordenadas.x * 37}px`,
            zIndex: 999,
            transition: "top 50ms ease, left 50ms ease",
          }}
        ></div>
        {text && (
          <DivText className="absolute w-full bottom-0 z-[1000]">
            {displayText}
          </DivText>
        )}
      </div>
    </div>
  );
};

export default World;
