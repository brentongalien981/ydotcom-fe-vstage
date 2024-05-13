import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from './routes';
import MyRouteGuard from '../layouts/MyRouteGuard';

const AppRouter = () => {
  return (
    <Router>
      <MyRouteGuard>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <route.layout>
                  <route.component {...props} />
                </route.layout>
              )}
            />
          ))}
        </Switch>
      </MyRouteGuard>
    </Router>
  );
};

export default AppRouter;
