import { List, Record } from "immutable";

import { Rgb } from "common/types";

interface RampProps {
  name: string;
  isAnimated: boolean;
  colors: List<Rgb>;
}

class Ramp extends Record<RampProps>({
  name: "New ramp",
  isAnimated: false,
  colors: List.of(Rgb(0, 0, 0)),
}) {}

export { Ramp };
