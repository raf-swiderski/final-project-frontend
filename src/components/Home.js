import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import RecipeList from "./RecipeList";

function Home({ authorized }) {
  // setting error to null
  const [error, setError] = useState(null);
  // setting that response from api is not loaded yet
  const [isLoaded, setIsLoaded] = useState(false);
  // setting recipes to an empty array
  const [recipes, setRecipes] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect react hook will run once
  // similar to componentDidMount()
  // useEffect is called automaticly by react after component Home is loaded
  useEffect(() => {
    if (authorized) {
      // fetch recipes from backend api
      // GET is by default, I've added it so we can easily re use it with other Http Verbs (e.g. POST)
      fetch("http://localhost:9000/fetch_recipe", { method: "GET" })
        // turn api response into json
        .then((res) => res.json())
        .then(
          (result) => {
            // response from api is loaded
            setIsLoaded(true);
            // assign results from api to recipes array (using react useState function)
            setRecipes(result.results);
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
        <Link to="/">Log Out</Link>

        {/* inserting RecipeList component, it is child component and passsing recipes as props */}
        <RecipeList recipes={recipes} />
      </div>
    );
  }
}

export default Home;
