import { List, Map, Record } from "immutable";

import { Ramp } from "data/Ramp";

interface PaletteProps {
  colors: List<[number, number, number]>; // [r, g, b]: 0-255
  ramps: Map<number, Ramp>;
}

class Palette extends Record<PaletteProps>({
  colors: List.of([0, 0, 0] as [number, number, number]),
  ramps: Map.of(0, new Ramp({ name: "Ramp 1" })),
}) {}

export { Palette };
