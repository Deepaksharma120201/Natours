import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Overview from "./pages/Overview";
import TourDetails from "./pages/TourDetails";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import MainLayout from "./ui/Layout";
import UserAccount from "./pages/UserAccount";
import Signup from "./pages/Signup";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/tour/:slug" element={<TourDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/me" element={<UserAccount />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/not-found" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
