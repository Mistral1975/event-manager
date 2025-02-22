import eventRepository from "../repository/eventRepository.js";
import DomainException from "../exceptions/DomainExceptions.js";
import UnauthorizedException from "../exceptions/UnauthorizedException.js";

/**
 * 🔹 Crea un nuovo evento
 * @param {Object} eventData - Dati dell'evento
 * @returns {Promise<Object>} - Evento creato
 */
const createEvent = async (eventData, userId) => {
  if (!userId) {
    throw new UnauthorizedException("Utente non autenticato");
  }

  const newEvent = await eventRepository.createEvent({
    ...eventData,
    createdBy: userId, // Assegna l'ID dell'utente autenticato
  });

  return newEvent;
};

/**
 * 🔹 Ottiene tutti gli eventi
 * @returns {Promise<Array>} - Lista di eventi
 */
const getAllEvents = async () => {
  return await eventRepository.findAllEvents();
};

/**
 * 🔹 Ottiene un evento per ID
 * @param {string} eventId - ID dell'evento
 * @returns {Promise<Object>} - Evento trovato o eccezione
 */
const getEventById = async (eventId) => {
  const event = await eventRepository.findEventById(eventId);
  if (!event) {
    throw new DomainException("Evento non trovato", 404);
  }

  return event;
};

/**
 * 🔹 Aggiorna un evento esistente
 * @param {string} eventId - ID dell'evento
 * @param {Object} eventData - Dati aggiornati
 * @returns {Promise<Object>} - Evento aggiornato o eccezione
 */
const updateEvent = async (eventId, eventData) => {
  //return await eventRepository.updateEvent(eventId, eventData);

  const event = await eventRepository.updateEvent(eventId, eventData);
  if (!event) {
    throw new DomainException("Evento non trovato", 404);
  }

  return event;
};

/**
 * 🔹 Elimina un evento
 * @param {string} eventId - ID dell'evento
 * @returns {Promise<Object>} - Evento eliminato o eccezione
 */
const deleteEvent = async (eventId) => {
  //return await eventRepository.deleteEvent(eventId);
  const event = await eventRepository.deleteEvent(eventId);
  if (!event) {
    throw new DomainException("Evento non trovato", 404);
  }

  return { message: "Evento eliminato con successo" };
};

export default {
  createEvent,
  getEventById,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
