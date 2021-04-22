import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOctopusDeploy } from '@fortawesome/free-brands-svg-icons'

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const authorized = localStorage.getItem("userId");
  const historyHook = useHistory();
  const cooking_level = parseInt(localStorage.getItem("cookingLevel"));
  const points = parseInt(localStorage.getItem("points"));
  const username = localStorage.getItem("username");
 

  useEffect(() => {
    if (authorized) {
      fetch(`http://localhost:9000/?level=${cooking_level}`)
        // turn api response into json
        .then((res) => res.json())
        .then(
          (result) => {
            setRecipes(result.rows);
            setIsLoaded(true);
          },
          (error) => {
            setError(error);
            setIsLoaded(true);
          }
        );
    }
  }, []);

  const onLogOut = () => {
    localStorage.clear();
    historyHook.push("/");
  };

  if (!authorized) {
    return <Redirect to="/login" />;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="btn btn-outline-light" to="/home"><FontAwesomeIcon icon={faOctopusDeploy } size='2x'/> Cookwars</Link>
          <form class="container-fluid justify-content-end">
            <p className="btn btn-outline-light">Username: {username}</p>
            <p className="btn btn-outline-light"> Cooking Level: {cooking_level} </p>
            <p className="btn btn-outline-light"> Points: {points} </p>
            <button className="btn btn-outline-light" onClick={onLogOut}>Log Out</button>
          </form>
        </div>
      </nav>
     
      <div>
        {/* inserting RecipeList component, it is child component and passsing recipes as props */}
        <RecipeList recipes={recipes} />
      </div>
    </div>
    );
  }
}

export default Home;
