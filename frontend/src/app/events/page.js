// src/app/events/page.js
"use client";

import Navbar from "../../components/Navbar.js";
import EventCard from "../../components/EventCard.js";
import { useEffect, useState } from "react";
import { fetchEvents } from "@/services/eventService.js";

// Creo un array con due oggetti che rappresentano due eventi
/*const events = [
  {
    id: 1,
    title: "Concerto Rock",
    date: "2024-06-15",
    image: "/images/concert.jpg",
  },
  {
    id: 2,
    title: "Mostra d'Arte Moderna",
    date: "2024-07-10",
    image: "/images/art.jpg",
  },
];*/

//console.log("Eventi definiti:", events);

/**
 * ✅ useState([]) → Imposta lo stato iniziale di events come un array vuoto [].
 * ✅ events → Variabile di stato che contiene la lista degli eventi.
 * ✅ setEvents → Funzione per aggiornare events con i dati ricevuti dal backend.
 *
 * 🔥 Come funziona nel ciclo di vita del componente?
 * 1️⃣ Stato iniziale (events = [])
 *
 * Quando la pagina viene caricata, events è un array vuoto.
 * Non mostra alcun evento fino a quando non riceve i dati.
 *
 * 2️⃣ Recupero dati dal backend
 *
 * Nel useEffect, chiamiamo fetchEvents() per ottenere gli eventi dal backend.
 *
 * const data = await fetchEvents();
 * setEvents(data);
 *
 * setEvents(data) aggiorna lo stato, assegnando i dati recuperati a events.
 *
 * 3️⃣ Re-render della pagina
 *
 * Quando lo stato cambia (setEvents viene chiamato), React ricarica il componente mostrando i nuovi eventi.
 */

const EventsPage = () => {
  // Stato iniziale: events è un array vuoto, loading è true
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Recupero dati dal backend
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        // Aggiornamento dello stato con i dati ricevuti
        setEvents(data);
      } catch (err) {
        setError("Errore nel recupero degli eventi");
      } finally {
        // Imposta loading a false dopo aver recuperato i dati
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Eventi Disponibili</h1>

        {/* Mostra un messaggio di caricamento mentre i dati vengono recuperati */}
        {loading ? (
          <p className="text-blue-500">Caricamento...</p>
        ) : error ? (
          // Mostra un messaggio di errore se il recupero dati fallisce
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-4">
            {/* Controllo se ci sono eventi da mostrare */}
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event._id || event.id} event={event} />
              ))
            ) : (
              <p className="text-gray-500">Nessun evento disponibile</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
