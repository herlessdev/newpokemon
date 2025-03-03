import { useEffect, useRef } from "react";

interface Props {
  selectedIndex: number;
}

const BarScroll = ({ selectedIndex }: Props) => {
  const CanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = CanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}sprites/miscellaneous.png`;

    img.onload = () => {
      // Limpiar el canvas antes de redibujar
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Dibuja el indicador dinámico
      const scaleFactor = 4;
      const sX = 491.5; // Posición X de la imagen en el sprite
      const sY = 388.5; // Calculamos la parte de la imagen a renderizar
      const sourceWidth = 20;
      const sourceHeight = 28;

      const dX = 0; // Posición en el canvas
      const dY =
        ((canvas.height - sourceHeight / (scaleFactor - 1)) / 150) *
        selectedIndex;
      const destWidth = canvas.width;
      const destHeight = 10;

      console.log(canvas.width);

      ctx.drawImage(
        img,
        sX,
        sY,
        sourceWidth / scaleFactor,
        sourceHeight / scaleFactor,
        dX,
        dY,
        destWidth,
        destHeight
      );
    };
  }, [selectedIndex]);

  return (
    <canvas
      ref={CanvasRef}
      className="w-[20px] h-[395px] top-12 left-[712px] absolute bg-[transparent]"
    />
  );
};

export default BarScroll;
