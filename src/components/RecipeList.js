import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clickRecipe from './ShowRecipe';

// this is a function(component) which takes one argument-->props=properties (array of recipes)
function RecipeList(props) {
  console.log(props)
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
          <td><button data-target={`${recipe.recipe_id}`}>Train</button></td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}



// export recipeList component so that can be imported in other places
export default RecipeList;


