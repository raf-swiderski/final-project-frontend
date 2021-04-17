import {
    Link
  } from "react-router-dom";

function LandingPage() {
    
    //if(!authorized)
    return (
        <div>
                <ul>
                    <li>
                    <Link to="/home">Home</Link>
                    </li>
                    <li>
                    <Link to="/login">LogIn</Link>
                    </li>
                </ul>
        </div>
    );
}

export default LandingPage;
