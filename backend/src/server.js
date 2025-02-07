import app from "./app.js";
import config from "./config/config.js";
import connectDb from "./config/database.js";

// Connessione al database MongoDB e avvio del server
connectDb().then(() => {
  app.listen(config.app.port, () => {
    console.log(`🚀 Server avviato sulla porta ${config.app.port}`);
  });
});
