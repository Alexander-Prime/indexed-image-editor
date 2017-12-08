import { Record } from "immutable";

import { Image } from "data/Image";
import { Theme } from "data/Theme";

interface AppStateProps {
  image: Image;
  theme: Theme;
  zoom: number;
  selectedColor: number;
}

class AppState extends Record<AppStateProps>({
  image: new Image(),
  theme: new Theme(),
  zoom: 32,
  selectedColor: 0,
}) {}

export { AppState };
