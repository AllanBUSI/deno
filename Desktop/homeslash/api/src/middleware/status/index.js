module.exports = {
    sendReturn: async(res, status = 500, data = { error: true, message: "Processing error" }) => {
        try {
            res.status(status).json(data);
        } catch (error) {
            let sendError = { error: true, message: "Processing error" };
            console.log(sendError);
        }
    }
};