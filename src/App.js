import "./App.css";
import Login from "./pages/login/login";
// import Signup from "./pages/register"
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>} />
        {/* <Route path="/signup" element={<Signup></Signup>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
