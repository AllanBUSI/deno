module.exports = {
    emailFormat: (email) => {
        return (
            email === undefined ||
            email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null
        ) ? false : (email.length > 10) ? true : false;
    },
    passwordFormat: (password) => {
        return (
            password === undefined ||
            password.match(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/) == null
        ) ? false : (password.length >= 6) ? true : false;
    }
};