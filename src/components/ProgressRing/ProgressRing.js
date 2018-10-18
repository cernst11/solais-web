import React from "react";


class ProgressRing extends React.Component {
    constructor(props) {
        super(props);

        const { radius, stroke } = this.props;

        this.normalizedRadius = radius - stroke * 2;
        this.circumference = this.normalizedRadius * 2 * Math.PI;
    }

    render() {
        const { radius, stroke, progress, color, centerIcon } = this.props;
        const strokeDashoffset = this.circumference - (progress / 100) * this.circumference;
        const strokeTotal = this.circumference - 1 * this.circumference;
        const gid = `url(#${this.props.id})`;
        const brightness = `${this.props.brightness}%`
        

        return (
            <svg height={radius * 2} width={radius * 2}>
                <defs>
                    <radialGradient id={this.props.id}>
                        <stop offset="25%" stopColor={ color } />
                        <stop offset={brightness} stopColor="#1f1f1f" />
                    </radialGradient>
                </defs>
                <circle
                    stroke={"#383838"}
                    fill={gid}
                    fillOpacity="0.4"
                    strokeWidth={stroke}
                    strokeDasharray={this.circumference + " " + this.circumference}
                    style={{ strokeTotal }}
                    r={this.normalizedRadius}
                    cx={radius}
                    cy={radius}
                    strokeLinecap="round"
                    shapeRendering="geometricPrecision"
                />
                <circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={this.circumference + " " + this.circumference}
                    style={{ strokeDashoffset }}
                    r={this.normalizedRadius}
                    cx={radius}
                    cy={radius}
                    strokeLinecap="round"
                    shapeRendering="geometricPrecision"
                />
                <g>
                    {centerIcon}
                </g>
            </svg>
        );
    }
}

export default ProgressRing;
