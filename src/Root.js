import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import App from './components/App';
import Home from './components/Home';
import configureStore from './configureStore';
const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/room/:id">
          <App />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default Root;
