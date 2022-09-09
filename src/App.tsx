import SplashScreen from 'components/SplashScreen';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from 'screens/Authentication';
import Desktop from 'screens/Desktop';

import './App.css';

function App() {
  const [isSplashScreenComplete, setIsSplashScreenComplete] = useState(false);
  function onSplashScreenComplete() {
    setIsSplashScreenComplete(true);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen onComplete={onSplashScreenComplete} />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/desktop" element={<Desktop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
