import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// this is a function(component) which takes one argument-->props=properties (array of recipes)
function RecipeList(props) {
  return (
    <div>
      {props.recipes.map((recipe) => (
        <Recipe
          key={recipe.id.toString()}
          title={recipe.recipe_name}
          databaseId={recipe.recipe_id}
        />
      ))}
    </div>
  );
}

function Recipe(props) {
  return (
    <div>
      <a href="">{props.title}</a>
      <button>Train</button>
    </div>
  );

  // const clickRecipe =  async e => {
  //   e.preventDefault();
  //   try {
  //     const recipeSteps = await fetch(
  //       `http://localhost:9000/${databaseId}`,
  //       {
  //         method: 'GET',
  //         headers: { "Content-Type": "application/json",
  //         recipe_id: JSON.stringify(user_level) 
  //       }

  //       }
  //     )
  //   } catch (error) {
  //     console.error(err.message)
  //   }
  // }
}





// export recipeList component so that can be imported in other places
export default RecipeList;


