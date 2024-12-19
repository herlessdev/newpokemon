import { useEffect, useRef, useState } from "react";
import OptionsInventary from "./options-inventary";

const Bag = () => {
  const staticCanvasRef = useRef<HTMLCanvasElement>(null);
  const dynamicCanvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentSyRef = useRef(25); // Posición actual animada
  const currentDwRef = useRef(95); // Ancho actual
  const isAnimatingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = dynamicCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}bag/bg.png`;

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

  useEffect(() => {
    const canvas = staticCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}bag/bg.png`;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 8, 24, 240, 160, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnimatingRef.current) return; // Ignorar si la animación está en progreso

      if (event.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % 2);
      } else if (event.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + 2) % 2);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={staticCanvasRef} className="w-full h-full absolute" />
      <canvas ref={dynamicCanvasRef} className="w-full h-full absolute z-10" />
      <OptionsInventary selectedIndex={selectedIndex} />
    </div>
  );
};

export default Bag;
