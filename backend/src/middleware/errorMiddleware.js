// src/middleware/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    return res.status(400).json({
      type: err.type,
      message: err.error.toString(),
    });
  }

  // Gestisci altri tipi di errori
  res.status(err.statusCode || 500).json({
    message: err.message || "Errore interno del server",
  });
};

export default errorMiddleware;
