export default new class Lifx {
    getLights = async token => {
        let response = await fetch("https://api.lifx.com/v1/lights/all", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    };

    toggleLight = async (token, id) => {
        try {
            let response = await fetch(`https://api.lifx.com/v1/lights/${id}/toggle`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST"
            });
            return response;
            //await this.setLights();
        } catch (e) {}
    };

    setStates = async (token, body) => {
        if (body != null || body !== undefined) {
            try {
                let response = await fetch(`https://api.lifx.com/v1/lights/states`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify(body)
                });
                return response;
            } catch (e) {}
        }
    };
}();
