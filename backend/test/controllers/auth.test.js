// test/controllers/auth.test.js
/*import request from "supertest";
import { expect } from "chai";
import app from "../../src/app.js"; // Importa l'app Express
import User from "../../src/schema/userSchema.js";

describe("Test Auth Routes", () => {
  // accetta 2 parametri: il primo paramentro è una stringa, il secondo è una funzione
  it("dovrebbe registrare un nuovo utente", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Mario Rossi",
      email: "mario@example.com",
      password: "password123",
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message");
  });

  it("dovrebbe effettuare l'accesso come utente esistente", async () => {
    // Crea un utente di test
    await User.create({
      name: "Mario Rossi",
      email: "mario@example.com",
      password: "hashedpassword", // Usa bcrypt per hashare la password
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "mario@example.com",
      password: "password123",
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("tokens");
  });
});*/
