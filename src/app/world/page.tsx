import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import "./style.css";
import { bruno, mapaProps, probability } from "../../data/data";
import { useNavigate } from "react-router-dom";
import useTypingEffect from "../../hooks/useTypingEffect";
import DivText from "../../components/shared/div-text";
import useToggle from "../../hooks/useToggle";
import { UserDataContext } from "../../context/UserDataProvider";
import Menu from "./menu";
import { useDuelData } from "../../hooks/useDuel";

type PersonajeCoordenadas = {
  x: number;
  y: number;
};

interface Props {
  personajeCoordenadas: PersonajeCoordenadas;
  setPersonajeCoordenadas: Dispatch<SetStateAction<PersonajeCoordenadas>>;
  mapa: mapaProps[][];
  setMapa: Dispatch<SetStateAction<mapaProps[][]>>;
}

const World = ({
  mapa,
  setMapa,
  //randomNumber,
  personajeCoordenadas,
  setPersonajeCoordenadas,
}: Props) => {
  const [direction, setDirection] = useState("Down");
  const [scaleX, setScaleX] = useState("");
  const [backgroundImagePosition, setBackgroundPosition] = useState("");
  const [debounce, setDebounce] = useState(false);
  const [timeAnimation] = useState(150);
  const spriteBruno = "/newpokemon/sprites/sprite-bruno.png";
  const [text] = useState("");
  const [event, setEvent] = useState(false);
  const { displayText, finishedTyping } = useTypingEffect(text, 20);
  const { isOpen, onToggle } = useToggle();
  const { isOpen: menuOpen, onToggle: menuOnToggle } = useToggle();
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);
  const { generateRandomNumber } = useDuelData();

  const moverPersonaje = (deltaX: number, deltaY: number) => {
    const newPosX = personajeCoordenadas.x + deltaX;
    const newPosY = personajeCoordenadas.y + deltaY;

    if (
      newPosX >= 0 &&
      newPosX < mapa.length &&
      newPosY >= 0 &&
      newPosY < mapa[0].length &&
      mapa[newPosX][newPosY].be?.available !== "no"
    ) {
      const nuevoMapa = [...mapa.map((fila) => [...fila])];
      const x: number = personajeCoordenadas.x;
      const y: number = personajeCoordenadas.y;
      mapa[x][y].be = null;

      if (mapa[newPosX][newPosY].superficie?.available === "yes") {
        nuevoMapa[newPosX][newPosY].be = bruno;
        setMapa(nuevoMapa);
        setPersonajeCoordenadas({ x: newPosX, y: newPosY });
      }
      if (mapa[newPosX][newPosY].superficie?.available === "jump") {
        nuevoMapa[newPosX][newPosY + 1].be = bruno;
        setMapa(nuevoMapa);
        setPersonajeCoordenadas({ x: newPosX, y: newPosY + 1 });
      }
      if (mapa[newPosX][newPosY].superficie?.available === "map") {
        /*change map*/
      }
    }
  };

  console.log(userData);

  useEffect(() => {
    if (debounce) {
      return;
    }
    if (event) {
      return;
    }
    const handleKeyDown = (event: { key: string }) => {
      if (menuOpen) return;

      switch (event.key) {
        case "ArrowUp":
          setDirection("Up");
          if (direction === "Up") {
            if (isOpen) {
              setBackgroundPosition("-285.5px -35px");
              onToggle();
            } else {
              setBackgroundPosition("-242.5px -35px");
              onToggle();
            }
            setTimeout(() => {
              setBackgroundPosition("-70px -35px");
            }, timeAnimation);
            moverPersonaje(0, -1);
          } else {
            setBackgroundPosition("-70px -35px");
          }
          break;
        case "ArrowLeft":
          setDirection("Left");
          setScaleX("scaleX(1)");

          if (direction === "Left") {
            if (!isOpen) {
              setBackgroundPosition("-370px -35px");
              onToggle();
            } else {
              setBackgroundPosition("-325px -35px");
              onToggle();
            }
            setTimeout(() => {
              setBackgroundPosition("-109.5px -35px");
            }, timeAnimation);
            moverPersonaje(-1, 0);
          } else {
            setBackgroundPosition("-109.5px -35px");
          }
          break;
        case "ArrowRight":
          setDirection("Right");

          setScaleX("scaleX(-1)");

          if (direction === "Right") {
            if (!isOpen) {
              setBackgroundPosition("-370px -35px");
              onToggle();
            } else {
              setBackgroundPosition("-325px -35px");
              onToggle();
            }
            setTimeout(() => {
              setBackgroundPosition("-109.5px -35px");
            }, timeAnimation);
            moverPersonaje(1, 0);
          } else {
            setBackgroundPosition("-109.5px -35px");
          }
          break;
        case "ArrowDown":
          setDirection("Down");

          if (direction === "Down") {
            if (!isOpen) {
              setBackgroundPosition("-150px -35px");
              onToggle();
            } else {
              setBackgroundPosition("-195px -35px");
              onToggle();
            }
            setTimeout(() => {
              setBackgroundPosition("-30.5px -35px");
            }, timeAnimation);
            moverPersonaje(0, 1);
          } else {
            setBackgroundPosition("-30.5px -35px");
          }
          break;
        case "Enter":
          menuOnToggle();
          break;
        default:
          break;
      }

      setDebounce(true);
      setTimeout(() => {
        setDebounce(false);
      }, 150);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mapa, backgroundImagePosition, debounce, event, direction, menuOpen]);

  useEffect(() => {
    const nuevoMapa = [...mapa.map((fila) => [...fila])];
    nuevoMapa[personajeCoordenadas.x][personajeCoordenadas.y].be = bruno;
    setMapa(nuevoMapa);
  }, []);

  useEffect(() => {
    if (
      mapa[personajeCoordenadas.x][personajeCoordenadas.y].plant?.name ===
        "hierva" &&
      probability(0.2)
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
  }, [
    personajeCoordenadas,
    event,
    finishedTyping,
    navigate,
    mapa,
    generateRandomNumber,
  ]);

  return (
    <>
      <div id="world" className="relative">
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
                    {y.be?.name && y.be?.name !== "bruno" && (
                      <img
                        width="100%"
                        alt={j.toString()}
                        src={"/newpokemon/elements/" + y?.be?.name + ".png"}
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
              transition: "top 150ms ease-in-out, left 150ms ease-in-out",
            }}
          ></div>
          {text && (
            <DivText className="absolute w-full bottom-0 z-[1000]">
              {displayText}
            </DivText>
          )}
        </div>
      </div>
      {menuOpen && <Menu userData={userData} menuOnToggle={menuOnToggle} />}
    </>
  );
};

export default World;
