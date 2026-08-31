import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './syncspacee';
import SignIn from './signin';
import Signup from './Signup';
import Workspace from './Workspace';
import Features from './Features';
import HowItWorks from './HowItWorks';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import ForgotPassword from './ForgotPassword';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/workspace" element={
          <ProtectedRoute>
            <Workspace />
          </ProtectedRoute>
        } />
        <Route path="/features" element={
          <ProtectedRoute>
            <Features />
          </ProtectedRoute>
        } />
        <Route path="/how-it-works" element={
          <ProtectedRoute>
            <HowItWorks />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
