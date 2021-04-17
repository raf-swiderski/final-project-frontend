import '../css/Authentication.css'
import { useHistory } from "react-router-dom";

function LogIn() {
    let history = useHistory();
    
    
    return (
      <div class="sign-in-container">
        <div class="sign-in-form-container">
          <form class="sign-in-form">
            <input name="username" /><br></br>
            <input name="password" />
          </form>
          <button 
            onClick={() => {
              history.push('/home');
            }}>Log In
          </button>
          <ul>
          </ul>
        </div>
      </div>
    );
  };


  export default LogIn