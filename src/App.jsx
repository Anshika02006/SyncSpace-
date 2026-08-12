import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './syncspacee';
import SignIn from './signin';
import Signup from './Signup';
import Workspace from './Workspace';
import Features from './Features';
import HowItWorks from './HowItWorks';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Workspace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
