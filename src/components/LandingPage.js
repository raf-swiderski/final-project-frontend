import "../index.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";



const UNAUTHORIZED_ERROR = "Unauthorized";
const INTERNAL_SERVER_ERROR = "Internal Server Error"

function LandingPage() {
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
        .then((res) => { 
          // Is the status code 200, 201, 204 , etc ? aka GOOD
          if(res.ok) {
            return res.json()
          }

          if(res.status === 401) {
            throw new Error(UNAUTHORIZED_ERROR)
          }

          throw new Error(INTERNAL_SERVER_ERROR)
        })
        .then((result) => {
          if (result.errors) {            
            // do something about errors
            setErrors(result.data.errors);
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
          if(!err.message) {
            // Uh oh ... we don't know what this is
            console.log("Mystery Error ... probably just do nothing")

            setErrors( [ { message: "Something went wrong ! Sorry ... try again." } ] );
          }

          else if(err.message === INTERNAL_SERVER_ERROR){
            // Show internal server error
            console.log("Got an internal server error")

            setErrors( [ { message: "Internal Server Error" } ] );
          }

          else if(err.message === UNAUTHORIZED_ERROR) {
            // Show wrong username / password error
            console.log("Got an unauthorized error")

            setErrors( [ { message: "Wrong username or password"} ] );
          }
        });

    }
    return (
      <div className="form-group">
        <div className="form-group">
        <h3>Sign In</h3>
          
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
              <input type="email" id="email" name="email" placeholder="john@smith.com" className="form-control"
              onChange={({ target }) => setEmail(target.value)} required/>
          

          
              <input type="password" id="password" name="password" placeholder="password" className="form-control"
              onChange={({ target }) => setPassword(target.value)} required/>
          
          
              <button type="submit" className="btn btn-primary btn-block" value="Log In">Submit</button>
                
                <p className="forgot-password text-right">
                If you don't have an  account, please <a href="/register">Register</a>. 
                </p>
            </div>
          </form>
          </div>
    );
  };


export default LandingPage;
