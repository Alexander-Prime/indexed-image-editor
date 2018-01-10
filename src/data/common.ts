import { List } from "immutable";

import { Rgb } from "common/types";

import { Image } from "data/Image";

type ColorIndex = [number, number];

namespace ColorIndex {
  export const matches = (a: ColorIndex, b: ColorIndex) =>
    a[0] === b[0] && a[1] === b[1];

  export const toRgb = (image: Image, colorIndex: ColorIndex): Rgb =>
    image.palette.getIn([colorIndex[0], "colors", colorIndex[1]], [0, 0, 0]);
}

type Frame = List<ColorIndex | undefined>;

export { ColorIndex, Frame };
