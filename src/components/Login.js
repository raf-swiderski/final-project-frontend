import '../css/Authentication.css'
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

function LogIn() {
    // let history = useHistory();
    
    //Defining constants, when the user fills in the form, we assign the user's input values to these.
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function submitForm() {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    }
    
    return (
      <div>
        <div>
          <h1>Login Page</h1>
          <form onSubmit={submitForm}>
          <div>
              <input type="text" id="username" name="username" placeholder="johnsmith" 
              onChange={({ target }) => setUsername(target.value)} required/>
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