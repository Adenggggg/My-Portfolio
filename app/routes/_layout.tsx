import { Outlet } from "react-router";
import Navbar from "~/components/ui/navbar";
import Footer from "~/components/ui/footer";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}