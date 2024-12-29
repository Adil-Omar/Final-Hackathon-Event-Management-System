import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsStart, fetchEventsSuccess, fetchEventsFailure } from '../store/slices/eventSlice';
import { getUserEvents } from '../services/eventService';
import EventCard from '../components/EventCard';

function Dashboard() {
  const dispatch = useDispatch();
  const { events, loading } = useSelector(state => state.events);

  useEffect(() => {
    const loadEvents = async () => {
      dispatch(fetchEventsStart());
      try {
        const response = await getUserEvents();
        dispatch(fetchEventsSuccess(response.data));
      } catch (error) {
        dispatch(fetchEventsFailure(error.message));
      }
    };

    loadEvents();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;