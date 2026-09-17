import { BrowserRouter , Routes, Route} from "react-router-dom";
import LandingPage from "./LandingPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from './ForgotPassword';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgot-Password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;