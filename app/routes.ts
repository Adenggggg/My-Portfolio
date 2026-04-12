import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/_index.tsx"),
    route("home", "routes/home/index.tsx"),
    route("projects", "routes/projects/index.tsx"),
    route("videos", "routes/videos/index.tsx"),
    route("designs", "routes/designs/index.tsx"),
    route("api/contact", "routes/api/contact.ts"),
  ]),
] satisfies RouteConfig;