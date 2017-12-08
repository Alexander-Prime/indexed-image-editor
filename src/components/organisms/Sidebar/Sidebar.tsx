import React from "react";
import { connect, MapStateToProps } from "react-redux";

import { PaletteView } from "components/molecules";

import { AppState } from "data/AppState";
import { Palette } from "data/Palette";

import "./Sidebar.scss";

interface StateProps {
  palette: Palette;
  selectedColor: number;
}

interface OwnProps {}

type Props = StateProps & OwnProps;

const SidebarInternal = (props: Props) => (
  <div className="sidebar">
    <PaletteView
      className="sidebar-palette"
      palette={props.palette}
      selectedColor={props.selectedColor}
    />
  </div>
);

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (
  state: AppState,
): StateProps => ({
  palette: state.image.palette,
  selectedColor: state.selectedColor,
});

const Sidebar = connect(mapStateToProps)(SidebarInternal);

export { Sidebar };
