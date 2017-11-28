import { List, Map, Record } from "immutable";

import { Ramp } from "data/Ramp";

interface PaletteProps {
  colors: List<string>; // format "#rrggbb"
  ramps: Map<number, Ramp>;
}

class Palette extends Record<PaletteProps>({
  colors: List(),
  ramps: Map(),
}) {}

export { Palette };
