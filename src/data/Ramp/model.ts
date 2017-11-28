import { Record } from "immutable";

interface RampProps {
  name: string;
  isAnimated: boolean;
}

class Ramp extends Record<RampProps>({
  name: "New ramp",
  isAnimated: false,
}) {}

export { Ramp };
