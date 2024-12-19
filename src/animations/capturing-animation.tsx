import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDuelData } from "../context/duel-data-provider/useDuel";

const CapturingAnimation: React.FC = () => {
  const { setSequence } = useDuelData();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const image = new Image();
  image.src = `${import.meta.env.BASE_URL}objects/pokeballs.png`;

  const ballRadius = 20; // Tamaño de la esfera
  const spriteWidth = 16;
  const spriteHeight = 16;

  const gravity = 500; // Aceleración debido a la gravedad (px/s^2)
  const initialVelocity = -50; // Velocidad inicial en px/s (hacia arriba, opcional)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const startX = 540;
    const startY = 50;
    const floorY = 200 - ballRadius * 2; // Suelo

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = (currentTime - startTime) / 1000; // Tiempo en segundos

      // Ecuación del movimiento vertical
      let currentY =
        startY +
        initialVelocity * elapsedTime +
        0.5 * gravity * elapsedTime * elapsedTime;

      // Si toca el suelo, detener la caída
      if (currentY >= floorY) {
        currentY = floorY;        
        setSequence("captured")
      }

      // Limpiar el canvas y redibujar
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(
        image,
        32, // Primer fotograma
        0,
        spriteWidth,
        spriteHeight,
        startX - ballRadius,
        currentY - ballRadius,
        ballRadius * 2,
        ballRadius * 2
      );

      // Continuar animación si no llegó al suelo
      if (currentY < floorY) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return createPortal(
    <canvas ref={canvasRef} width={750} height={490} className="absolute" />,
    document.body
  );
};

export default CapturingAnimation;
