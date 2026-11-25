import { Outlet } from "react-router";
import Navbar from "~/components/ui/navbar";
import Footer from "~/components/ui/footer";
import { ThemeProvider } from "~/lib/theme";
import { Effects } from "~/components/ui/Effects";
import { EasterEggs } from "~/components/ui/EasterEggs";

export default function Layout() {
  return (
    <ThemeProvider>
      <Effects />
      <EasterEggs />
      <Navbar />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}