import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import AdminPage from './Components/pages/AdminPage';
import AddModal from './Components/AddModal/AddModal';

import Navigation from './Components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
    </div>
  );
}

export default App;
