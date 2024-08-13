const crypto = require('crypto');
const {encryptInHex, decodeFromHexToString} = require("./rc4.module");

function testEncodeAndDecode() {
    const dataToHash = "data_to_hash_123";
    const key = "SECRET_KEY";

    const cipher = encryptInHex(key, dataToHash);
    const decodedData = decodeFromHexToString(key, cipher);

    const hashFromCrypto = getRC4HexStringFromCrypto(key, dataToHash);

    if(decodedData === dataToHash && cipher === hashFromCrypto) {
        console.log("SUCCESS");
        console.log("--------")
        console.log("My module: " + cipher);
        console.log("Hash from Node.js crypto: " + hashFromCrypto)
    } else {
        console.log("Failed");
    }
}
testEncodeAndDecode();

function getRC4HexStringFromCrypto(key, data) {
    const cipher = crypto.createCipheriv('rc4', key ,'');
    const ciphertext = cipher.update(data, 'utf8');

    return ciphertext.toString("hex");
}

