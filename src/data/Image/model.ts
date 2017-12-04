import { Record } from "immutable";

import { Palette } from "data/Palette";
import { Strip } from "data/Strip";

interface ImageProps {
  width: number;
  height: number;
  strip: Strip;
  palette: Palette;
}

class Image extends Record<ImageProps>({
  width: 8,
  height: 8,
  strip: new Strip(),
  palette: new Palette(),
}) {}

export { Image };
