import React from "react";
import AuthForm from "./components/AuthForm/AuthForm";
import Home from "./components/Home/Home";

class App extends React.Component {
  state = {
    isLoggedIn: true,
  };

  loginHandle = (isLoggedIn) => {
    this.setState(() => ({ isLoggedIn }));
  };

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? (
          <Home isLogged={this.loginHandle} />
        ) : (
          <AuthForm isLogged={this.loginHandle} />
        )}
      </div>
    );
  }
}

export default App;
