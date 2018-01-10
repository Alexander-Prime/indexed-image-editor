import classNames from "classnames";
import { List } from "immutable";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { RampView } from "components/molecules";

import { AppState, pickColor } from "data/AppState";
import { ColorIndex } from "data/common";
import { Ramp } from "data/Ramp";

import "./PaletteView.scss";

interface StateProps {
  palette: List<Ramp>;
  selectedColor: ColorIndex;
}

interface DispatchProps {
  pickColor: typeof pickColor;
}

interface OwnProps {
  className?: string;
}

type Props = StateProps & DispatchProps & OwnProps;

class PaletteViewInternal extends React.PureComponent<Props> {
  render() {
    const { className, palette, selectedColor } = this.props;
    return (
      <div className={classNames("palette", className)}>
        <header className="palette-header">Palette</header>
        <div className="palette-colors">
          {palette.map((ramp, i) => (
            <RampView
              className="palette-colors-divider"
              key={`${ramp.name}@${i}`}
              index={i}
              ramp={ramp}
              selectedColor={selectedColor}
              onPickColor={this.onPickColor}
            />
          ))}
        </div>
      </div>
    );
  }

  private onPickColor = (colorIndex: ColorIndex) => {
    this.props.pickColor(colorIndex);
  };
}

const mapStateToProps = (state: AppState): StateProps => ({
  palette: state.image.palette,
  selectedColor: state.selectedColor,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps =>
  bindActionCreators({ pickColor }, dispatch);

const PaletteView = connect(mapStateToProps, mapDispatchToProps)(
  PaletteViewInternal,
);

export { PaletteView };
