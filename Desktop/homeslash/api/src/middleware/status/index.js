module.exports = {
    sendReturn: async(res, status = 500, data = { error: true, message: "Processing error" }) => {
        try {
            console.log(data);
            res.status(status).json(data);
        } catch (error) {
            let sendError = { error: true, message: "Processing error" };
            console.log(sendError);
        }
    },
    result: (results, data, data2) => {
        if (results != []) {
            data,
            data2;
        }
        else {
            this.sendReturn(400, { error: true, message: "une erreur est en cours" });
        }
    }
};