import request from "supertest";
import { expect } from "chai";
import app from "../../src/app.js"; // Importa l'app Express
import Event from "../../src/schema/eventSchema.js";
import User from "../../src/schema/userSchema.js";

/* describe("", () => {
  it("", async () => {
    expect();
  });
}); */

describe("Event Controller - Create Event", () => {
  /**
   * Prima di eseguire i test, creiamo un utente di test per simulare l'autenticazione. Questo utente sarà associato all'evento creato.
   */
  let userId;

  before(async () => {
    // Crea un utente di test per simulare l'autenticazione
    const user = await User.create({
      name: "Mario Rossi",
      email: "mario@example.com",
      password: "hashedpassword",
    });
    userId = user._id; // Salva l'ID utente per i test
  });

  /**
   *
   */

  // 1
  it("should create a new event - dovrebbe creare un nuovo evento", async () => {
    const eventData = {
      title: "Concerto di Jazz",
      description: "Un concerto jazz nel cuore della città.",
      date: "2023-12-25T20:00:00Z",
      location: "Piazza del Duomo, Milano",
      availableSeats: 100,
      price: 20,
    };

    // Simula una richiesta POST all'endpoint /api/events
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer fakeToken`) // Simula un token JWT
      .send(eventData);

    // Verifica che la risposta abbia status 201 (Created)
    expect(res.status).to.equal(201);

    // Verifica che la risposta contenga i dati dell'evento creato
    expect(res.body).to.have.property("title", eventData.title);
    expect(res.body).to.have.property("description", eventData.description);
    expect(res.body).to.have.property("date", eventData.date);
    expect(res.body).to.have.property("location", eventData.location);
    expect(res.body).to.have.property(
      "availableSeats",
      eventData.availableSeats
    );
    expect(res.body).to.have.property("price", eventData.price);

    // Verifica che l'evento sia stato salvato nel database
    const savedEvent = await Event.findOne({ title: eventData.title });
    expect(savedEvent).to.not.be.null;
    expect(savedEvent.createdBy.toString()).to.equal(userId.toString()); // Verifica l'ID utente
  });

  it("", async () => {
    const eventData = {
      title: "Concerto di Jazz",
      description: "Un concerto jazz nel cuore della città.",
      date: "2023-12-25T20:00:00Z",
      location: "Piazza del Duomo, Milano",
      availableSeats: 100,
      price: 20,
    };

    // Simula una richiesta POST all'endpoint /api/events
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", ``) // Simula una richiesta senza il token JWT
      .send(eventData);

    // Verifica che la risposta abbia status 401 (Unauthorized)
    expect(res.status).to.equal(401);
  });

  /*it("", async () => {});
  it("", async () => {});
  it("", async () => {});
  it("", async () => {});
  it("", async () => {});
  it("", async () => {});
  it("", async () => {});*/

  // 2.a
  it("should return 401 if no token is provided", async () => {
    const eventData = {
      title: "Concerto di Jazz",
      description: "Un concerto jazz nel cuore della città.",
      date: "2023-12-25T20:00:00Z",
      location: "Piazza del Duomo, Milano",
      availableSeats: 100,
      price: 20,
    };

    const res = await request(app).post("/api/events").send(eventData);

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property(
      "message",
      "Accesso negato, token mancante o non valido"
    );
  });

  // 2.b
  it("should return 401 if token is invalid", async () => {
    const eventData = {
      title: "Concerto di Jazz",
      description: "Un concerto jazz nel cuore della città.",
      date: "2023-12-25T20:00:00Z",
      location: "Piazza del Duomo, Milano",
      availableSeats: 100,
      price: 20,
    };

    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer invalidToken`)
      .send(eventData);

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property("message", "Token non valido o scaduto");
  });

  // 3.a
  it("should return 400 if required fields are missing", async () => {
    const eventData = {
      description: "Un concerto jazz nel cuore della città.",
      date: "2023-12-25T20:00:00Z",
      location: "Piazza del Duomo, Milano",
      availableSeats: 100,
      price: 20,
    };

    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer fakeToken`)
      .send(eventData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message");
  });

  // 3.b
  it("should return 400 if data is invalid", async () => {
    const eventData = {
      title: "Concerto di Jazz",
      description: "Un concerto jazz nel cuore della città.",
      date: "2023-12-25T20:00:00Z",
      location: "Piazza del Duomo, Milano",
      availableSeats: 100,
      price: "invalid", // Prezzo non valido
    };

    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer fakeToken`)
      .send(eventData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message");
  });

  // 4
  it("should return 400 if event with the same title already exists", async () => {
    const eventData = {
      title: "Concerto di Jazz",
      description: "Un concerto jazz nel cuore della città.",
      date: "2023-12-25T20:00:00Z",
      location: "Piazza del Duomo, Milano",
      availableSeats: 100,
      price: 20,
    };

    // Crea un evento con lo stesso titolo
    await Event.create({ ...eventData, createdBy: userId });

    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer fakeToken`)
      .send(eventData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property(
      "message",
      "Un evento con lo stesso titolo esiste già"
    );
  });

  // 5
  it("should return 500 if server error occurs", async () => {
    const eventData = {
      title: "Concerto di Jazz",
      description: "Un concerto jazz nel cuore della città.",
      date: "2023-12-25T20:00:00Z",
      location: "Piazza del Duomo, Milano",
      availableSeats: 100,
      price: 20,
    };

    // Simula un errore nel servizio
    sinon
      .stub(eventService, "createEvent")
      .throws(new Error("Errore interno del server"));

    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer fakeToken`)
      .send(eventData);

    expect(res.status).to.equal(500);
    expect(res.body).to.have.property("message", "Errore interno del server");

    // Ripristina lo stub
    eventService.createEvent.restore();
  });
});

/**
 * ESEMPIO DI STRUTTURA
 */

describe("POST /api/events - Creazione di un evento", () => {
  describe("Casi di successo", () => {
    it("dovrebbe creare un evento con dati validi", async () => {
      // Test per una richiesta valida
    });
  });

  describe("Casi di errore", () => {
    it("dovrebbe restituire 401 se il token non è fornito", async () => {
      // Test per autenticazione mancante
    });

    it("dovrebbe restituire 401 se il token non è valido", async () => {
      // Test per token non valido
    });

    it("dovrebbe restituire 400 se i dati sono mancanti", async () => {
      // Test per dati mancanti
    });

    it("dovrebbe restituire 400 se i dati non sono validi", async () => {
      // Test per dati non validi
    });

    it("dovrebbe restituire 400 se esiste già un evento con lo stesso titolo", async () => {
      // Test per unicità del titolo
    });

    it("dovrebbe restituire 500 in caso di errore interno del server", async () => {
      // Test per errore del server
    });
  });
});
