import { Record } from "immutable";

interface ThemeProps {
  backgroundColor: string;
  foregroundColor: string;
  gridColor: string;
}

class Theme extends Record<ThemeProps>({
  backgroundColor: "#243c4b",
  foregroundColor: "#e0e0e0",
  gridColor: "rgba(255, 255, 255, 0.6)",
}) {}

export { Theme };
