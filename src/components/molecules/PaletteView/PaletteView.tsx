import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Rgb } from "common/types";

import { Swatch } from "components/atoms";
import { RampHeading } from "components/molecules";

import { AppState, pickColor } from "data/AppState";
import { Palette } from "data/Palette";

import "./PaletteView.scss";

interface DispatchProps {
  pickColor: typeof pickColor;
}

interface OwnProps {
  className?: string;
  palette: Palette;
  selectedColor: number;
}

type Props = DispatchProps & OwnProps;

class PaletteViewInternal extends React.PureComponent<Props> {
  render() {
    const { className, palette, selectedColor } = this.props;
    return (
      <div className={classNames("palette", className)}>
        <header className="palette-header">Palette</header>
        <div className="palette-colors">
          {palette.colors.map((color, i) => {
            const ramp = palette.ramps.get(i);
            return [
              ramp && (
                <RampHeading
                  className="palette-colors-divider"
                  key={`${ramp.name}@${i}`}
                  palette={palette}
                  index={i}
                  ramp={ramp}
                />
              ),
              <Swatch
                className={classNames("palette-colors-swatch", {
                  "is-selected": selectedColor === i,
                })}
                key={i}
                color={color}
                index={i}
                onPick={this.onPickColor}
              />,
            ];
          })}
        </div>
      </div>
    );
  }

  private onPickColor = (_: Rgb, index: number) => {
    this.props.pickColor(index);
  };
}

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps =>
  bindActionCreators({ pickColor }, dispatch);

const PaletteView = connect(undefined, mapDispatchToProps)(PaletteViewInternal);

export { PaletteView };
