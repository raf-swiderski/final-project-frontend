import '../css/Authentication.css'
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function LogIn() {
    let history = useHistory();
    
    
    return (
      <div class="sign-in-container">
        <div class="sign-in-form-container">
          <h1>Login Page</h1>
          <form class="sign-in-form">
            <input name="username" /><br></br>
            <input name="password" />
          </form>
          <button 
            onClick={() => {
              history.push('/home');
            }}>Log In
          </button>
          <div>If you don't have an  account, please register.</div>
          <Link to="/register">Register</Link>
          <ul>
          </ul>
        </div>
      </div>
    );
  };


  export default LogIn