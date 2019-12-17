import React, { Component } from 'react'
import './App.css'
import store from './store'
import { getSession } from './Redux/Actions/sessionAction'
import { Auth } from 'aws-amplify'
import Routes from './Routes'
import { Provider } from 'react-redux'

class App extends Component {
  
  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      const user = await Auth.currentAuthenticatedUser();
      if(session) {
        const sessionDataRedux = {
          jwtToken: session.idToken.jwtToken,
          username: user.username,
          email: session.idToken.payload.email,
          email_verified: session.idToken.payload.email_verified,
          middle_name: session.idToken.payload.middle_name,
          name: session.idToken.payload.name,
          phone_number: session.idToken.payload.phone_number,
          phone_number_verified: session.idToken.payload.phone_number_verified,
          sub: session.idToken.payload.sub,
          scope: (session.accessToken.payload.scope) ? session.accessToken.payload.scope : 0,
          timeLogin: session.accessToken.payload.auth_time,
        }
        store.dispatch(getSession(sessionDataRedux));
      }
    } catch(error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Routes />
        </div>
      </Provider>
    );
  };
}

export default App;
