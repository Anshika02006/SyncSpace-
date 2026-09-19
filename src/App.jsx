import { BrowserRouter , Routes, Route} from "react-router-dom";
import LandingPage from "./LandingPage";
import ForgotPassword from './ForgotPassword';
import AuthSwitch from './AuthSwitch';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<AuthSwitch />} />
        <Route path="/signup" element={<AuthSwitch />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;