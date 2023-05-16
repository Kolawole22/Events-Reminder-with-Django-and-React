import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddCalendarPage from "./Pages/AddCalendarPage";

import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/calendar" element={<AddCalendarPage isLoading={false} />} />
    </Routes>
  );
}

export default App;
