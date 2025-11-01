import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            🌾 Maharashtra Seed Service
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm">
                  Welcome, {user?.name || 'User'}
                </span>
                <Link
                  to="/apply"
                  className="px-3 py-2 rounded hover:bg-primary-600 transition"
                >
                  Apply
                </Link>
                <Link
                  to="/status"
                  className="px-3 py-2 rounded hover:bg-primary-600 transition"
                >
                  Status
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 rounded hover:bg-primary-600 transition"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded hover:bg-primary-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded hover:bg-primary-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded hover:bg-primary-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

