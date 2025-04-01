// test/controllers/event.test.js
import { expect } from "chai";
import sinon from "sinon";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../../src/app.js"; // Importa l'app Express
import Event from "../../src/schema/eventSchema.js"; // Importa il modello Event
import User from "../../src/schema/userSchema.js"; // Importa il modello User
import tokenService from "../../src/services/tokenService.js"; // Importa il servizio per i token
import eventService from "../../src/services/eventService.js"; // Importa il servizio per gli eventi

describe("POST /api/events - Creazione di un evento", () => {
  let userId, fakeToken, mongoServer;

  // Dati di test riutilizzabili
  const validEventData = {
    title: "Concerto di Jazz",
    description: "Un concerto jazz nel cuore della città.",
    date: "2023-12-25T20:00:000Z",
    location: "Piazza del Duomo, Milano",
    availableSeats: 100,
    price: 20,
  };

  // Avvia un'istanza in memoria di MongoDB prima di tutti i test
  before(async () => {
    // Avvia un'istanza in memoria di MongoDB
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Connetti Mongoose al database in memoria
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Ferma l'istanza in memoria di MongoDB dopo tutti i test
  after(async () => {
    // Disconnetti Mongoose e ferma il server in memoria
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  /**
   * Differenza tra Setup e Teardown
   * Setup: Operazioni eseguite prima dei test per preparare l'ambiente (ad esempio, creare dati fittizi, configurare mock).
   * Teardown: Operazioni eseguite dopo i test per ripristinare l'ambiente (ad esempio, eliminare dati fittizi, ripristinare mock).
   */

  // Setup: eseguito prima di ogni test
  beforeEach(async () => {
    // Crea un utente fittizio (rispettando lo schema) per simulare l'autenticazione
    const user = await User.create({
      name: "Mario Rossi",
      email: "mario@example.com",
      password: "hashedpassword",
    });

    // Salva l'ID utente per i test e genera un token fittizio usando generateTokens
    userId = user._id;
    const { accessToken } = await tokenService.generateTokens(user);
    fakeToken = accessToken;
  });

  // Teardown: eseguito dopo ogni test
  afterEach(async () => {
    // Pulisci il database
    await User.deleteMany({});
    await Event.deleteMany({});

    // Ripristina eventuali stub di Sinon
    sinon.restore();
  });

  describe("Casi di successo", () => {
    it("dovrebbe creare un evento con dati validi", async () => {
      const res = await request(app)
        .post("/api/events")
        .set("Authorization", `Bearer ${fakeToken}`)
        .send(validEventData);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("title", validEventData.title);
      expect(res.body).to.have.property(
        "description",
        validEventData.description
      );
      expect(res.body).to.have.property("date", validEventData.date);
      expect(res.body).to.have.property("location", validEventData.location);
      expect(res.body).to.have.property(
        "availableSeats",
        validEventData.availableSeats
      );
      expect(res.body).to.have.property("price", validEventData.price);

      // Verifica che l'evento sia stato salvato nel database
      const savedEvent = await Event.findOne({ title: validEventData.title });
      expect(savedEvent).to.not.be.null;
      expect(savedEvent.createdBy.toString()).to.equal(userId.toString());
    });
  });

  describe("Casi di errore", () => {
    it("dovrebbe restituire 401 se il token non è fornito", async () => {
      const res = await request(app).post("/api/events").send(validEventData);

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property(
        "message",
        "Accesso negato, token mancante o non valido"
      );
    });

    it("dovrebbe restituire 401 se il token non è valido", async () => {
      const res = await request(app)
        .post("/api/events")
        .set("Authorization", `Bearer invalidToken`)
        .send(validEventData);

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property(
        "message",
        "Token non valido o scaduto"
      );
    });

    it("dovrebbe restituire 400 se i dati sono mancanti", async () => {
      const invalidEventData = { ...validEventData };
      delete invalidEventData.title; // Rimuovi il campo obbligatorio "title"

      const res = await request(app)
        .post("/api/events")
        .set("Authorization", `Bearer ${fakeToken}`)
        .send(invalidEventData);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message");
    });

    it("dovrebbe restituire 400 se i dati non sono validi", async () => {
      const invalidEventData = { ...validEventData, price: "invalid" }; // Prezzo non valido

      const res = await request(app)
        .post("/api/events")
        .set("Authorization", `Bearer ${fakeToken}`)
        .send(invalidEventData);

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("message");
    });

    it("dovrebbe restituire 500 in caso di errore interno del server", async () => {
      // Simula un errore nel servizio
      sinon
        .stub(eventService, "createEvent")
        .throws(new Error("Errore interno del server"));

      const res = await request(app)
        .post("/api/events")
        .set("Authorization", `Bearer ${fakeToken}`)
        .send(validEventData);

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property("message", "Errore interno del server");

      // Ripristina lo stub
      eventService.createEvent.restore();
    });
  });
});
