import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import cx from "../../../lib/cx";
import { controls } from "../../../data/controllers";

const allGroup: string[] = [
  "AGMT",
  "BHNU",
  "CIOV",
  "DJPW",
  "EKQX",
  "FLRY",
  "  SZ",
  ".,  ",
];

interface ElementoSeleccionado {
  id: string;
  element: string;
  offsetTop: number;
  offsetBottom: number;
  offsetLeft: number;
  offsetRight: number;
}

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
  setIndexDialogue: Dispatch<SetStateAction<number>>;
}
export default function TableKeyboard({
  name,
  setName,
  setStep,
  setIndexDialogue,
}: Props) {
  const [selectedElement, setSelectedElement] =
    useState<ElementoSeleccionado | null>(null);
  const [elementosArray, setElementosArray] = useState<ElementoSeleccionado[]>(
    []
  );
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (event: any) => {
    const tecla = event?.key?.toLowerCase();

    const centroX = selectedElement
      ? (selectedElement.offsetLeft + selectedElement.offsetRight) / 2
      : 0;
    const centroY = selectedElement
      ? (selectedElement.offsetTop + selectedElement.offsetBottom) / 2
      : 0;

    if (tecla === "arrowright") {
      let elementoSeleccionado;
      let distanciaMinima = Infinity;

      elementosArray.forEach((current) => {
        const centroYEl = (current.offsetTop + current.offsetBottom) / 2;
        const distance = Math.sqrt(
          Math.abs(centroX - current.offsetLeft) ** 2 +
            Math.abs(centroY - centroYEl) ** 2
        );

        if (current.offsetLeft > centroX && distance < distanciaMinima) {
          elementoSeleccionado = current;
          distanciaMinima = distance;
        }
      });
      if (elementoSeleccionado) {
        setSelectedElement(elementoSeleccionado);
      }
    }
    if (tecla === "arrowleft") {
      let elementoSeleccionado;
      let distanciaMinima = Infinity;

      elementosArray.forEach((current) => {
        const centroYEl = (current.offsetTop + current.offsetBottom) / 2;
        const distance = Math.sqrt(
          Math.abs(centroX - current.offsetRight) ** 2 +
            Math.abs(centroY - centroYEl) ** 2
        );

        if (current.offsetRight < centroX && distance < distanciaMinima) {
          elementoSeleccionado = current;
          distanciaMinima = distance;
        }
      });
      if (elementoSeleccionado) {
        setSelectedElement(elementoSeleccionado);
      }
    }
    if (tecla === "arrowup") {
      let elementoSeleccionado;
      let distanciaMinima = Infinity;

      elementosArray.forEach((current) => {
        const centroXEl = (current.offsetLeft + current.offsetRight) / 2;
        const distance = Math.sqrt(
          Math.abs(centroX - centroXEl) ** 2 +
            Math.abs(centroY - current.offsetBottom) ** 2
        );

        if (current.offsetBottom < centroY && distance < distanciaMinima) {
          elementoSeleccionado = current;
          distanciaMinima = distance;
        }
      });
      if (elementoSeleccionado) {
        setSelectedElement(elementoSeleccionado);
      }
    }
    if (tecla === "arrowdown") {
      let elementoSeleccionado;
      let distanciaMinima = Infinity;

      elementosArray.forEach((current) => {
        const centroXEl = (current.offsetLeft + current.offsetRight) / 2;
        const distance = Math.sqrt(
          Math.abs(centroX - centroXEl) ** 2 +
            Math.abs(centroY - current.offsetTop) ** 2
        );

        if (current.offsetTop > centroY && distance < distanciaMinima) {
          elementoSeleccionado = current;
          distanciaMinima = distance;
        }
      });
      if (elementoSeleccionado) {
        setSelectedElement(elementoSeleccionado);
      }
    }

    if (tecla === controls?.interactuar && name.length <= 6) {
      if (selectedElement?.element) {
        setName(name + selectedElement?.element);
      }
    }

    if (tecla === controls.retroceder) {
      setName(name.slice(0, name.length - 1));
    }

    if (tecla === controls?.menú) {
      setStep(0);
      setIndexDialogue(14);
    }
  };

  useEffect(() => {
    const elementosArray: ElementoSeleccionado[] = [];
    for (const key in refs.current) {
      if (key in refs.current) {
        const indices = key.split("-");
        const elemento = refs.current[key];
        if (elemento) {
          const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = elemento;
          const elementoSeleccionado: ElementoSeleccionado = {
            id: key,
            element: allGroup[parseInt(indices[1])][parseInt(indices[0])],
            offsetTop,
            offsetBottom: offsetTop + offsetHeight,
            offsetLeft,
            offsetRight: offsetLeft + offsetWidth,
          };
          if (key === "0-0" && !selectedElement) {
            setSelectedElement(elementoSeleccionado);
          }
          elementosArray.push(elementoSeleccionado);
        }
      }
    }
    setElementosArray(elementosArray);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedElement, name]);
  return (
    <div
      style={{
        clipPath:
          "polygon(12px 0px, 12px 15px, 0px 15px, 0px calc(100% - 15px), 12px calc(100% - 15px), 12px 100%, calc(100% - 18px) 100%, calc(100% - 18px) calc(100% - 15px), calc(100% - 6px) calc(100% - 15px), calc(100% - 6px) 20%, 100% 20%, 100% 0%)",
      }}
      className="relative z-[2] table-keyboard bg-[#9fc9e2] border-[3px] pr-[18px] pl-[12px] py-[15px] border-[#6f90a4] w-[500px]"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="w-full flex bg-[#79a8c0] items-center justify-center py-[15px] gap-[1px]">
        {allGroup.map((x, i) => (
          <div
            key={i}
            className={cx(
              "flex flex-col gap-[1px]",
              i === 2 || i === 5 ? "mr-[40px]" : ""
            )}
          >
            {x.split("").map((y, index) => {
              return (
                <div
                  key={index}
                  ref={(el) => (refs.current[`${index}-${i}`] = el)}
                  className="w-[40px] h-[50px] flex items-center justify-center text-center text-[25px] text-[white] relative font-nova"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                >
                  {y}
                  <motion.div
                    initial={{ opacity: 1, backgroundColor: "#f00" }}
                    animate={{ opacity: 0, backgroundColor: "#fff" }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="w-full h-full top-0 left-0 absolute bg-[white]"
                    style={{
                      clipPath:
                        "polygon(100% 100%,100% 0%,0% 0%, 0% 45%, 10% 45%, 10% 10%, 90% 10%, 90% 45%, 100% 45%, 100% 55%, 90% 55%, 90% 90%, 10% 90%, 10% 55%, 0% 55%, 0% 100%)",
                      display:
                        selectedElement?.id === `${index}-${i}`
                          ? "flex"
                          : "none",
                    }}
                  ></motion.div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
