import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ApplyForSeeds = () => {
  const [formData, setFormData] = useState({
    seedType: '',
    quantity: '',
    landArea: '',
    cropSeason: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    try {
      await axios.post(`${API_URL}/seeds/apply`, formData);
      setMessage({ type: 'success', text: 'Application submitted successfully!' });
      setFormData({ seedType: '', quantity: '', landArea: '', cropSeason: '' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to submit application'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl mb-2">🌾</h1>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Apply for Seed Distribution
            </h1>
            <p className="text-gray-600">
              Welcome, <span className="font-semibold text-blue-600">{user?.name}</span>. Fill in the details below to apply for seeds.
            </p>
          </div>

        {message.text && (
          <div
            className={`mb-4 px-4 py-3 rounded ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700 border border-green-400'
                : 'bg-red-100 text-red-700 border border-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seed Type
            </label>
            <select
              name="seedType"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              value={formData.seedType}
              onChange={handleChange}
            >
              <option value="">Select seed type</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="cotton">Cotton</option>
              <option value="soybean">Soybean</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="maize">Maize</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity (kg)
            </label>
            <input
              type="number"
              name="quantity"
              required
              min="1"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Land Area (acres)
            </label>
            <input
              type="number"
              name="landArea"
              required
              min="0.1"
              step="0.1"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              value={formData.landArea}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Crop Season
            </label>
            <select
              name="cropSeason"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              value={formData.cropSeason}
              onChange={handleChange}
            >
              <option value="">Select crop season</option>
              <option value="kharif">Kharif</option>
              <option value="rabi">Rabi</option>
              <option value="zaid">Zaid</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-semibold shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForSeeds;

