import { useEffect, useRef, useState } from "react";
import OptionsInventary from "./options-inventary";

const Bag = () => {
  const staticCanvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const canvas = staticCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Función para cargar y dibujar una imagen en dos posiciones
    const loadAndDrawImage = (src: string) => {
      const img = new Image();
      img.src = `${import.meta.env.BASE_URL}${src}`;

      // Cuando la imagen se carga, dibuja ambas posiciones
      img.onload = () => {
        // Dibuja el fondo
        ctx.drawImage(img, 8, 24, 240, 160, 0, 0, canvas.width, canvas.height);

        // Dibuja el elemento dinámico
        const dynamicSy = 25 + selectedIndex * 24;
        ctx.drawImage(img, 506, dynamicSy, 75, 12.5, 32, 10, 95, 10);
      };
    };

    loadAndDrawImage("bag/bg.png");
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
      <OptionsInventary selectedIndex={selectedIndex} />
    </div>
  );
};

export default Bag;
