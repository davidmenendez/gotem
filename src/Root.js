import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import configureStore from './configureStore';

const store = configureStore();
const App = lazy(() => import('./routes/App'));
const Home = lazy(() => import('./routes/Home'));
const NotFound = lazy(() => import('./routes/NotFound'));

const Root = () => (
  <Provider store={store}>
    <Router>
      <Suspense fallback={<div className="loading"><h2>loading...</h2></div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/room/:id" component={App} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  </Provider>
);

export default Root;
