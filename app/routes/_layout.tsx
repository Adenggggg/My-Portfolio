import { Outlet } from "react-router";
import Navbar from "~/components/ui/navbar";
import Footer from "~/components/ui/footer";
import { ThemeProvider } from "~/lib/theme";

export default function Layout() {
  return (
    <ThemeProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}