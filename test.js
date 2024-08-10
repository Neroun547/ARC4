const { encrypt, decode, byteArrayToString, stringToByteArray } = require("./rc4.module.js");


function testEncodeAndDecode() {
    const dataToHash = "data_to_hash";
    const key = "SECRET_KEY";

    const cipher = encrypt(stringToByteArray(key), stringToByteArray(dataToHash));
    const decodedData = decode(stringToByteArray(key), cipher);

    if(byteArrayToString(decodedData) === dataToHash) {
        console.log("SUCCESS");
    } else {
        console.log("Failed");
    }
}

testEncodeAndDecode();
