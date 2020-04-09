/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Info from "views/Info.jsx";
import Player from "views/Player.jsx";

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
  }
];
export default routes;
