import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Navbar from "./components/common/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
//import ProtectedRoute from "./components/common/protectedRoute";

//App is the container for our application

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            {/* <ProtectedRoute path="" component={} /> */}
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-Found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
