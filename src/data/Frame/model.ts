import { List, Record } from "immutable";

interface FrameProps {
  pixels: List<number>; // palette index, -1 for transparent
}

class Frame extends Record<FrameProps>({
  pixels: List(),
}) {}

export { Frame };
