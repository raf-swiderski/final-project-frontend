import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// this is a function(component) which takes one argument-->props=properties (array of recipes)
function RecipeList({ recipes }) {
  return (
    // <div className="tablediv">
      <table> 
      {/* // <className="table"> */}
      <thead>
        <tr>
          <th></th>
          <th>Recipes</th>
          <th className="train">Train</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe) => (
          <tr key={recipe.id.toString()}>
            <td>{recipe.id}</td>
            <td>{recipe.recipe_name}</td>
            <td>
              <Link to={`/recipe/${recipe.recipe_id}`} className="btn btn-primary href"> Show</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    // </div>
  );
}

// export recipeList component so that can be imported in other places
export default RecipeList;
