import { List, Map, Record } from "immutable";

import { Rgb } from "common/types";
import { Ramp } from "data/Ramp";

interface PaletteProps {
  colors: List<Rgb>;
  ramps: Map<number, Ramp>;
}

class Palette extends Record<PaletteProps>({
  colors: List.of(
    Rgb(0, 0, 0),
    Rgb(255, 0, 0),
    Rgb(0, 255, 0),
    Rgb(0, 0, 255),
    Rgb(255, 255, 255),
  ),
  ramps: Map.of(0, new Ramp({ name: "Ramp 1" })),
}) {}

export { Palette };
