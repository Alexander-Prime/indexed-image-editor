type Rgb = [number, number, number];
type Rgba = [number, number, number, number];

function Rgb(r: number, g: number, b: number): Rgb {
  return [r, g, b];
}

function Rgba(r: number, g: number, b: number, a: number): Rgba {
  return [r, g, b, a];
}

namespace Rgb {
  export const toHex = (color: Rgb): string =>
    "#" +
    color[0].toString(16).padStart(2, "0") +
    color[1].toString(16).padStart(2, "0") +
    color[2].toString(16).padStart(2, "0");
}

export { Rgb, Rgba };
