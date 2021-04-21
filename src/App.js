import "./App.css";
import LogIn from "./components/Login";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import RecipePage from "./components/RecipePage";
import { useHistory } from "react-router-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const historyHook = useHistory();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/home" component={Home} />
        <Route path="/recipe/:id" component={RecipePage} />
      </Switch>
    </Router>
  );
}

export default App;
