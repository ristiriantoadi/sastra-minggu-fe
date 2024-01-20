import "./App.css";
import Login from "./pages/login/login";
// import Signup from "./pages/register"
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateLayout from "./layouts/PrivateLayout";
import Dashboard from "./pages/dashboard/dashboard";
import MyWork from "./pages/my-work/MyWork";
import Signup from "./pages/signup/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard"></Navigate>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<Signup></Signup>} />
        <Route element={<PrivateLayout></PrivateLayout>}>
          <Route path="/dashboard" element={<Dashboard></Dashboard>} />
          <Route path="/karya-saya" element={<MyWork></MyWork>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
