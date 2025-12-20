import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Animation.css";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import RequiredAuth from "./components/auth/RequiredAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequiredAuth>
              <AdminDashboard />
            </RequiredAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
