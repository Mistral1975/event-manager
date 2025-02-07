import mongoose from "mongoose";
import config from "./config.js";

// Connessione a MongoDB
const connectDb = async () => {
  try {
    await mongoose.connect(config.database.mongoUri);
    console.log("✅ Connesso a MongoDB");
  } catch (error) {
    console.error("❌ Errore connessione MongoDB:", error);
    process.exit(1); // Terminiamo il server se non può connettersi (se la connessione fallisce)
  }
};

export default connectDb;
