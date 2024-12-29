import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById, rsvpToEvent } from '../services/eventService';
import { useSelector } from 'react-redux';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(id);
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRSVP = async () => {
    try {
      const response = await rsvpToEvent(id);
      setEvent(response.data);
    } catch (error) {
      console.error('Failed to RSVP:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold">Date & Time</h3>
            <p>{new Date(event.date).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Location</h3>
            <p>{event.location}</p>
          </div>
          <div>
            <h3 className="font-semibold">Category</h3>
            <p className="capitalize">{event.category}</p>
          </div>
          <div>
            <h3 className="font-semibold">Attendees</h3>
            <p>{event.attendees?.length || 0}</p>
          </div>
        </div>
        {isAuthenticated && (
          <button
            onClick={handleRSVP}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            RSVP
          </button>
        )}
      </div>
    </div>
  );
}

export default EventDetails;