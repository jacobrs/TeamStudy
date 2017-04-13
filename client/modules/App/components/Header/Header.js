import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logoutReq();
  }

  componentDidMount() {
    if(window.jQuery){
      $.material.init();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    $.material.init();
  }

  render() {
    return (
      <nav className="navbar navbar-default" role="navigation" id={styles.navbar}>
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#col-menu">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
            </button>
            <Link to="/profile" className="navbar-brand" href="#"><i className="fa fa-graduation-cap"/>&nbsp;&nbsp;TeamStudy</Link>
          </div>

          <div className="collapse navbar-collapse navbar-right" id="col-menu">
            <ul className="nav navbar-nav">
              <li><Link to="/registerGroup"><i className="fa fa-users"/>&nbsp;&nbsp;Create study group</Link></li>
              <li></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Profile <b className="caret"></b></a>
                <ul className="dropdown-menu">
                  <li><Link to="/profile">Dashboard</Link></li>
                  <li><Link onClick={this.handleLogout}>Sign out</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }


}

Header.propTypes = {
  logoutReq: PropTypes.func.isRequired,
};

export default Header;
