import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Register() {
    let history = useHistory();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")

    return (
        <div>
            <title>Register</title>  
            <h1>Create An Account</h1><br></br>

            <div class="sign-in-container">
                <div class="form-container">
                <form action="/users/register" method="POST">
                    <div>
                        <input type="text" id="name" name="name" placeholder="Name" required/>
                    </div>
                    <div>
                        <input type="text" id="email" name="email" placeholder="john@smith.com" required/>
                    </div>
                    <div>
                        <input type="text" id="username" name="username" placeholder="@john_smith" required/>
                    </div>
                    <div>
                        <input type="password" id="password" name="password" placeholder="password" required/>
                    </div>
                    <div>
                        <input type="password" id="password_confirmation" name="password_confirmation" placeholder="re-type password" required/>
                    </div>
                    <div>
                        <input type="submit" value="Create Account"/>
                    </div>
                    <a href="/users/login">Already have an account? Log in here!</a>
                </form>

                <button onClick={() => {history.push('/home'); }}>Register</button>

                <Link to="/login">Log In</Link>

                </div>
            </div>
        </div>
    );
};
  
  
export default Register

