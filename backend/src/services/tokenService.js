// src/services/tokenService.js
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import UnauthorizedException from "../exceptions/UnauthorizedException.js";
import userRepository from "../repository/userRepository.js";

// Genera un JWT firmato con chiave privata RSA
const generateToken = (user, expiresIn) => {
  //console.log("🔹 User prima della generazione del token:", user);

  return jwt.sign(
    {
      email: user.email,
      subject: user._id,
      expiration: expiresIn,
    },
    config.security.privateKey, // Usiamo la chiave da config.js
    {
      expiresIn,
      algorithm: "RS256",
    }
  );
};

// Genera Access Token e Refresh Token
const generateTokens = async (user) => {
  const accessToken = generateToken(user, config.auth.jwtExpiration); // 1h (definito in config.js)
  const refreshToken = generateToken(user, config.auth.refreshTokenExpiration); // 7d (definito in config.js)

  // Sostituiamo i vecchi token con il nuovo
  await userRepository.setRefreshToken(user._id, refreshToken);

  return { accessToken, refreshToken };
};

// Verifica un token JWT con chiave pubblica RSA
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.security.publicKey, {
      algorithms: ["RS256"],
    });
  } catch (error) {
    throw new UnauthorizedException(error.message);
  }
};

// Verifica il refresh token e genera un nuovo access token
const refreshAccessToken = async (refreshToken) => {
  try {
    //console.log("🔹 Token ricevuto per refresh:", refreshToken); // 🔥 Debug

    let decoded; // 🔹 Dichiarato fuori dal blocco try per renderlo accessibile

    // 🔹 Controlliamo se il token è ancora valido
    try {
      decoded = jwt.verify(refreshToken, config.security.publicKey, {
        algorithms: ["RS256"],
      });

      //console.log("🔹 Token decodificato:", JSON.stringify(decoded, null, 2)); // 🔥 Debug
    } catch (error) {
      //console.error("❌ Errore nella verifica del token:", error); // 🔥 Debug
      throw new UnauthorizedException("Refresh token non valido");
    }

    if (!decoded) {
      //console.error("❌ ERRORE: decoded è undefined!"); // 🔥 Debug
      throw new UnauthorizedException("Refresh token non valido");
    }

    if (!decoded.subject) {
      //console.error("❌ ERRORE: decoded.subject è undefined!"); // 🔥 Debug
      throw new UnauthorizedException("Refresh token non valido");
    }

    const user = await userRepository.findUserById(decoded.subject);
    //console.log("🔹 Utente trovato:", user); // 🔥 Debug

    //console.log("🔹 Refresh Tokens in DB:", user.refreshTokens);

    if (
      !user ||
      !Array.isArray(user.refreshTokens) ||
      !user.refreshTokens.includes(refreshToken)
    ) {
      console.log(
        "❌ Il refresh token non è valido o non è presente nel database!"
      );
      throw new UnauthorizedException("Refresh token non valido");
    }

    return generateToken(user, config.auth.jwtExpiration);
  } catch (error) {
    console.error("❌ Errore nel refresh token:", error); // 🔥 Debug
    throw new UnauthorizedException("Refresh token scaduto o non valido");
  }
};

// Revoca un singolo refresh token (usato per logout singolo dispositivo)
const revokeRefreshToken = async (userId, refreshToken) => {
  return await userRepository.removeRefreshToken(userId, refreshToken);
};

// Elimina tutti i refresh token di un utente (usato per logout globale)
const clearRefreshTokens = async (userId) => {
  return await userRepository.setRefreshToken(userId, []);
};

export default {
  generateTokens,
  verifyToken,
  refreshAccessToken,
  revokeRefreshToken,
  clearRefreshTokens,
};
