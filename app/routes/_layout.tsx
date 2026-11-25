import { Outlet } from "react-router";
import Navbar from "~/components/ui/navbar";
import Footer from "~/components/ui/footer";
import { ThemeProvider } from "~/lib/theme";
import { Effects } from "~/components/ui/Effects";

export default function Layout() {
  return (
    <ThemeProvider>
      <Effects />
      <Navbar />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}