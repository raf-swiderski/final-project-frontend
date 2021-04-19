// this is a function(component) which takes one argument-->props=properties (array of recipes)
function RecipeList(props) {
  return (
    <div>
      {props.recipes.map((recipe) => (
        <Recipe
          key={recipe.id.toString()}
          title={recipe.title}
          image={recipe.image}
        />
      ))}
    </div>
  );
}

function Recipe(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <img alt={props.title} src={props.image} />
    </div>
  );
}

// export recipeList component so that can be imported in other places
export default RecipeList;
