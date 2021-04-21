import '../css/Authentication.css'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

function LogIn() {
    const historyHook = useHistory();

    //Defining constants, when the user fills in the form, we assign the user's input values to these.
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(null);

    function submitForm(e) {
      e.preventDefault()
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      };

      fetch("http://localhost:9000/users/login", options)
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
      <div>
        <div>
          <h1>Login Page</h1>
          <form onSubmit={submitForm}>
          <div>
              <input type="text" id="email" name="email" placeholder="john@smith.com"
              onChange={({ target }) => setEmail(target.value)} required/>
          </div>
          <div>
              <input type="password" id="password" name="password" placeholder="password"
              onChange={({ target }) => setPassword(target.value)} required/>
          </div>
          <input type="submit" value="Log In"/>
          </form>

          <div>If you don't have an  account, please register.</div>
          <Link to="/register">Register</Link>
          <ul>
          </ul>
        </div>
      </div>
    );
  };


  export default LogIn
