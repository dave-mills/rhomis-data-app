/* See this tutorial for authentication state management
https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
https://reactrouter.com/web/example/auth-workflow 
*/

// Import styling
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import router information
import React, { useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Import the various components
import { LoginComponent } from "./components/login-component/login-component"
import { DataQueryComponent } from "./components/data-query-component/data-query-component"
import ProjectManagementComponent from "./components/project-management-component/project-management-component"
import MainNavbar from './components/navigation-bar/navigation-bar-component'

// Import the context which stores the authentication tokens
import AuthContext, { AuthContextProvider } from './components/authentication-component/AuthContext';

function App() {
  const [authToken, setAuthToken] = useState(null);

  return (
    < Router >

      {/* Rendering the router */}
      {authToken ? <MainNavbar /> : null}
      <div className="main-page">
        <Switch>
          <AuthContext.Provider value={[authToken, setAuthToken]}>

            <Route path="/login">
              <LoginComponent />
            </Route>

            {/* Checking if logged in, otherwise redirect */}
            {authToken ? <Route path="/data-querying">
              <DataQueryComponent />
            </Route> : <Redirect to="/login" />}

            {/* Checking if logged in, otherwise redirect */}
            {authToken ? <Route exact path="/">
              <ProjectManagementComponent />
            </Route> : <Redirect to="/login" />}
          </AuthContext.Provider>

        </Switch>
      </div >
    </Router >


  );
}

export default App;
