// src/components/EventCard.js
import Link from "next/link";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
      <p className="text-gray-600">{event.date}</p>
      <Link
        href={`/events/${event.id}`}
        className="text-blue-500 mt-2 block hover:underline"
      >
        Dettagli
      </Link>
    </div>
  );
};

export default EventCard;
