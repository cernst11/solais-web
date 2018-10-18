import React, { Component } from "react";
import "./Light.css";
import ProgressRing from "../ProgressRing/ProgressRing";
import { MdLightbulbOutline } from "react-icons/md";
import { IconContext } from "react-icons";

class Light extends Component {
    /*     constructor(props) {
        super(props);
    }
 */
    render() {
        const centerIcon = (
            <IconContext.Provider value={{ color: this.props.color, className: "light_icon" }}>
                <MdLightbulbOutline x="28" y="30" />
            </IconContext.Provider>
        );
        return (
            <div className="light" onClick={this.props.onClick}>
                <ProgressRing
                    radius={45}
                    id={this.props.id}
                    brightness={this.props.brightness}
                    color={this.props.color}
                    stroke={3}
                    progress={this.props.power === "on" ? this.props.brightness : 0}
                    centerIcon={centerIcon}
                />
                <div className="light_icon-label">{this.props.label} </div>
            </div>
        );
    }
}

export default Light;
