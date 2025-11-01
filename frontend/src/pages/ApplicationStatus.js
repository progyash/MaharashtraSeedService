import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_URL}/seeds/my-applications`);
      setApplications(response.data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'distributed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">🌾</h1>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Status</h1>
          <p className="text-gray-600">Track all your seed applications</p>
        </div>
      
      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-600 text-lg">You haven't submitted any applications yet.</p>
          <p className="text-gray-400 text-sm mt-2">Apply for seeds to get started!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div key={app._id} className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {app.seedType}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    app.status
                  )}`}
                >
                  {getStatusText(app.status)}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Quantity:</span> {app.quantity} kg
                </p>
                <p>
                  <span className="font-medium">Land Area:</span> {app.landArea} acres
                </p>
                <p>
                  <span className="font-medium">Season:</span>{' '}
                  <span className="capitalize">{app.cropSeason}</span>
                </p>
                <p>
                  <span className="font-medium">Applied on:</span>{' '}
                  {new Date(app.appliedAt).toLocaleDateString()}
                </p>
                {app.remarks && (
                  <p>
                    <span className="font-medium">Remarks:</span> {app.remarks}
                  </p>
                )}
                {app.approvedAt && (
                  <p>
                    <span className="font-medium">Processed on:</span>{' '}
                    {new Date(app.approvedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default ApplicationStatus;

