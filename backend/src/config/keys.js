// src/keys.js
import fs from "fs";
import path from "path";

// 🔹 Leggiamo le chiavi RSA dai file .pem
const privateKey = fs.readFileSync(path.resolve("keys/private.pem"), "utf8");
const publicKey = fs.readFileSync(path.resolve("keys/public.pem"), "utf8");

export { privateKey, publicKey };

/*import fs from "fs";
import path from "path";

// 🔹 Percorso assoluto ai file delle chiavi
const privateKeyPath = path.resolve("keys/private.pem");
const publicKeyPath = path.resolve("keys/public.pem");

// 🔹 Controlliamo se i file esistono prima di leggerli
if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
  throw new Error(
    "❌ ERROR: I file delle chiavi RSA non esistono in 'backend/keys/'. Generali con OpenSSL."
  );
}

// 🔹 Leggiamo le chiavi dai file .pem
export const privateKey = fs.readFileSync(privateKeyPath, "utf8");
export const publicKey = fs.readFileSync(publicKeyPath, "utf8");*/
