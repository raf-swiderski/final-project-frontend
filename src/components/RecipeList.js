import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// this is a function(component) which takes one argument-->props=properties (array of recipes)
function RecipeList(props) {
  console.log(props)
  const recipe_id = props.recipes.recipe_id

  const clickRecipe =  async e => {
    e.preventDefault();
    try {
      const recipeSteps = await fetch(
        `http://localhost:9000/recipe`,
        {
          method: 'GET',
          headers: { "Content-Type": "application/json",
          recipe_id: JSON.stringify(recipe_id) 
          }
  
        }
      )
    } catch (err) {
      console.error(err.message)
    }
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
      {props.recipes.map((recipe) => (
         <tr key = {recipe.id.toString()}>
          <td>{recipe.recipe_name}</td>
          <td><button onClick={clickRecipe}>Show</button></td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

// export recipeList component so that can be imported in other places
export default RecipeList;


