import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">EventHub</Link>
        <div className="flex gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">Dashboard</Link>
              <Link to="/create-event" className="text-gray-600 hover:text-gray-800">Create Event</Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-800">Login</Link>
              <Link to="/register" className="text-gray-600 hover:text-gray-800">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;