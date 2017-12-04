import { Record } from "immutable";

import { Image } from "data/Image";
import { Theme } from "data/Theme";

interface AppStateProps {
  image: Image;
  theme: Theme;
  zoom: number;
}

class AppState extends Record<AppStateProps>({
  image: new Image(),
  theme: new Theme(),
  zoom: 32,
}) {}

export { AppState };
