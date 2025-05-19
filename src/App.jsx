import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import { Home } from './components/Home';
import EditarProyecto from './components/EditarProyecto';
import VerProyecto from './components/VerProyecto';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/EditarProyecto/:titulo/:id" element={<EditarProyecto />} />
          <Route path="/VerProyecto/:titulo/:id" element={<VerProyecto />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

