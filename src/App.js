import './App.css';
import LogIn from './components/Login'
import Home from './components/Home'
import LandingPage from './components/LandingPage'


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} /> 
        <Route exact path="/login" component={LogIn} /> 
        <Route exact path="/home" component={() => <Home authorized={true}/>} /> 
      </Switch>
    </Router>


  );
}

export default App;
