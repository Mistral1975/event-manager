import tokenService from "../services/tokenService.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Accesso negato, token mancante o non valido" });
  }

  const token = authHeader.split(" ")[1]; // Estraggo solo il token dopo "Bearer "

  try {
    req.user = tokenService.verifyToken(token);
    next(); // Passa al prossimo middleware o controller
  } catch (error) {
    res.status(401).json({ message: "Token non valido o scaduto" });
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
