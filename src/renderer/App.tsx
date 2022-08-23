import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Photo from './components/Photo';
import Hello from './components/Hello';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/photo" element={<Photo/>} />
        <Route path="/" element={<Hello/>} />
      </Routes>
    </Router>
  );
}
