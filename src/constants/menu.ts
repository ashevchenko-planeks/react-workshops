export const BASE_ROUTES = {
  explore: {
    title: "Explore",
    route: "/videos",
  },
  profile: {
    title: "Profile",
    route: "/profile",
  },
  videos: {
    title: "Videos",
    route: "/",
  },
  products: {
    title: "Products",
    route: "/products",
  },
  table: {
    title: "Table",
    route: "/table",
  },
};
export const ADMIN_ROUTES = {
  ...BASE_ROUTES,
  workshop: {
    title: "Workshop",
    route: "/workshop",
  },
};
