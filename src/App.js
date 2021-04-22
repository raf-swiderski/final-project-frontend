import "./index.css";
import LogIn from "./components/Login";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import RecipePage from "./components/RecipePage";
import { useHistory } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOctopusDeploy } from '@fortawesome/free-brands-svg-icons'



// import "./App.scss";
// import './fontAwesomeIcons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import './fontawesome.js';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  const historyHook = useHistory();


  return (<Router>
    
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          
          <Link className="btn btn-outline-light" to="/home"><FontAwesomeIcon icon={faOctopusDeploy } size='2x'/></Link>
          <form class="container-fluid justify-content-end">
          <Link className="btn btn-outline-light" to="/login">Login</Link>
          <Link class="btn btn-outline-light" to="/register">Sign up</Link>
          
          </form>
        </div>
      </nav>
     

      <div className="auth-wrapper">
        <div className="auth-inner">

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/home" component={Home} />
        <Route path="/recipe/:id" component={RecipePage} />
      </Switch>
    
        </div>
      </div>
    </div>
    </Router>
    
  );
}

export default App;
