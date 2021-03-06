import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOctopusDeploy } from '@fortawesome/free-brands-svg-icons'

const calculateLevel = (points) => {
  const level = Math.floor(points / 100)

  localStorage.setItem("cookingLevel", level)
  return level;
}

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cooking_level, setCookingLevel] = useState(parseInt(localStorage.getItem("cookingLevel")));
  const [recipes, setRecipes] = useState({});
  const authorized = localStorage.getItem("userId");
  const historyHook = useHistory();
  const [points, setPoints] = useState(parseInt(localStorage.getItem("points")));
  const username = localStorage.getItem("username");
 

  useEffect(() => {
    if (authorized) {
      fetch(`http://localhost:9000/?level=${cooking_level}&userId=${authorized}`)
        // turn api response into json
        .then((res) => res.json())
        .then(
          (result) => {

             // assign results from api to recipes array (using react useState function)
            setRecipes(result);
            // response from api is loaded
            setIsLoaded(true);
          },
          (error) => {
            setError(error);
            setIsLoaded(true);
          }
        );
    }
  }, []);

  const onRecipeCompleted = (data) => {
    setRecipes(data.recipes)
    setPoints(data.points)
    setCookingLevel(data.cooking_level)
  }

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
        <title>Home</title>
        <h1> Welcome to Cooking Chaos </h1>
        <br></br>
        <h2>Please pick your Kata.</h2>
        <h3>Cooking Level: {calculateLevel(points)} </h3>
        <h3>Points: {points} </h3>
        <h3>Username: {username} </h3>
        <button onClick={onLogOut}>Log Out</button>

        {/* inserting RecipeList component, it is child component and passsing recipes as props */}
        <RecipeList recipes={recipes} onRecipeCompleted={onRecipeCompleted} />
      </div>
    </div>
    );
  }
}

export default Home;
