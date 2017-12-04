import { List, Record } from "immutable";

interface FrameProps {
  pixels: List<number | undefined>; // palette index, undefined for transparent
}

const x = undefined;
const defaultData = [
  [x, x, 0, 0, 0, 0, x, x],
  [x, 0, x, x, x, x, 0, x],
  [0, x, x, x, x, x, x, 0],
  [0, x, x, x, x, x, x, 0],
  [0, x, x, x, x, x, x, 0],
  [0, x, x, x, x, x, x, 0],
  [x, 0, x, x, x, x, 0, x],
  [x, x, 0, 0, 0, 0, x, x],
].reduce((prior, current) => prior.concat(...current));

class Frame extends Record<FrameProps>({
  pixels: List.of(...defaultData),
}) {}

export { Frame };
