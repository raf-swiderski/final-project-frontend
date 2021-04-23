import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faEye } from '@fortawesome/free-regular-svg-icons';

// this is a function(component) which takes one argument-->props=properties (array of recipes)
function RecipeList({ recipes, onRecipeCompleted }) {
  const [points, updatePoints] = useState(0);

  //changing the users points in the database, possibly the level too 🙀
  function CompletedRecipe(recipeId, recipe_api_id) {
    let currentPoints = parseInt(localStorage.getItem("points"));
    let currentLevel = localStorage.getItem("cookingLevel")
    const data = {
      points: currentPoints,
      userId: localStorage.getItem("userId"),
      recipeId: parseInt(recipeId),
      recipeApiId: recipe_api_id,
      cookingLevel: currentLevel
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
          points: result.points,
          cooking_level: result.cooking_level
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    
      <div>
        <div>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <h1> Welcome to Cookwars </h1>
          <br/>
        </div>
      


      <table class="table">
        <thead>
          <tr class="bg-red">
            <th className="train">Recipes</th>
            <th className="train">Train</th>
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
                <Link to={`/recipe/${recipe.recipe_id}`} className="btn btn-primary href"> <FontAwesomeIcon icon={faEye} size='1x'/></Link>
                {recipes.completed.includes(recipe.recipe_id) ? (
                  <td><span>&#10003;</span></td>
                ) : (
                  <td>
                    <Link
                      value={recipe.recipe_id}
                      onClick={() =>
                        CompletedRecipe(recipe.id, recipe.recipe_id)
                      } className="btn btn-primary href"><FontAwesomeIcon icon={faCheckSquare} size='1x'/>
                    </Link>
                  </td>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  );
}
// export recipeList component so that can be imported in other places
export default RecipeList;
