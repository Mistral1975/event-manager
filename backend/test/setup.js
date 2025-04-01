import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer;

// Avvia un'istanza di MongoDB in memoria prima di eseguire i test
before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Pulisci il database dopo ogni test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Ferma l'istanza di MongoDB in memoria dopo aver eseguito i test
after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
