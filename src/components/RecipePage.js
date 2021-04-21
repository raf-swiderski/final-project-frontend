import React, { useState, useEffect } from "react";
import Parse from "html-react-parser";

function RecipePage(props) {
  const { id } = props.match.params;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    fetch(`http://localhost:9000/recipe?recipe_id=${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setRecipe(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{recipe.title} Detailed Instruction</h1>
      <img alt={recipe.title} src={recipe.image} />
      <p>{recipe.extendedIngredients[0].name}</p>
      {/* response is HTML so we need to parse it */}
      {/* this is saying that at the time this was rendered, recipe.summary doesn't exist*/}
      <p>{Parse(recipe.summary || "")}</p>
      <p>{Parse(recipe.instructions || "")}</p>
    </div>
  );
}

export default RecipePage;
