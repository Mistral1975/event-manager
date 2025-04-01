// src/repository/eventRepository.js
import Event from "../schema/eventSchema.js";

/**
 * createEvent(data)
 * findEventById(id)
 * findAllEvents()
 * updateEvent(id, data)
 * deleteEvent(id)
 */

/**
 * 🔹 Crea un nuovo evento nel database
 * @param {Object} eventData - Dati dell'evento
 * @returns {Promise<Event>} - Ritorna l'evento creato
 */
const createEvent = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

/**
 * 🔹 Recupera tutti gli eventi
 * @returns {Promise<Event[]>} - Ritorna un array di eventi
 */
const findAllEvents = async () => {
  return await Event.find();
};

/**
 * 🔹 Trova un evento per ID
 * @param {string} eventId - ID dell'evento
 * @returns {Promise<Event|null>} - Ritorna l'evento se trovato, altrimenti null
 */
const findEventById = async (eventId) => {
  /*try {
    return await Event.findById(eventId);
  } catch (error) {
    throw new Error("Errore durante la ricerca dell'evento: " + error.message);
  }*/

  return await Event.findById(eventId);
};

/**
 * 🔹 Aggiorna un evento esistente
 * @param {string} eventId - ID dell'evento
 * @param {Object} eventData - Nuovi dati dell'evento
 * @returns {Promise<Event|null>} - Ritorna l'evento aggiornato o null se non trovato
 */
const updateEvent = async (eventId, eventData) => {
  return await Event.findByIdAndUpdate(eventId, eventData, { new: true });
};

/**
 * 🔹 Elimina un evento per ID
 * @param {string} eventId - ID dell'evento
 * @returns {Promise<Event|null>} - Ritorna l'evento eliminato o null se non trovato
 */
const deleteEvent = async (eventId) => {
  return await Event.findByIdAndDelete(eventId);
};

export default {
  createEvent,
  findEventById,
  findAllEvents,
  updateEvent,
  deleteEvent,
};
