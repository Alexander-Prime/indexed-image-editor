import { List, Record } from "immutable";

import { Frame } from "data/Frame";

interface StripProps {
  frames: List<Frame>;
}

class Strip extends Record<StripProps>({
  frames: List.of(new Frame()),
}) {}

export { Strip };
