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
    </div>
  );
}

// export recipeList component so that can be imported in other places
export default RecipeList;
