const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const algorithm = 'aes-256-cbc';
const key = '2b7e151628aed2a6abf7158809cf4f3c';
const iv = '3ad77bb40d7a3660';
const inputEncoding = 'utf8';
const outputEncoding = 'base64';

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, inputEncoding, outputEncoding)
    encrypted += cipher.final(outputEncoding);
    return encrypted;
}

const decrypt = (encrypted) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    let dec = decipher.update(encrypted, outputEncoding, inputEncoding)
    dec += decipher.final(inputEncoding);
    return dec;
}

const getToken = (data) => {
    const token = jwt.sign(data, 'secret');
    return token
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'secret', (error, decord) => {
            if (error) reject(error)
            resolve(decord)
        });
    })
}

module.exports = {
    encrypt,
    decrypt,
    getToken,
    verifyToken
}