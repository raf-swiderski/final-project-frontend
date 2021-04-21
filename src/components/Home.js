import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";

// function CookingLevel() {
//   return cooking_level
// }

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const authorized = localStorage.getItem("userId");
  const historyHook = useHistory();
  const cooking_level = parseInt(localStorage.getItem("cookingLevel"));
  const points = parseInt(localStorage.getItem("points"));
  const username = localStorage.getItem("username");
  // to be replace with localStorage.getItem

  useEffect(() => {
    if (authorized) {
      fetch(`http://localhost:9000/?level=${cooking_level}`)
        // turn api response into json
        .then((res) => res.json())
        .then(
          (result) => {
            // response from api is loaded
            setIsLoaded(true);
            console.log(result);
            // assign results from api to recipes array (using react useState function)
            setRecipes(result.rows);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
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
      <div>
        <title>Home</title>
        <h1> Welcome to Cooking Chaos </h1>
        <br></br>
        <h2>Please pick your Kata.</h2>
        <h3>Cooking Level: {cooking_level} </h3>
        <h3>Points: {points} </h3>
        <h3>Username: {username} </h3>
        <button onClick={onLogOut}>Log Out</button>

        {/* inserting RecipeList component, it is child component and passsing recipes as props */}
        <RecipeList recipes={recipes} />

        <button onClick={onLogOut}>Log Out</button>
      </div>
    );
  }
}

export default Home;
