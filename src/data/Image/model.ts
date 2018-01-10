import { List, Record } from "immutable";

import { Rgb } from "common/types";

import { ColorIndex } from "data/common";
import { Ramp } from "data/Ramp";

const defaultWidth = 32;
const defaultHeight = 32;
const defaultFrame = List().setSize(defaultWidth * defaultHeight);

interface ImageProps {
  width: number;
  height: number;
  frames: List<List<ColorIndex | undefined>>;
  palette: List<Ramp>;
}

class Image extends Record<ImageProps>({
  width: defaultWidth,
  height: defaultHeight,
  frames: List.of(defaultFrame),
  palette: List.of(
    new Ramp({
      colors: List.of(
        Rgb(0, 0, 0),
        Rgb(255, 0, 0),
        Rgb(0, 255, 0),
        Rgb(0, 0, 255),
        Rgb(255, 255, 255),
      ),
    }),
  ),
}) {}

export { Image };
