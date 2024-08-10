function encrypt(key, data) {
    const keyArray = [];
    let x = 0;
    let y = 0;

    initKey();
    // Ініціалізація ключу
    function initKey() {
        const keyLength = key.length;

        for(let i = 0; i < 256; i++) {
            keyArray.push(i);
        }
        let j = 0;

        for(let i = 0; i < 256; i++) {
            j = (j + keyArray[i] + key[i % keyLength]) % 256;

            swap(keyArray, i, j);
        }
    }
    // Міняємо місцями елементи в масиві байтів
    function swap(array, index1, index2) {
        let tmp = array[index1];

        array[index1] = array[index2];
        array[index2] = tmp;
    }

    /* Беремо елемент з масиву ключу:
        1. Беремо два індикси
        2. Складаємо елементи за цими індексами отримане число і є індексом елементу в масиві ключу
     */

    function getKeyItem() {
        x = (x + 1) % 256;
        y = (y + keyArray[x]) % 256;

        swap(keyArray, x, y);

        return keyArray[(keyArray[x] + keyArray[y]) % 256];
    }

    const cipher = [];
    // Шифр формується за допомогою XOR операцію на кожному кроці
    for(let i = 0; i < data.length; i++) {
        cipher[i] = data[i] ^ getKeyItem();
    }
    return cipher;
}

function decode(key, data) {
    return encrypt(key, data);
}

function stringToByteArray(string) {
    return new TextEncoder().encode(string);
}

function byteArrayToString(byteArray) {
    return String.fromCharCode(...byteArray);
}

module.exports = { encrypt, decode, stringToByteArray, byteArrayToString };



