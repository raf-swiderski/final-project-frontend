import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// this is a function(component) which takes one argument-->props=properties (array of recipes)
function RecipeList({recipes}) {
  console.log(recipes)

  const clickRecipe =  async (e) => {
    // e.preventDefault();

    const recipe_id = parseInt(e.currentTarget.value)

    try {
      const data = await fetch(
        `http://localhost:9000/recipe?recipe_id=${recipe_id}`,
        {
          method: 'GET',
          headers: { "Content-Type": "application/json",
          }
        }
      ) 
    const recipeData = await data.json();
    console.log(recipeData[0].steps) // this is my recipe steps array!
    const recipeSteps = recipeData[0].steps;
    } catch (err) {
      console.error(err.message)
    }
    //redirect
  }
  
  return (
      <table>
         <thead>
          <tr>
            <th>Recipes</th>
            <th>Train</th>
          </tr>
        </thead>
      <tbody>
      {recipes.map((recipe) => (
         <tr key = {recipe.id.toString()}>
          <td>{recipe.id}</td>
          <td>{recipe.recipe_name}</td>
          <td><Link to={`/recipe/${recipe.id}`}>
            <button value={recipe.id} onClick={clickRecipe}>
              Show
            </button>
          </Link></td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

// export recipeList component so that can be imported in other places
export default RecipeList;


