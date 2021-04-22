import React, { useState, useEffect } from "react";
import Parse from "html-react-parser";
// import '../fontawesome.js';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOctopusDeploy } from '@fortawesome/free-brands-svg-icons'
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


function RecipePage(props) {
  const { id } = props.match.params;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipe, setRecipe] = useState({});

  // const [summary, setSummary] = useState("");
  // const [instructions, setInstructions] = useState("");
  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
  };
  const cooking_level = parseInt(localStorage.getItem("cookingLevel"));
  const points = parseInt(localStorage.getItem("points"));
  const username = localStorage.getItem("username");
  const historyHook = useHistory();

 const onLogOut = () => {
    localStorage.clear();
    historyHook.push("/");
  };

  useEffect(() => {
    fetch(`http://localhost:9000/recipe?recipe_id=${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setRecipe(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (    
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="btn btn-outline-light" to="/home"><FontAwesomeIcon icon={faOctopusDeploy } size='2x'/>CookWars</Link>
            <form class="container-fluid justify-content-end">
              <p className="btn btn-outline-light">Username: {username}</p>
              <p className="btn btn-outline-light"> Cooking Level: {cooking_level} </p>
              <p className="btn btn-outline-light"> Points: {points} </p>
              <button className="btn btn-outline-light" onClick={onLogOut}>Log Out</button>
            </form>
          </div>
        </nav>
      
   
        <div class="recipe scroll">
          <div class="title">
            <h1>{recipe.title} </h1>
          </div>
          <div class="container">
            <img alt={recipe.title} src={recipe.image} className="stretchy"/>
          </div>
          {/* response is HTML so we need to parse it */}
          {/* this is saying that at the time this was rendered, recipe.summary doesn't exist*/}
          <div class="summary">
            <p>{Parse(recipe.summary || "")}</p>
          </div>
          <p>{Parse(recipe.instructions || "")}</p>

        </div>
        
      
      
      <div id="floating">
        <div id="sidebar">
          {recipe.extendedIngredients.map((ingredient, index) => {
            return <div key={index}>{ingredient.original}</div>;
          })}
        </div>
      </div>
   </div> 
   );
  }
  }
 

export default RecipePage;
