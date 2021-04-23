import React, { useState, useEffect } from "react";
import Parse from "html-react-parser";
import { Redirect, useHistory } from "react-router-dom";

function RecipePage(props) {
  const { id } = props.match.params;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipe, setRecipe] = useState({});
  const historyHook = useHistory();

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

  const backHome = () => {
    historyHook.push("/home");
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{recipe.title}</h1>
      <img alt={recipe.title} src={recipe.image} />
      <div>
        Ingredients:
        {recipe.extendedIngredients.map((ingredient, index) => {
          return <div key={index}>{ingredient.original}</div>;
        })}
      </div>
      {/* <p>{Parse(recipe.summary || "")}</p> */}
      <div>{Parse(recipe.instructions)}</div>
      <button onClick={backHome}>Back</button>
    </div>
  );
}

export default RecipePage;
