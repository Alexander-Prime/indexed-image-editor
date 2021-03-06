import { Record } from "immutable";

import { ColorIndex } from "data/common";
import { Image } from "data/Image";
import { Theme } from "data/Theme";

interface AppStateProps {
  image: Image;
  theme: Theme;
  zoom: number;
  selectedColor: ColorIndex;
  currentFrame: number;
  shiftBack: boolean;
  shiftForward: boolean;
}

class AppState extends Record<AppStateProps>({
  image: new Image(),
  theme: new Theme(),
  zoom: 16,
  selectedColor: [0, 0],
  currentFrame: 0,
  shiftBack: false,
  shiftForward: false,
}) {}

export { AppState };
