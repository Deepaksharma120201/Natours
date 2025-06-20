import { Outlet, useLocation } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

function MainLayout() {
  const location = useLocation();

  return (
    <>
      <Header />
      <main>
        <Outlet key={location.pathname} />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
