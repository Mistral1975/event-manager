import jwt from "jsonwebtoken";
//import { privateKey, publicKey } from "../../config.js";
import config from "../config/config.js";
import UnauthorizedException from "../exceptions/UnauthorizedException.js";

// Genera un JWT firmato con chiave privata RSA
const generateToken = (user, expiresIn) => {
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
const generateTokens = (user) => {
  return {
    //accessToken: generateToken(user, "1h"), // 1 ora
    //refreshToken: generateToken(user, "7d"), // 7 giorni
    accessToken: generateToken(user, config.auth.jwtExpiration), // 1h (definito in config.js)
    refreshToken: generateToken(user, config.auth.refreshTokenExpiration), // 7d (definito in config.js)
  };
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

// Funzione per generare un nuovo Access Token usando il Refresh Token
const refreshAccessToken = (refreshToken) => {
  try {
    const decoded = verifyToken(refreshToken);
    return generateToken(
      { email: decoded.email, _id: decoded.subject },
      config.auth.jwtExpiration
    );
  } catch (error) {
    throw new UnauthorizedException("Refresh Token non valido o scaduto");
  }
};

export default { generateTokens, verifyToken, refreshAccessToken };
