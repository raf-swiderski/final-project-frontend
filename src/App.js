import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <li>
            <Link to="/login">Log In</Link>
          </li> 
        </nav>
      </div>
    

    <Switch>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
    </Router>


  );
}

export default App;
