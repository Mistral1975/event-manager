import cryptoUtils from "../utils/cryptoUtils.js";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Accesso negato" });

  try {
    req.user = cryptoUtils.verifyJwt(token);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token non valido" });
  }
};

export default authMiddleware;

/*
import ForbiddenException from "../exceptions/ForbiddenException.js";

const checkAdminRole = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        throw new ForbiddenException("Non hai i permessi per accedere a questa risorsa");
    }
    next();
};

export default checkAdminRole;
*/
