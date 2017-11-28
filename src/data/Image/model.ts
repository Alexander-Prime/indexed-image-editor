import { List, Record } from "immutable";

import { Frame } from "data/Frame";
import { Palette } from "data/Palette";

interface ImageProps {
  width: number;
  height: number;
  frames: List<Frame>;
  palette: Palette;
}

class Image extends Record<ImageProps>({
  width: 32,
  height: 32,
  frames: List.of(new Frame()),
  palette: new Palette(),
}) {}

export { Image };
