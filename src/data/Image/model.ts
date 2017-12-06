import { List, Record } from "immutable";

import { Palette } from "data/Palette";

const defaultWidth = 8;
const defaultHeight = 8;
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

interface ImageProps {
  width: number;
  height: number;
  frames: List<List<number | undefined>>;
  palette: Palette;
}

class Image extends Record<ImageProps>({
  width: defaultWidth,
  height: defaultHeight,
  frames: List.of(List.of(...defaultData)),
  palette: new Palette(),
}) {}

export { Image };
