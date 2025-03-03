export default function renderCanvasCharacter(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  text: string
) {
  const scale = 1;
  const sy = 618;
  // Convertir el puntaje en un array de dígitos
  const textCharacter = text.split("");
  const digitWidth = 10; // Ancho de cada número en el sprite
  const digitHeight = 16; // Alto de cada número en el sprite
  textCharacter.forEach((letter: string, index: number) => {
    // Convertir el dígito en un número para seleccionar su posición en el sprite
    const characterChartCode = letter.charCodeAt(0);
    console.log(characterChartCode);
    // Dibujar el dígito en el canvas
    ctx.drawImage(
      img,
      (characterChartCode - (characterChartCode > 80 ? 81 : 65)) * 15.83 + 144,
      characterChartCode > 80 ? sy + 15 : sy,
      digitWidth,
      digitHeight, // sw, sh (ancho y alto del dígito)
      60 + index * digitWidth * scale,
      x, // dx, dy (posición en el canvas)
      digitWidth * scale,
      digitHeight * scale // dw, dh (ancho y alto en el canvas)
    );
  });
}
