import Dashboard from "views/Dashboard.jsx";
import Info from "views/Info.jsx";
import Player from "views/Player.jsx";
import Results from "views/Results.jsx";
import Comparisons from "views/Comparisons.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Index",
    icon: "nc-icon nc-app",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/comparison",
    name: "Compare",
    icon: "nc-icon nc-single-02",
    component: Comparisons,
    layout: "/admin"
  },
  {
    path: "/info",
    name: "Info",
    icon: "nc-icon nc-alert-circle-i",
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
  },
];
export default routes;
