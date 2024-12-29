import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/eventService';

function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'tech',
    visibility: 'public'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">Create Event</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
          <input
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="tech">Tech</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Visibility</label>
          <select
            value={formData.visibility}
            onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;