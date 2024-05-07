import crypto from "crypto";
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});
let d = "hello world!";
let data = Buffer.from(d);

//encrypy with private

const encryptedData = crypto.privateEncrypt(
  {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PADDING,
  },
  data
);

console.log("Encrypted Data:\n", encryptedData.toString("base64"));

// Decrypt with the public key
const decryptedData = crypto.publicDecrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PADDING,
  },
  encryptedData
);

console.log("Decrypted Message:\n", decryptedData.toString("utf-8"));

// encrypt with public
let sign2 = crypto.publicEncrypt(publicKey, data);
let verify = crypto.privateDecrypt(privateKey, sign2);
console.log(`Message : ${d}`);
console.log(`Encrypted message with public key : ${sign2}`);
console.log(`Is signature verified? ${verify !== null}`);
