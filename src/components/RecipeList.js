import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddPoints from './levelUp'

// this is a function(component) which takes one argument-->props=properties (array of recipes)
function RecipeList({recipes}) {
  // console.log(recipes)

  //changing the users points in the database, possibly the level too 🙀  
  function AddPoints() {
  
    let currentPoints = parseInt(localStorage.getItem("points"))

    let addPoints = currentPoints + 50
  
    const data = {
      points: addPoints,
      userId: localStorage.getItem("userId")
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
          console.log(result.errors)
        }

          // store their cooking level & points back in local storage
          localStorage.setItem("cookingLevel", result.data.level)
          localStorage.setItem("points", result.data.points)
          console.log("result of fetch request to change points/level:")
          console.log(result)
        })
        .catch((err) => {
          console.log(err);
        });

  }
  ////////////



  const clickRecipe =  async (e) => {
    e.preventDefault();

    const recipe_id = parseInt(e.currentTarget.value)

    try {
      const recipeSteps = await fetch(
        `http://localhost:9000/recipe?recipe_id=${recipe_id}`,
        {
          method: 'GET',
          headers: { "Content-Type": "application/json",
          // recipe_id: JSON.stringify(recipe_id)
          }
  //
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
      {recipes.map((recipe) => (
         <tr key = {recipe.id.toString()}>
          <td>{recipe.recipe_name}</td>
          <td><button value={recipe.recipe_id} onClick={clickRecipe}>Show</button></td>
          <td><button value={recipe.recipe_id} onClick={AddPoints}>Mark as complete</button></td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

// export recipeList component so that can be imported in other places
export default RecipeList;
