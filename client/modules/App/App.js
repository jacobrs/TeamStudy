import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header } from './components/Header/Header';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Show nav bar only if user is logged in
    const header = (this.props.users.user != null) ? <Header /> : null;

    return (
      <div>
        <div>
          <Helmet
            title="TeamStudy"
            titleTemplate="%s"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          {header}
          <div className={styles.container}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    users: store.users,
  };
}

export default connect(mapStateToProps, {})(App);
