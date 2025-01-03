const crypto = require("crypto");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;
const secretIV = process.env.SECRET_IV;
const encryptionMethod = process.env.ENCRYPTION_METHOD;

if (!secretKey || !secretIV || !encryptionMethod) {
  throw new Error("secretKey, secretIV, and encryptionMethod are required");
}

// Generate secret hash with crypto to use for encryption
const key = crypto
  .createHash("sha512")
  .update(secretKey)
  .digest("hex")
  .substring(0, 32);
const encryptionIV = crypto
  .createHash("sha512")
  .update(secretIV)
  .digest("hex")
  .substring(0, 16);

// Encrypt data
function encryptData(data) {
  const cipher = crypto.createCipheriv(encryptionMethod, key, encryptionIV);
  return Buffer.from(
    cipher.update(data, "utf8", "hex") + cipher.final("hex")
  ).toString("base64"); // Encrypts data and converts to hex and base64
}

// Decrypt data
function decryptData(encryptedData) {
  const buff = Buffer.from(encryptedData, "base64");
  const decipher = crypto.createDecipheriv(encryptionMethod, key, encryptionIV);
  return (
    decipher.update(buff.toString("hex"), "hex", "utf8") +
    decipher.final("utf8")
  ); // Decrypts data and converts to utf8
}

module.exports = { encryptData, decryptData };
