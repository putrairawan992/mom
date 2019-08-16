import React, { Component } from "react";
import { Switch, Route, Router } from "react-router-dom";
import routes from "./routers/routes";
import history from "./routers/history";
import MainLayout from "./layouts/MainLayout";
import FullLayout from "./layouts/FullLayout";
import RootContextProvider from "./hoc/RootContext";

class App extends Component {
  render() {
    const RouteWithLayout = ({ component: Component, layout: Layout,...rest }) => (
      <Route {...rest} render={props => (
        <Layout>
          <RootContextProvider>
            <Component {...props} />
          </RootContextProvider>
        </Layout>
      )} />
    );

    const routeComponents =
      routes.map(({ path, component, layoutName }, key) => {
          let layout = MainLayout;
          if(layoutName === "fullLayout") {
            layout = FullLayout;
          }
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
      <Router history={history}>
        <Switch>
          {routeComponents}
        </Switch>
      </Router>
    );
  }
}

export default App;
