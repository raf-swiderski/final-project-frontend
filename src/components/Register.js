import React from "react";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useState } from "react";

function Register() {
  // let history = useHistory(); -- This object lets you send the user to different pages.
  // Used like this, inside an html tag: onClick={() => {history.push('/home'); }}

  //Defining constants, when the user fills in the form, we assign the user's input values to these.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  //function that assigns the form values to the browser's storage. (like sessions/cookies)
  //Local storage object can be see when you type `console.log(localStorage)` into the console
  function submitForm(event) {
    event.preventDefault();
    const data = {
      name: name,
      email: email,
      username: username,
      password: password,
      password_confirmation: password_confirmation,
      cooking_level: 1,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:9000/users/register", options)
      // turn api response into json
      .then((res) => res.json())
      .then(
        (result) => {
          // response from api is loaded
          // assign results from api to recipes array (using react useState function)
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          // setIsLoaded(true);
          // setError(error);
        }
      );
  }

  return (
    <div>
      <title>Register</title>
      <h1>Create An Account</h1>
      <br></br>

      <div>
        <div>
          <form onSubmit={submitForm}>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                onChange={({ target }) => setName(target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="john@smith.com"
                onChange={({ target }) => setEmail(target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="johnsmith"
                onChange={({ target }) => setUsername(target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                onChange={({ target }) => setPassword(target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                placeholder="re-type password"
                onChange={({ target }) => setPasswordConfirmation(target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" value="Create Account">
                Submit
              </button>
            </div>
          </form>

          <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
