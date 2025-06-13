import { Outlet } from "react-router-dom";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
