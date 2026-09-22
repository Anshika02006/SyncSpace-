import { BrowserRouter , Routes, Route} from "react-router-dom";
import LandingPage from "./LandingPage";
import ForgotPassword from './ForgotPassword';
import AuthSwitch from './AuthSwitch';
import Dashboard from './Dashboard';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<AuthSwitch />} />
        <Route path="/signup" element={<AuthSwitch />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
  path="/dashboard"
  element={<Dashboard userName={localStorage.getItem("userName") || "User"} />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;