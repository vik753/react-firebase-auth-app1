const API_KEY = "AIzaSyBASUNpP4rQPvH_oMV0kQPNmNXojAJo0x0";
const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const signUp = async (email, password) => {
  const request_body = {
    method: "POST",
    returnSecureToken: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  try {
    const response = await fetch(SIGN_UP_URL, request_body);
    const response_data = await response.json();

    if (response_data.error) {
      const err = new Error();
      err.message = response_data.error.message;
      err.code = response_data.error.code;
      throw err;
    }

    response_data.error = false;
    return response_data;
  } catch (err) {
    const code = err.code ? `Code: ${err.code}` : "";
    console.log(err, code, err.message);
    return {
      error: true,
      errorCode: code,
      errorMessage: err.message,
    };
  }
};

const logIn = (email, password) => {
  console.log(email, password);
};

export { signUp, logIn };
