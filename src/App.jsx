import React, { Button, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy load page components
const Home = lazy(() => import('./pages/Home/Home'));
const Products = lazy(() => import('./pages/Products/Products'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Signup = lazy(() => import('./pages/Auth/Signup'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute')); // Lazy load ProtectedRoute


function App() {

  return (
    <>
      <Router>
        <Suspense fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
            <Spinner animation="border" role="status" className="mb-3" />
            <p>Loading application...</p>
          </div>
        }>
          <Routes>
            <Route path='/' element={<Home/>}> </Route>
            <Route path='/register' element={<Signup/>}> </Route>
            <Route path='/contact' element={<Contact/>}> </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/products' element={<Products/>}> </Route>
            </Route>

            {/* An admin-only route */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path='/admin-dashboard' element={<div>Admin Dashboard Content</div>}> </Route>
            </Route>

            {/* Route for unauthorized access */}
            <Route path='/unauthorized' element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>403 - Unauthorized Access</h2>
                <p>You do not have permission to view this page.</p>
                <Button onClick={() => window.location.href = '/'}>Go to Home</Button>
              </div>
            }> </Route>

            {/* Catch-all for undefined routes */}
            <Route path='*' element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <Button onClick={() => window.location.href = '/'}>Go to Home</Button>
              </div>
            }> </Route>

          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
