
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          success: {
            style: {
              background: '#4CAF50',
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#F44336',
              color: '#fff',
            },
          },
        }}
      />
      <AppRoutes />
    </Router>
  );
}

export default App;

