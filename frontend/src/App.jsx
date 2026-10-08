import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DSAList from './pages/DSAList';
import DSAQuestion from './pages/DSAQuestion';
import MockInterview from './pages/MockInterview';
import Aptitude from './pages/Aptitude';
import Profile from './pages/Profile';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dsa" element={<PrivateRoute><DSAList /></PrivateRoute>} />
          <Route path="/dsa/:id" element={<PrivateRoute><DSAQuestion /></PrivateRoute>} />
          <Route path="/interview" element={<PrivateRoute><MockInterview /></PrivateRoute>} />
          <Route path="/aptitude" element={<PrivateRoute><Aptitude /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
