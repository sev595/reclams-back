import * as crypto from "crypto";

export function encrypt(data: string, secretKey: string): string {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync(secretKey, "salt", 32);
  const iv = Buffer.alloc(16, 0); // Initialization vector

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedData = cipher.update(data, "utf8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}

export function decrypt(encryptedData: string, secretKey: string): string {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync(secretKey, "salt", 32);
  const iv = Buffer.alloc(16, 0); // Initialization vector

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedData = decipher.update(encryptedData, "hex", "utf8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}
