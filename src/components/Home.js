import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const authorized = localStorage.getItem("userId")
  const historyHook = useHistory()
  const user_level = 2; // to be replace with localStorage.getItem

  useEffect(() => {
    if (authorized) {
      
      const options = { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          level: JSON.stringify(user_level)
        }};

      fetch(`http://localhost:9000/`, options).then((res) => res.json()).then((result) => {
            setIsLoaded(true);
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
        

        {/* inserting RecipeList component, it is child component and passsing recipes as props */}
        <RecipeList recipes={recipes} />

        <button onClick={onLogOut}>Log Out</button>
      </div>
    );
  }
}

export default Home;
