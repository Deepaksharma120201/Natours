import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import TourDetails from "./pages/TourDetails";
import Login from "./pages/Login";
import MainLayout from "./ui/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/tour/:slug" element={<TourDetails />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
