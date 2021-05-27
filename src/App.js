
import React, { useState, createContext } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import EditUser from "./components/EditUser/EditUser";
import User from "./components/User/User";
import AddUser from "./components/AddUser/AddUser";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/page/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
        <Navbar/>
        <Switch>
          <PrivateRoute path="/home" component={Home} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/users/:id" component={User} />
          <Router path="/"><Login/></Router>
          
        </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;