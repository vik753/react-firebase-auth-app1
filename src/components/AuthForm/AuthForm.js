import React, { Component } from "react";
import "./authForm.scss";
import { logIn, signUp } from "../../service/auth";

class AuthForm extends Component {
  state = {
    email: "",
    password: "",
    error: false, // {title, message }
    response: null,
  };

  onSubmitClickHandler = (e) => {
    e.preventDefault();
    //clear state
    this.setState(() => ({
      error: false,
      response: null,
    }));

    const field = e.target.getAttribute("id");
    let response = null;

    if (field === "onLogin") {
      response = logIn(this.state.email, this.state.password);
    } else if (field === "onSignUp") {
      response = signUp(this.state.email, this.state.password);
    }

    if (!response) {
      this.hintShowHandler(`Error.`, " Can't get response from server!");
      return;
    }

    response.then((data) => {
      if (data.error) {
        this.hintShowHandler(
          `Error.`,
          `${data.errorCode}, ${data.errorMessage}`
        );
      } else {
        this.setState(() => ({
          response: data,
        }));
        this.hintShowHandler(
          "Success!",
          `Sign up successful! Your token: ${
            this.state.response.idToken
          }, it will expire in ${(Number(this.state.response.expiresIn) / 60)} min.`
        );
      }
    });

    //clear state and inputs
    // this.setState(() => ({
    //   email: "",
    //   password: "",
    // }))
  };

  hintShowHandler = (title, message) => {
    const hint = document.querySelector(".hint-wrapper");
    this.setState(() => ({
      error: {
        title,
        message,
      },
    }));
    hint.classList.add("active");
  };

  inputHandler = (e) => {
    const stateField = e.target.getAttribute("id");
    const value = e.target.value.trim();
    this.setState(() => ({ [stateField]: value }));
  };

  hintClickHandler = (e) => {
    e.preventDefault();
    const hint = document.querySelector(".hint-wrapper");
    hint.classList.remove("active");
  };

  render() {
    return (
      <div className="auth-form-wrapper">
        <form className="auth-form">
          <h1>Login please, or sign up</h1>
          <div className="email__wrapper">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              placeholder="email"
              onInput={this.inputHandler}
            />
          </div>
          <div className="password-wrapper">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              onInput={this.inputHandler}
            />
          </div>
          <div className="hint-wrapper">
            <h3>{this.state.error ? this.state.error.title : null}</h3>
            <p>{this.state.error ? this.state.error.message : null}</p>
            <button
              className="btn-hint-close"
              onClick={this.hintClickHandler}
              title="close tooltip"
            >
              x
            </button>
          </div>
          <div className="button-wrapper">
            <button
              id="onLogin"
              className="btn-primary"
              onClick={this.onSubmitClickHandler}
              disabled={!this.state.email || !this.state.password}
            >
              Login
            </button>
            <button
              id="onSignUp"
              className="btn-primary btn-signUp"
              onClick={this.onSubmitClickHandler}
              disabled={!this.state.email || !this.state.password}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AuthForm;
