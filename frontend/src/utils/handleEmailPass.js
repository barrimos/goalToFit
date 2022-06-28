const emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const regexEmail = (value) => {
    let RegexEmail = emailPattern.test(value);
    if(RegexEmail){
        return value;
    } else {
        return;
    }
}

const handleEmailPass = (e) => {
    if(e.target.name === 'email'){
        return regexEmail(e.target.value);
    }
    if(e.target.name === 'password'){
        return e.target.value;
    }
}

module.exports = { handleEmailPass }