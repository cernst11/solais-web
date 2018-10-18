import React, { Component } from "react";
import "./image-loader.css";
import Dropzone from "react-dropzone";
import * as Vibrant from "node-vibrant";
import Lights from "../Lights/Lights";
import Token from "../ Token/Token";
import GradientDisplay from "../GradientDisplay/GradientDisplay";

class ImageLoader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
            files: [],
            palettes: [],
            colors: [],
            token: localStorage.getItem("token"),
            lights: []
        };
        this.onDrop = this.onDrop.bind(this);
        this.getPalette = this.getPalette.bind(this);
        this.displayColors = this.displayColors.bind(this);
        this.getColorList = this.getColorList.bind(this);
    }

    async onDrop(files) {
        this.setState({
            files
        });

        let palettes = await this.getPalette(files[0].preview);

        Object.entries(palettes).forEach(([key]) => {
            if (palettes[key] === null || palettes[key] === undefined) {
                delete palettes[key];
            }
        });

        this.getColorList(palettes);

        this.setState({
            palettes
        });
    }

    async getPalette(image) {
        return Vibrant.from(image).getPalette();
    }

    displayColors(colors) {
        return colors.map(color => (
            <p style={{ backgroundColor: color }}>
                <span> {color} </span>
            </p>
        ));
    }

    getColorList(palettes) {
        let colors = Object.keys(palettes).map(key => {
            return palettes[key].getHex();
        });

        this.setState({
            colors
        });
    }

    showLights() {
        if (this.state.token !== null || this.state.token !== "") {
            return <Lights colors={this.state.colors} onLightChange={this.onLightsChange} token={this.state.token} />;
        }
    }

    onTokenChange = token => {
        this.setState({ token: token });
    };

    onLightsChange = lights => {
        this.setState({ lights: lights });
    };

    blobToUrl = blob => {};

    render() {
        const { files } = this.state;
        const text = files.length ? { display: "none" } : { display: "" };
        const style = files.length
            ? {
                  backgroundImage: `url(${files[0].preview}) `,
                  backgroundRepeat: "no-repeat",
                  backgroundAttachment: "fixed",
                  backgroundPosition: "center",
                  backgroundSize: "contain"
              }
            : {};

        const dropMessage = (
            <div className="drop-zone-text">
                <p style={text}>
                    Click or Drop to load your{" "}
                    <span role="img" aria-label="lit">
                        🔥
                    </span>{" "}
                    image here
                </p>
            </div>
        );

        return (
            <>
                <div className="Lights">
                    {this.showLights()}
                    <Token token={this.state.token} onTokenChange={this.onTokenChange} />
                </div>

                <div className="Main" style={style}>
                    <div className="preview-container ">
                        <div className="image-loader">
                            <Dropzone
                                className="drop-zone"
                                accept=".jpeg,.png,.jpg,.tiff,.dng"
                                multiple={false}
                                onDrop={this.onDrop}
                            />
                            {dropMessage}
                        </div>
                    </div>
                </div>
                <div className="GradientDisplay">
                    <GradientDisplay lights={this.state.lights} />
                </div>
            </>
        );
    }
}

export default ImageLoader;
