import React, { Component } from "react";
import "./home.scss";

class Home extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <h1>Hello, you are on the private page, because you are was logged!</h1>
        <p>Have our congratulations!</p>
        <button
          className="btn-primary"
          onClick={() => this.props.isLogged(false)}
        >
          Log out
        </button>
      </div>
    );
  }
}

export default Home;
