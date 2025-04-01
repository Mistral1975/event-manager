// src/controllers/eventController.js
import eventService from "../services/eventService.js";

/**
 * 🔹 Crea un nuovo evento
 */
const createEvent = async (req, res) => {
  try {
    const newEvent = await eventService.createEvent(req.body, req.user.subject);
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

/**
 * 🔹 Ottiene tutti gli eventi
 */
const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

/**
 * 🔹 Ottiene un evento specifico per ID
 */
const getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

/**
 * 🔹 Aggiorna un evento esistente
 */
const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await eventService.updateEvent(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

/**
 * 🔹 Elimina un evento
 */
const deleteEvent = async (req, res) => {
  try {
    /**
     * Se il client ha bisogno di sapere quale evento è stato eliminato, allora ha senso restituire l'oggetto eliminato in JSON.
     * In questo caso si usa questa forma:
     *
     * const deleteEvent = await eventService.deleteEvent(req.params.id);
     * res.status(200).json(deleteEvent);
     *
     */

    await eventService.deleteEvent(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default {
  createEvent,
  getEventById,
  getAllEvents,
  updateEvent,
  deleteEvent,
}; // Esporta come oggetto
