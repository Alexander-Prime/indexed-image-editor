import { List, Record } from "immutable";

import { Palette } from "data/Palette";

const defaultWidth = 32;
const defaultHeight = 32;
const defaultFrame = List().setSize(defaultWidth * defaultHeight);

interface ImageProps {
  width: number;
  height: number;
  frames: List<List<number | undefined>>;
  palette: Palette;
}

class Image extends Record<ImageProps>({
  width: defaultWidth,
  height: defaultHeight,
  frames: List.of(defaultFrame),
  palette: new Palette(),
}) {}

export { Image };
