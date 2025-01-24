import './App.css';
import React, { useState } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { TodoApp } from './components/ToDoApp';
import { LoginPage } from './components/LoginPage';

function App() {

  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/tasks" /> : <LoginPage setAuthenticated={setAuthenticated} />} 
        />
        <Route 
          path="/tasks/*" 
          element={isAuthenticated ? <TodoApp setAuthenticated={setAuthenticated} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
