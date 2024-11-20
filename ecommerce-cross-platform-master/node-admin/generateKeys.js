const crypto = require("crypto");

const secretKey = crypto.randomBytes(32).toString("hex");
const secretIV = crypto.randomBytes(16).toString("hex");
const encryptionMethod = "aes-256-cbc"; // Ví dụ về phương pháp mã hóa

console.log("SECRET_KEY:", secretKey);
console.log("SECRET_IV:", secretIV);
console.log("ENCRYPTION_METHOD:", encryptionMethod);
