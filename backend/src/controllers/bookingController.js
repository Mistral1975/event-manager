// src/controllers/bookingController.js
import bookingService from "../services/bookingService.js";

/**
 * 🔹 Crea una nuova prenotazione
 */
const createBooking = async (req, res) => {
  try {
    const newBooking = await bookingService.createBooking(
      req.body,
      req.user.subject
    );
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const findBookingById = async (req, res) => {
  try {
    const findBookingById = await bookingService.getBookingById(
      req.user.subject,
      req.params.id
    );
    res.status(200).json(findBookingById);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const findBookingsByUser = async (req, res) => {
  const findBookingByUser = await bookingService.getBookingsByUser(
    req.user.subject
  );
  res.status(200).json(findBookingByUser);
  try {
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await bookingService.cancelBooking(req.user.subject, req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default {
  createBooking,
  findBookingById,
  findBookingsByUser,
  deleteBooking,
};
