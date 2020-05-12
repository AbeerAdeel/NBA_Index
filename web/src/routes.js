import Dashboard from "views/Dashboard.jsx";
import Info from "views/Info.jsx";
import Player from "views/Player.jsx";
import Results from "views/Results.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "nc-icon nc-app",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/info",
    name: "Info",
    icon: "nc-icon nc-paper",
    component: Info,
    layout: "/admin"
  },
  {
    path: "/player",
    name: "Player",
    component: Player,
    layout: "/admin"
  },
  {
    path: "/search",
    name: "Search",
    component: Results,
    layout: "/admin"
  }
];
export default routes;
