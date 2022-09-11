import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from 'screens/Authentication';
import Desktop from 'screens/Desktop';
import SplashScreen from 'screens/SplashScreen';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/desktop" element={<Desktop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
