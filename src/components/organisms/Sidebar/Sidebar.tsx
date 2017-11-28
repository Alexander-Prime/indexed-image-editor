import React from "react";

import { PaletteView } from "components/molecules";

import "./Sidebar.scss";

interface Props {}

const Sidebar = (_: Props) => (
  <div className="sidebar">
    <PaletteView className="sidebar-palette" />
  </div>
);

export { Sidebar };
