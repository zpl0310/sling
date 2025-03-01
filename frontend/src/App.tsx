import React from 'react';
import './App.css';
import Login from './containers/LoginPage'
import MessagePage from './containers/MessagePage'

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './store';
import thunk from 'redux-thunk'
import logger from 'redux-logger';

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
const store = createStoreWithMiddleware(rootReducer)

const initialState = {
  loggedIn: false
}

type AppState = {
  loggedIn: boolean
}

class App extends React.Component<{}, AppState> {
  readonly state: AppState = initialState

  componentDidMount() {
    if (localStorage.getItem('jwt_token')) {
      this.setState({ loggedIn: true })
    }
  }

  setLoggedIn(isLoggedIn: boolean) {
    if (!isLoggedIn) {
      localStorage.removeItem('jwt_token')
    }
    this.setState({ loggedIn: isLoggedIn })
  }

  render() {
    console.log(this.state)
    return (
      <Provider store={store}>
        <div className="App">
          {this.state.loggedIn ?
            <MessagePage setLoggedOut={() => this.setLoggedIn(false)} /> :
            <Login setLoggedIn={() => this.setLoggedIn(true)} />
          }
        </div>
      </Provider>
    );
  }
}

export default App;
