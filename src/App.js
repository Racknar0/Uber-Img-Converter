import Login from './pages/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Converter from './pages/Converter';
import AuthProvider from './context/authContext';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  return (
    <>
      <AuthProvider >
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoutes />} >
              <Route path="/" element={<Login />} />
            </Route>
  
            {/* protected route */}
            <Route element={<ProtectedRoutes />} >
              <Route path="/dashboard" element={<Converter />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>

  );
}

export default App;
