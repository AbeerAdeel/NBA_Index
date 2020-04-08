import React from "react";
import { createBrowserHistory } from "history";
import { Route, Switch, Redirect, BrowserRouter} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.jsx";

const hist = createBrowserHistory();

const App = () => (
  <BrowserRouter history={hist}>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>
);

export default App;