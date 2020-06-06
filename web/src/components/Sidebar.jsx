import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import * as playerActions from '../managers/actions';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

var ps;

const s = { overflow: 'hidden' }

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: true
      });
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a
            href="/admin/dashboard"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <SportsBasketballIcon />
            </div>
          </a>
          <a
            href="/admin/dashboard"
            className="simple-text logo-normal"
          >
            NBA INDEX
          </a>
        </div>
        <div className="sidebar-wrapper" style={s} ref={this.sidebar}>
          <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.name === 'Player' || prop.name === 'Search') {
                return (
                  <li
                    className={
                      this.activeRoute(prop.path) +
                      (prop.pro ? " active-pro" : "")
                    }
                    key={key}
                  >
                  </li>
                )
              }
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                    onClick={() => this.props.resetState()}
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetState: () => dispatch(playerActions.resetState()),
  };
}

Sidebar.propTypes = {
  resetState: PropTypes.func
};

export default connect(null, mapDispatchToProps)(Sidebar);
