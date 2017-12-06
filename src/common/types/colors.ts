type Rgb = [number, number, number];
type Rgba = [number, number, number, number];

function Rgb(r: number, g: number, b: number): Rgb {
  return [r, g, b];
}

function Rgba(r: number, g: number, b: number, a: number): Rgba {
  return [r, g, b, a];
}

export { Rgb, Rgba };
