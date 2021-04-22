import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
  const [cooking_level, setCookingLevel] = useState("");
  const [errors, setErrors] = useState(null);
  const historyHook = useHistory();

  //function that assigns the form values to the browser's storage. (like sessions/cookies)
  //Local storage object can be see when you type `console.log(localStorage)` into the console
  function submitForm(event) {
    event.preventDefault();

    console.log("this is a print out of all our constants");
    console.log({ name, email, username, password, password_confirmation, cooking_level });

    const data = {
      name: name,
      email: email,
      username: username,
      password: password,
      password_confirmation: password_confirmation,
      cooking_level: cooking_level,
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
      .then((result) => {
        if (result.errors) {
          // do something about errors
          setErrors(result.errors);
          return;
        }

        // store their user id
        localStorage.setItem("userId", result.data.id)
        localStorage.setItem("cookingLevel", result.data.cooking_level)
        localStorage.setItem("points", result.data.points)
        localStorage.setItem("username", result.data.username)


        // navigate to the home screen
        historyHook.push('/home')
      })
      .catch((err) => {
        console.log(err);
      });
  }

    return (
      <div className="form-group">
        <div className="form-group">
          
          <h3>Create An Account</h3>
          {errors && (
            <div>
              {errors.map((error, index) => (
              <p key={`error-${index}`}>{error.message}</p>
              ))}
            </div>
          )}
        </div>

        
          <form onSubmit={submitForm}>
            <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={({ target }) => setName(target.value)}
                  required
                />
                <br/>
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="john@smith.com"
                  onChange={({ target }) => setEmail(target.value)}
                  required
                />
                <br/>
                <input
                  className="form-control"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="johnsmith"
                  onChange={({ target }) => setUsername(target.value)}
                  required
                />
                <br/>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  onChange={({ target }) => setPassword(target.value)}
                  required
                />
                <br/>
                <input
                  className="form-control"
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="re-type password"
                  onChange={({ target }) => setPasswordConfirmation(target.value)}
                  required
                />
                <br/>
                <select name="cooking_level" id="cooking_level" className="form-control" onChange={({ target }) => setCookingLevel(target.value)}
                  required>
                    <option value="null">Select Cooking Level</option>
                    <option value="1">1(Rookie! 🥣)</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9(Expert!🧑‍🍳 🌟)</option>
                </select>
                <br/>
                <button type="submit" value="Create Account" className="btn btn-primary btn-block">
                  Submit
                </button>
                
            </div>
          </form>
      </div>
        );
      };
          
  export default Register;
