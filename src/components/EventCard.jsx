import { Link } from 'react-router-dom';

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-2">{event.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{new Date(event.date).toLocaleDateString()}</span>
        <span>{event.location}</span>
      </div>
      <Link 
        to={`/events/${event._id}`}
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
}

export default EventCard;