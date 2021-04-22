import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";

const calculateLevel = (points) => {
  const level = Math.floor(points / 100)

  localStorage.setItem("cookingLevel", level)
  return level;
}

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState({});
  const authorized = localStorage.getItem("userId");
  const historyHook = useHistory();
  const cooking_level = parseInt(localStorage.getItem("cookingLevel"));
  const [points, setPoints] = useState(parseInt(localStorage.getItem("points")));
  const username = localStorage.getItem("username");
 

  useEffect(() => {
    if (authorized) {
      fetch(`http://localhost:9000/?level=${cooking_level}&userId=${authorized}`)
        // turn api response into json
        .then((res) => res.json())
        .then(
          (result) => {
            // response from api is loaded
            setIsLoaded(true);
            // assign results from api to recipes array (using react useState function)
            setRecipes(result);

            // result
            /* 
            recipes = {
                completed: completed_recipes_array,
                recipes: recipes.rows
            }
            */
            // List of recipes
            // List of recipes, a list of the users completed recipes
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, []);

  const onRecipeCompleted = (data) => {
    setRecipes(data.recipes)
    setPoints(data.points)
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

        <button onClick={onLogOut}>Log Out</button>
      </div>
    );
  }
}

export default Home;
