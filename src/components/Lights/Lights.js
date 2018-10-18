import React, { Component } from "react";
import Light from "../Light/Light";
import "./Lights.css";
import Lifx from "../../libs/Lifx";
import ColorHelper from "../../libs/ColorHelper"

class Lights extends Component {
    constructor(props) {
        super(props);
        this.state = { lights: [] };

        this.getToken();
        this.createLightList = this.createLightList.bind(this);
        this.lightStateBuilder = this.lightStateBuilder.bind(this);
        this.toggleLight = this.toggleLight.bind(this);
        this.setLightState = this.setLightState.bind(this);
    }

    getToken() {
        this.token = localStorage.getItem("token");
    }

    async toggleLight(id) {
        try {
            let resp = await Lifx.toggleLight(this.props.token, id);
            await resp.json();
            await this.setLightState();
        } catch (e) {}
    }

    async componentDidMount() {
        this.setLightState();
    }

    async setLightState() {
        let res = await Lifx.getLights(this.props.token);
        let lights = await res.json();
        this.setState({
            lights: lights
        });

        this.props.onLightChange(lights);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.token !== prevProps.token) {
            await this.setLightState();
            this.createLightList();
        }
        if (this.props.colors !== prevProps.colors) {
            let requestBody = this.lightStateBuilder(this.state.lights, this.props.colors);

            try{
                await Lifx.setStates(this.props.token, requestBody);
                await this.setLightState();
                this.createLightList();
            }catch(e){

            }
        }
    }

    createLightList() {
        if (this.state.lights.length > 1) {
            return this.state.lights.map((light, i) => (
                <Light
                    key={light.id}
                    brightness={light.brightness * 100}
                    color={ColorHelper.HSVtoHEX(light.color.hue / 360, light.color.saturation, light.brightness)}
                    label={light.label}
                    id={light.id}
                    power={light.power}
                    onClick={e => this.toggleLight(light.id, e)}
                />
            ));
        } else {
            return (
                <p className="light-connection-error">
                    Unable to connnect to lights. Did you use the + in the corner to add your LIFX API token?
                </p>
            );
        }
    }

    lightStateBuilder(lights, colors) {
        let num_of_colors = colors.length;

        if (colors !== undefined) {
            let states = lights.map((light, index) => {
                let mut_index = index;
                //if we run out of colors lets pick a random one
                if (index > num_of_colors - 1) {
                    mut_index = this.getRandomInt(num_of_colors - 1);
                }
                //add a new prop to lights to see the color when the lioght is rendered
                const color = colors[mut_index];
                lights[index].rgbColor = color;
                return {
                    selector: light.id,
                    color
                };
            });

            return {
                states,
                defaults: {
                    duration: 1.0,
                    power: "on"
                }
            };
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    render() {
        return <div className="lights">{this.createLightList()}</div>;
    }
}

export default Lights;
