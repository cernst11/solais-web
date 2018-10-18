import React, { Component } from "react";
import "./Token.css";
import { MdAdd } from "react-icons/md";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { withStyles } from "@material-ui/core/styles";

import Modal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        zIndex: 200,
        width: "300px"
    }
};

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 2,
        position: "fixed",
        right: '5px',
        bottom: '0px',
        zIndex: '100'
    },
    absolute: {
        position: "absolute",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3
    }
});

class Token extends Component {
    constructor(props) {
        super(props);
        this.writeToken = this.writeToken.bind(this);
        this.state = {
            tokenValue: this.props.token,
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    writeToken() {
        localStorage.setItem("token", this.state.tokenValue);
    }

    updatetokenValue(evt) {
        this.setState({
            tokenValue: evt.target.value
        });
    }

    componentDidMount() {
        if (this.state.tokenValue === undefined || this.state.tokenValue === "") {
            this.setState({
                modalIsOpen: true
            });
        }
    }

    handleToken = token => {
        this.setState({ token: token });
    };

    handleToken = () => {
        localStorage.setItem("token", this.state.tokenValue);
        const token = this.state.tokenValue;
        this.props.onTokenChange(token);
    };

    render() {
        const { classes } = this.props;
        return (
            <>
                <Button className={classes.fab} variant="fab" color="primary" aria-label="Add" onClick={this.openModal}>
                    <MdAdd />
                </Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Token Entry"
                    ariaHideApp={false}
                >
                    <h2 className="modal-header" ref={subtitle => (this.subtitle = subtitle)}>
                        Enter your Lifx Token
                    </h2>

                    <div className="modal-input">
                        <Input
                            value={this.state.tokenValue}
                            onChange={evt => this.updatetokenValue(evt)}
                            placeholder="Token"
                            ariaHideApp={false}
                        />
                        <Button onClick={this.handleToken} variant="contained" color="primary">
                            Save Token
                        </Button>
                    </div>
                </Modal>
            </>
        );
    }
}

export default withStyles(styles)(Token);
