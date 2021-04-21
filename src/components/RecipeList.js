import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// this is a function(component) which takes one argument-->props=properties (array of recipes)
function RecipeList({ recipes }) {
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
          <tr key={recipe.id.toString()}>
            <td>{recipe.id}</td>
            <td>{recipe.recipe_name}</td>
            <td>
              <Link to={`/recipe/${recipe.recipe_id}`}>Show</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// export recipeList component so that can be imported in other places
export default RecipeList;
