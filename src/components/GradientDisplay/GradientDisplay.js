import React, { Component } from "react";
import ColorHelper from "../../libs/ColorHelper";
import "./GradientDisplay.css"

class GradientDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: window.innerHeight,
            width: window.innerWidth
        };
    }
    async componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.updateCanvas();
    }


    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
      }
    updateDimensions = () => {
        this.updateCanvas();
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        }, function up (){
            this.updateCanvas();

        });
    };


    updateCanvas = () => {
        const {lights} = this.props;
        if (lights !== undefined && lights.length) {

            const canvas = this.refs.canvas;
            const cHeight = canvas.height;
            const cWidth = canvas.width;

            const spacing = cWidth / (lights.length + 1);
            const ctx = this.refs.canvas.getContext("2d");
            ctx.clearRect(0, 0, cWidth, cHeight);
            let colors = [];
            ctx.lineWidth = 3;
            ctx.lineJoin = "round";
            ctx.strokeStyle = "#1f1f1f";

            ctx.beginPath();
            ctx.moveTo(0, cHeight);
            lights.forEach((point, i) => {
                colors[i] = ColorHelper.HSVtoHEX(point.color.hue / 360, point.color.saturation, point.brightness) + '99';
                if (i === 0) {
                    ctx.bezierCurveTo(
                        spacing / 2,
                        cHeight,
                        spacing / 2,
                        cHeight - point.brightness * cHeight,
                        spacing,
                        cHeight - point.brightness * cHeight
                    );
                } else {
                    ctx.bezierCurveTo(
                        spacing / 2 + i * spacing,
                        cHeight - lights[i - 1].brightness * cHeight,
                        spacing / 2 + i * spacing,
                        cHeight - point.brightness * cHeight,
                        spacing + i * spacing,
                        cHeight - point.brightness * cHeight
                    );
                }
            });
            const ll = lights.length;
            ctx.bezierCurveTo(
                spacing / 2 + ll * spacing,
                cHeight - lights[ll - 1].brightness * cHeight,
                spacing / 2 + ll * spacing,
                cHeight - lights[ll - 1].brightness * cHeight,
                spacing + ll * spacing,
                cHeight
            );

            ctx.lineTo(cWidth, cHeight);

            let grd = ctx.createLinearGradient(0, 0, cWidth, 0);
            const step = 1 / (lights.length-1);
            colors.forEach((color, i) => {
                grd.addColorStop(step * i, color);
            });
            ctx.fillStyle = grd;

            ctx.fill();
            ctx.stroke();
        }
    };

    render() {
        this.updateCanvas();
        const height = `${this.state.height / 4}px`;
        const width = `${this.state.width * 0.9}px`;
        return (
            <div className="Gradient">
                
                <canvas height={height} width={width} ref="canvas" />
                
            </div>
        );
    }
}

export default GradientDisplay;
