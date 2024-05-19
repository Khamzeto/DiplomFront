import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import Student from './pages/Student';

const Navigation = ({ setAddModal }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage setAddModal={setAddModal} />} />
        <Route path="/student/:id" element={<Student />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
