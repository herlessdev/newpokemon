import { useEffect, useRef } from "react";

interface Props {
  selectedIndex: number;
}

const BarScroll = ({ selectedIndex }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Cargar la imagen una sola vez al montar el componente.
  useEffect(() => {
    if (!imgRef.current) {
      const img = new Image();
      img.src = `${import.meta.env.BASE_URL}sprites/miscellaneous.png`;
      img.onload = () => {
        imgRef.current = img;
        drawIndicator(img, selectedIndex);
      };
    } else {
      // Si la imagen ya está cargada, simplemente dibujar
      drawIndicator(imgRef.current, selectedIndex);
    }
  }, [selectedIndex]);

  const drawIndicator = (img: HTMLImageElement, index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scaleFactor = 4;
    const sX = 491.5;
    const sY = 388.5;
    const sourceWidth = 20;
    const sourceHeight = 28;

    const dX = 0;
    const dY = ((canvas.height - sourceHeight / (scaleFactor - 1)) / 150) * index;
    const destWidth = canvas.width;
    const destHeight = 10;

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

  return (
    <canvas
      ref={canvasRef}
      className="w-[20px] h-[395px] top-12 left-[712px] absolute"
    />
  );
};

export default BarScroll;
