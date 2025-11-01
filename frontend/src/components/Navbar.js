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
    <nav className="bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold hover:text-blue-100 transition">
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
                  className="px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
                >
                  Apply
                </Link>
                <Link
                  to="/status"
                  className="px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
                >
                  Status
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
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

