import React , {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import EditorWrapper from './components/EditorWrapper'; // Import the EditorWrapper component
import { loadUser } from './redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:id" element={<EditorWrapper />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
