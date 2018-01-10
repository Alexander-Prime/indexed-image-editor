import React from "react";

import { PaletteView } from "components/molecules";

import "./Sidebar.scss";

const Sidebar = () => (
  <div className="sidebar">
    <PaletteView className="sidebar-palette" />
  </div>
);

export { Sidebar };
