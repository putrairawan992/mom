import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import routes from "./routers/routes";
import RootContextProvider from "./hoc/RootContext";
import PATH_URL from "./routers/path";
import AppLayout from "./layouts/AppLayout";

class App extends Component {  
  render() {
    const RouteWithLayout = ({ component: Component, layout: Layout, needAuthenticated: needAuthenticated, ...rest }) => (
      <Route {...rest} render={props => (
        <AppLayout needAuthenticated={needAuthenticated}>
          <Layout>
            <Component {...props} />
          </Layout>
        </AppLayout>
      )} />
    )

    const routeComponents =
      routes.map(({ path, component, layout, needAuthenticated = false }, key) => {
          return <RouteWithLayout 
            key={key} 
            exact 
            path={path}
            layout={layout}
            component={component}
            needAuthenticated={needAuthenticated}
          />
        }
      );

    return (
      <Router>
        <RootContextProvider>      
            <Route exact path="/" component={() => <Redirect to={PATH_URL.PRODUCT} />} />
            {routeComponents}
        </RootContextProvider>
      </Router>
    );
  }
}

export default App;
