import React, { Component } from "react";
import "./App.css";
import ImageLoader from "../../components/image-loader/image-loader";
import Snackbar from "@material-ui/core/Snackbar";
import { Detector } from "react-detect-offline";

class App extends Component {
    state = {
        open: false,
        vertical: "bottom",
        horizontal: "center"
    };

    handleClick = state => () => {
        this.setState({ open: true, ...state });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { vertical, horizontal } = this.state;
        return (
            <div className="App grid-container">
                <ImageLoader />

                <Detector
                    render={({ online }) => (
                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={!online}
                            onClose={this.handleClose}
                            ContentProps={{
                                "aria-describedby": "message-id"
                            }}
                            message={<span id="message-id">No internet connection - Hint: It's kinda important</span>}
                        />
                    )}
                />
            </div>
        );
    }
}

export default App;
