import { Record } from "immutable";

import { Image } from "data/Image";

interface AppStateProps {
  image: Image;
}

class AppState extends Record<AppStateProps>({
  image: new Image(),
}) {}

export { AppState };
