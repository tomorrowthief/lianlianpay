const crypto = require('crypto')
const fs = require('fs')
const path = require("path")


const privateKey = fs.readFileSync(path.join(__dirname, '/rsa_private.key'), "ascii")
const publicKey = fs.readFileSync(path.join(__dirname, '/rsa_private.key'), "ascii")


// 创建 加签，验签方法
const sign = (param='hello') => crypto.createSign('md5WithRSAEncryption').update(param).sign(privateKey, 'base64');
const verify = (param='hello', sign) => crypto.createVerify('md5WithRSAEncryption').update(param).verify(publicKey, sign, 'base64')

module.exports.sign = sign
module.exports.verify = verify

