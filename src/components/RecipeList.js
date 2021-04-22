import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// this is a function(component) which takes one argument-->props=properties (array of recipes)
function RecipeList({ recipes, onRecipeCompleted }) {
  const [points, updatePoints] = useState(0);

  //changing the users points in the database, possibly the level too 🙀
  function CompletedRecipe(recipeId, recipe_api_id) {
    let currentPoints = parseInt(localStorage.getItem("points"));

    const data = {
      points: currentPoints,
      userId: localStorage.getItem("userId"),
      recipeId: parseInt(recipeId),
      recipeApiId: recipe_api_id,
      cookingLevel: localStorage.getItem("cookingLevel")
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:9000", options)
      // turn api response into json
      .then((res) => res.json())
      .then((result) => {
        if (result.errors) {
          // do something about errors
          // setErrors(result.errors);
          // return;
          console.log(result.errors);
        }
        console.log(result);
        // store their cooking level & points back in local storage
        //localStorage.setItem("cookinglevel", result.data.cooking_level)
        localStorage.setItem("points", result.points);

        onRecipeCompleted({
          recipes: {
            ...recipes,
            completed: result.completed_recipes_array,
          },
          points: result.points
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // what recipes has the current user completed ? what are their ids ?
  // const completedRecipeIds = [ ... ]
  // recipes.filter((recipe) => completedRecipeIds.includes(recipe.id)).map((recipe)

  return (
    <table>
      <thead>
        <tr>
          <th>Recipes</th>
          <th>Train</th>
        </tr>
      </thead>
      <tbody>
        {recipes &&
          recipes.recipes &&
          recipes.recipes.map((recipe) => (
            <tr key={recipe.id.toString()}>
              <td>{recipe.id}</td>
              <td>{recipe.recipe_name}</td>
              <td>
                <Link to={`/recipe/${recipe.recipe_id}`}> Show</Link>
                {recipes.completed.includes(recipe.recipe_id) ? (
                  <td> Completed! </td>
                ) : (
                  <td>
                    <button
                      value={recipe.recipe_id}
                      onClick={() =>
                        CompletedRecipe(recipe.id, recipe.recipe_id)
                      }
                    >
                      Mark as complete
                    </button>
                  </td>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

// export recipeList component so that can be imported in other places
export default RecipeList;
