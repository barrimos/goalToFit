const salty = (amount = 8) => {
    const letters = 'aAbB2c_3C45d7@#D8e6Ef_9F8?4!g2Gh<Hi-IjJkK_LMlNm>OnPopqQr_RsStuT%$v<>wUxy$Vz0W1-X2?Y345Z!$&6789';
    const lettersLen = letters.length;
    let salt = '';
    for(let i = 0; i < amount; i++){
        salt += letters[Math.floor(Math.random() * (lettersLen - 1))];
    }
    return salt;
}

const reverse = (val) => {
    return;
}

const convertToBase = (val, base = 16) => {
    return;
}

const bitwise = (val) => {
    return;
}

const encrypt = (val, amount = 10) => {
    return val;
}

module.exports = { salty, reverse, convertToBase, bitwise, encrypt };