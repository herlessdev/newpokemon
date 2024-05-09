import "./style.css";
import { useState, useEffect } from "react";

interface Props {
  name: string;
}

export default function ShowWords({ name }: Props) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [saltito, setSaltito] = useState(true);
  const frameCount = 3;
  const spriteBruno = "/newpokemon/sprites/sprite-bruno.png";

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevFrameIndex) => (prevFrameIndex + 1) % frameCount);
      setSaltito(!saltito);
    }, 150);

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameIndex]);

  return (
    <div className="show-words">
      <div>
        <div
          style={{
            transform: `${saltito ? "translateY(3px)" : "translateY(0px)"}`,
            backgroundPosition: `0px -${frameIndex * 66}px`,
            backgroundImage: `url(${spriteBruno})`,
          }}
        />
        <div />
      </div>
      <div>
        <h3>YOUR NAME?</h3>
        <div>
          <div
            className="flecha-show-words"
            style={{ animation: "oscilate 1s infinite" }}
          ></div>

          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="show-letter"
                style={{
                  animation:
                    name?.length === i ? "spaceLetter .75s infinite" : "",
                }}
              >
                {name?.[i] && name[i]}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
