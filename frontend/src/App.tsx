import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login'; 
import FileUpload from './components/FileUpload'; // Assuming you have a FileUpload component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/upload" element={<FileUpload />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
