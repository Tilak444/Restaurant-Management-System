import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NewOrderPage from './pages/NewOrderPage';
import MenuManagementPage from './pages/MenuManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new-order" element={<NewOrderPage />} />
        <Route path="/menu" element={<MenuManagementPage />} />
        <Route path="/" element={<Navigate to="/new-order" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
