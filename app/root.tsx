import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { LinksFunction } from "react-router";
import "./app.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" },
];

export default function Root() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.setAttribute("data-js", "");
                try {
                  var t = localStorage.getItem("theme") || "dark";
                  document.documentElement.className = t;
                  document.documentElement.setAttribute("data-theme", t);
                } catch(e) {}
              })();
            `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}