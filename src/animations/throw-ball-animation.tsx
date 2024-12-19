import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDuelData } from "../context/duel-data-provider/useDuel";

const ThrowBallAnimation: React.FC = () => {
  const { setSequence } = useDuelData();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null); // Ref para almacenar el ID de la animación
  const image = new Image();
  image.src = `${import.meta.env.BASE_URL}objects/pokeballs.png`;
  const ballRadius = 10; // Tamaño de la esfera (Pokébola)
  const spriteWidth = 16; // Ancho de cada fotograma del sprite
  const spriteHeight = 16; // Alto de cada fotograma del sprite
  const spriteColumns = 5; // Número de columnas en el sprite

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuración de la animación
    const gravity = 80; // Gravedad
    const startX = 80; // Posición inicial X
    const startY = 100; // Posición inicial Y
    const vX = 100; // Velocidad inicial en X (px/s)
    const vY = 100; // Velocidad inicial en Y (px/s)

    // Convertir duración a segundos

    const duration = 1350;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime; // Tiempo transcurrido
      const t = elapsed / 1000; // Tiempo en segundos

      // Calcular posiciones actuales
      const currentX = startX + vX * t;
      const currentY = startY - (vY * t - 0.5 * gravity * t ** 2);

      // Limpiar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const frameIndex = 2;
      //Math.floor(t * 5) % spriteColumns;

      // Dibujar la bola
      ctx.drawImage(
        image,
        frameIndex * spriteWidth, // X en el sprite
        0, // Y en el sprite
        spriteWidth, // Ancho del fotograma
        spriteHeight, // Alto del fotograma
        currentX - ballRadius, // Posición X en el canvas
        currentY - ballRadius, // Posición Y en el canvas
        ballRadius * 1.5, // Ancho en el canvas
        ballRadius * 1.5 // Alto en el canvas
      );
      if (elapsed < duration) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        setSequence("capturing");
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current); // Detener la animación
      }
    };
  }, []);

  return createPortal(
    <canvas ref={canvasRef} className="w-[750px] h-[490px] absolute" />,
    document.body
  );
};

export default ThrowBallAnimation;
