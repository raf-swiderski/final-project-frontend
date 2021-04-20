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
  const authorized = localStorage.getItem("userId")
  const historyHook = useHistory()
  const cooking_level = parseInt(localStorage.getItem("cookingLevel")); // to be replace with localStorage.getItem

  useEffect(() => {
    if (authorized) {
      
      const options = { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          level: JSON.stringify(cooking_level)
        }};

      fetch(`http://localhost:9000/`, options)
        // turn api response into json
        .then((res) => res.json())
        .then((result) => {
            // response from api is loaded
            setIsLoaded(true);
            console.log(result)
            // assign results from api to recipes array (using react useState function)
            setRecipes(result.rows);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, []);

  const onLogOut = () => {
    localStorage.removeItem("userId")
    historyHook.push("/")
  }

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
        <h3>Points: </h3>
        <h3>Username: </h3>
        <button onClick={onLogOut}>Log Out</button>

        {/* inserting RecipeList component, it is child component and passsing recipes as props */}
        <RecipeList recipes={recipes} />
      </div>
    );
  }
}

export default Home;
