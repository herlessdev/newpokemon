export default function renderScoreDigits(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  pad: number,
  direction: boolean,
  score: number
) {
  const scale = 1;
  const sy = 598;
  // Convertir el puntaje en un array de dígitos
  const scoreDigits = score.toString().padStart(pad, "0").split("");
  const digitWidth = 9; // Ancho de cada número en el sprite
  const digitHeight = 20; // Alto de cada número en el sprite
  scoreDigits.forEach((digit: string, index: number) => {
    // Convertir el dígito en un número para seleccionar su posición en el sprite
    const digitIndex = parseInt(
      direction ? digit : scoreDigits[scoreDigits?.length - index - 1]
    );

    // Dibujar el dígito en el canvas
    ctx.drawImage(
      img,
      digitIndex * 11.1 + 145,
      sy,
      digitWidth,
      digitHeight, // sw, sh (ancho y alto del dígito)
      x + (direction ? index : -index) * digitWidth * scale,
      y, // dx, dy (posición en el canvas)
      digitWidth * scale,
      digitHeight * scale // dw, dh (ancho y alto en el canvas)
    );
  });
}
