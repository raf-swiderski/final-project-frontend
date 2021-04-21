import React, { useState, useEffect } from "react";
import Parse from "html-react-parser";

function RecipePage(props) {
  const { id } = props.match.params;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipe, setRecipe] = useState({});
  // const [summary, setSummary] = useState("");
  // const [instructions, setInstructions] = useState("");

  useEffect(() => {
    fetch(`http://localhost:9000/recipe?recipe_id=${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
          setRecipe(result);
          // setSummary(result.summary);
          // setInstructions(result.instructions);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>{recipe.title} Detailed Instruction</h1>
        <img alt={recipe.title} src={recipe.image} />
        {/* response is HTML so we need to parse it */}
        {/* this is saying that at the time this was rendered, recipe.summary doesn't exist*/}
        <p>{Parse(recipe.summary || "")}</p>
        <p>{Parse(recipe.instructions || "")}</p>
      </div>
    );
  }
}

export default RecipePage;
