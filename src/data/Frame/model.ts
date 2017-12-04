import { List, Record } from "immutable";

interface FrameProps {
  pixels: List<number | undefined>; // palette index, undefined for transparent
}

class Frame extends Record<FrameProps>({
  pixels: List(),
}) {}

export { Frame };
