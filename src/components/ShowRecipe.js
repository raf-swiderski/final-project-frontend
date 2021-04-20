import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const clickRecipe =  async e => {
  e.preventDefault();
  try {
    const recipeSteps = await fetch(
      `http://localhost:9000/recipe`,
      {
        method: 'GET',
        headers: { "Content-Type": "application/json",
        // recipe_id: JSON.stringify(recipe_id) 
      }

      }
    )
  } catch (err) {
    console.error(err.message)
  }
}

export default clickRecipe;