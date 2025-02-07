import bcrypt from "bcryptjs";
import cryptoRandomString from "crypto-random-string";

class CryptoUtils {
  // Genera una stringa casuale sicura (es. per token di conferma email)
  generateUniqueCode(length = 32, type = "alphanumeric") {
    return cryptoRandomString({ length, type });
  }

  // Crittografa la password con bcrypt
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return { password: hashedPassword };
  }

  // Verifica se una password è corretta confrontando una password con l'hash salvato
  async comparePassword(value, hashedValue) {
    return await bcrypt.compare(value, hashedValue); // bcrypt gestisce il confronto automaticamente
  }

  // Genera un codice sicuro URL-encoded
  /*generateUrlEncodedCode(length) {
    const code = this.generateUniqueCode(length);
    return encodeURIComponent(code);
  }*/
}

// Esportiamo un'istanza della classe
export default new CryptoUtils();
