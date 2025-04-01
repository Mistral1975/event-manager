// src/services/bookingService.js
import bookingRepository from "../repository/bookingRepository.js";
import eventRepository from "../repository/eventRepository.js";
import DomainException from "../exceptions/DomainExceptions.js";

/**
 * 🔹 Crea una nuova prenotazione
 */
const createBooking = async (bookingData, userId) => {
  // Verifica se l'evento esiste
  const event = await eventRepository.findEventById(bookingData.eventId);

  if (!event) {
    throw new DomainException("Evento non trovato", 404);
  }

  // Verifica la disponibilità dei posti
  if (event.availableSeats < bookingData.seatsBooked) {
    throw new DomainException("Posti insufficienti", 400);
  }

  // Aggiorna i posti disponibili PRIMA di creare la prenotazione
  const updatedSeats = event.availableSeats - bookingData.seatsBooked;

  await eventRepository.updateEvent(event._id, {
    availableSeats: updatedSeats,
  });

  // Crea la prenotazione
  const newBooking = await bookingRepository.createBooking(userId, bookingData);

  return newBooking;
};

/**
 * 🔹 Ottiene una prenotazione per ID (solo se appartiene all'utente)
 */
const getBookingById = async (userId, bookingId) => {
  const booking = await bookingRepository.findBookingById(userId, bookingId);
  if (!booking) {
    throw new DomainException(
      "Prenotazione non trovata o non autorizzata",
      404
    );
  }
  return booking;
};

/**
 * 🔹 Ottiene tutte le prenotazioni di un utente
 */
const getBookingsByUser = async (userId) => {
  if (!userId) {
    throw new DomainException("ID utente non valido", 400);
  }

  return await bookingRepository.findBookingsByUser(userId);
};

/**
 * 🔹 Cancella una prenotazione (e libera i posti)
 */
const cancelBooking = async (userId, bookingId) => {
  const booking = await bookingRepository.cancelBooking(userId, bookingId);
  if (!booking) {
    throw new DomainException(
      "Prenotazione non trovata o non autorizzata",
      404
    );
  }

  // Se la prenotazione è già cancellata, non modificare i posti disponibili
  if (booking.status === "cancelled") {
    return booking; // Restituisce direttamente la prenotazione senza aggiornare i posti
    /*throw new DomainException(
      "La prenotazione è già stata cancellata",
      400 // Codice 400 per segnalare una richiesta non valida
    );*/
  }

  // Ripristina i posti disponibili
  const event = await eventRepository.findEventById(booking.eventId);
  if (event) {
    //event.availableSeats += booking.seats;

    const updatedSeats = event.availableSeats + booking.seatsBooked;

    await eventRepository.updateEvent(event._id, {
      //availableSeats: event.availableSeats,
      availableSeats: updatedSeats,
    });
  }

  return booking;
};

export default {
  createBooking,
  getBookingById,
  getBookingsByUser,
  cancelBooking,
};
