import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// this is a function(component) which takes one argument-->props=properties (array of recipes)
function RecipeList({recipes}) {
  // console.log(recipes)

  //changing the users points in the database, possibly the level too 🙀  
  function AddPoints() {
  
    let currentPoints = parseInt(localStorage.getItem("points"))
  
    const data = {
      points: currentPoints,
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
          console.log("this is the response from the backend")
          console.log(result)
          // store their cooking level & points back in local storage
          //localStorage.setItem("cookinglevel", result.data.cooking_level)
          localStorage.setItem("points", result.points)
          
        })
        .catch((err) => {
          console.log(err);
        });

  }

  // what recipes has the current user completed ? what are their ids ?
  // const completedRecipeIds = [ ... ]
  // recipes.filter((recipe) => completedRecipeIds.includes(recipe.id)).map((recipe) 

  return (
    // <div className="tablediv">
      <table> 
      {/* // <className="table"> */}
      <thead>
        <tr>
          <th></th>
          <th>Recipes</th>
          <th className="train">Train</th>
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

              <Link to={`/recipe/${recipe.recipe_id}`} className="btn btn-primary href"> Show</Link>

              <Link to={`/recipe/${recipe.recipe_id}`}>Show</Link>
              <td><button value={recipe.recipe_id} onClick={AddPoints}>Mark as complete</button></td>
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
