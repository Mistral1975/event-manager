// src/repository/bookingRepository.js
import Booking from "../schema/bookingSchema.js";

/**
 * createBooking(userId, bookingData) → Crea una nuova prenotazione.
 * findBookingById(bookingId) → Trova una prenotazione tramite ID.
 * findBookingsByUser(userId) → Trova tutte le prenotazioni di un utente.
 * findBookingsByEvent(eventId) → Trova tutte le prenotazioni di un evento.
 * cancelBooking(bookingId) → Cancella una prenotazione.
 */

/**
 * 🔹 Crea una nuova prenotazione, assicurando che sia legata all'utente corretto
 * @param {string} userId - ID dell'utente che effettua la prenotazione
 * @param {Object} bookingData - Dati della prenotazione
 * @returns {Promise<Booking>} - Ritorna la prenotazione creata
 */
const createBooking = async (userId, bookingData) => {
  // versione più esplicita, utile se vogliamo fare ulteriori elaborazioni prima di salvare
  /*const booking = new Booking({ ...bookingData, userId });  
  return await booking.save();*/

  //  versione più compatta e chiara.
  return await Booking.create({ ...bookingData, userId });
};

/**
 * 🔹 Trova una prenotazione per ID, verificando che appartenga all'utente
 * @param {string} userId - ID dell'utente autenticato
 * @param {string} bookingId - ID della prenotazione
 * @returns {Promise<Booking|null>} - Ritorna la prenotazione o null se non trovata
 */
const findBookingById = async (userId, bookingId) => {
  return await Booking.findOne({ _id: bookingId, userId });
};

/**
 * 🔹 Trova tutte le prenotazioni di un utente specifico
 * @param {string} userId - ID dell'utente autenticato
 * @returns {Promise<Booking[]>} - Ritorna un array di prenotazioni
 */
const findBookingsByUser = async (userId) => {
  //return await Booking.find({ userId });
  return await Booking.find({ userId })
    .populate(
      // con .populate recuperiamo più dettagli sull'evento (titolo, data e luogo), così il client ottiene informazioni più utili.
      "eventId",
      "title date location"
    )
    .populate("userId", "name email");
};

/**
 * 🔹 Cancella una prenotazione (modifica lo stato a "cancelled"), verificando che appartenga all'utente
 * @param {string} userId - ID dell'utente autenticato
 * @param {string} bookingId - ID della prenotazione
 * @returns {Promise<Booking|null>} - Ritorna la prenotazione aggiornata o null se non trovata
 */
const cancelBooking = async (userId, bookingId) => {
  return await Booking.findOneAndUpdate(
    { _id: bookingId, userId }, // Assicura che solo il proprietario possa cancellare
    { status: "cancelled" },
    { new: true } // Opzione che fa sì che la funzione restituisca il documento aggiornato anziché il documento originale.
  );
};

export default {
  createBooking,
  findBookingById,
  findBookingsByUser,
  //findBookingsByEvent,
  cancelBooking,
};
