import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import routes from "./routers/routes";
import RootContextProvider from "./hoc/RootContext";
import PATH_URL from "./routers/path";

class App extends Component {
  render() {
    const RouteWithLayout = ({ component: Component, layout: Layout,...rest }) => (
      <Route {...rest} render={props => (
        <RootContextProvider>
          <Layout>
            <Component {...props} />
          </Layout>
        </RootContextProvider>
      )} />
    );

    const routeComponents =
      routes.map(({ path, component, layout }, key) => {
          return <RouteWithLayout 
            key={key} 
            exact 
            path={path}
            layout={layout}
            component={component}
          />
        }
      );

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Redirect to={PATH_URL.PRODUCT} />} />
          {routeComponents}
        </Switch>
      </Router>
    );
  }
}

export default App;
