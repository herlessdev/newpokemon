import { useEffect, useState } from "react";
import "./style.css";
import crearSeed from "../../data/data";

const World = () => {
  const [personajeCoordenadas, setPersonajeCoordenadas] = useState({
    x: 0,
    y: 10,
  });
  const [direction, setDirection] = useState("Down");
  const [scaleX, setScaleX] = useState("");
  const [backgroundImagePosition, setBackgroundPosition] = useState("");
  const [debounce, setDebounce] = useState(false);
  const spriteBruno = "/newpokemon/sprites/sprite-bruno.png";
  const [mapa, setMapa] = useState(crearSeed());
  const texturaSuperficie: {
    [key: string]: string;
  } = {
    pasto: "/newpokemon/superface/pasto.png",
    tierra:
      "https://cdn1.vectorstock.com/i/1000x1000/96/70/pixel-minecraft-style-land-block-background-vector-36579670.jpg",
  };

  const textura1: {
    [key: string]: string;
  } = {
    hierva: "/newpokemon/1/hierva.png",
    salto_inicio: "/newpokemon/1/salto-inicio.png",
    salto_continue: "/newpokemon/1/salto-continue.png",
    salto_fin: "/newpokemon/1/salto-fin.png",
  };
  const moverPersonaje = (deltaX: number, deltaY: number) => {
    const newPosX = personajeCoordenadas.x + deltaX;
    const newPosY = personajeCoordenadas.y + deltaY;

    if (
      newPosX >= 0 &&
      newPosX < mapa.length &&
      newPosY >= 0 &&
      newPosY < mapa[0].length &&
      !mapa[newPosX][newPosY].especie &&
      !(mapa[newPosX][newPosY][1].startsWith("salto_"))
    ) {
      const nuevoMapa = [...mapa.map((fila) => [...fila])];
      const x: number = personajeCoordenadas.x;
      const y: number = personajeCoordenadas.y;
      if (nuevoMapa && nuevoMapa[x] && nuevoMapa[x][y]) {
        nuevoMapa[x][y]["especie"] = "";
      }
      nuevoMapa[newPosX][newPosY]["especie"] = "bruno";
      setMapa(nuevoMapa);
      setPersonajeCoordenadas({ x: newPosX, y: newPosY });
    }
  };

  useEffect(() => {
    if (debounce) {
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
  }, [mapa, backgroundImagePosition, debounce]);

  useEffect(() => {
    const nuevoMapa = [...mapa.map((fila) => [...fila])];
    nuevoMapa[personajeCoordenadas.x][personajeCoordenadas.y]["especie"] = "bruno"
    setMapa(nuevoMapa);
  }, []);
  return (
    <div id="world">
      <div className="relative">
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
                    backgroundImage: `url(${texturaSuperficie[y.superficie]})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  className="celda"
                >
                  {textura1[y[1]] && (
                    <img width="100%" alt={j.toString()} src={textura1[y[1]]} />
                  )}
                </div>
              ))}
            </div>
          ))}

        <div
          className="absolute"
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
        />
      </div>
    </div>
  );
};

export default World;
