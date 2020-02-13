var ingredientArray = [];
var ingredient;
var queryURL = "https://api.edamam.com/search?q=" + ingredient + "&app_id=4774b501&app_key=e1a8ea5f7cdb69019154dae735be3a85&health=vegetarian&to=18"

function getRecipe(){
    queryURL = "https://api.edamam.com/search?q=" + ingredient + "&app_id=4774b501&app_key=e1a8ea5f7cdb69019154dae735be3a85&health=vegetarian&to=18";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(res){
        console.log(res);
        for (i=0;i < res.hits.length;i++){
            var newRecipeItem = $("<div class='wrapper col m4 s12 card small'><div class='card-image waves-effect waves-block waves-light'><img class='activator' src='" + res.hits[i].recipe.image + "'></div><div class='card-content'><span class='card-title activator grey-text text-darken-4'>" + res.hits[i].recipe.label + "<i class='material-icons right'>more_vert</i></span><p><a href='" + res.hits[i].recipe.url + "'>Click here for Recipe</a></p></div><div class='card-reveal'><span class='card-title grey-text text-darken-4'>" + res.hits[i].recipe.label + "<i class='material-icons right'>close</i></span><h6>What you will need:</h6><ul id='recipeIngredients" + i + "'></ul></div></div>");
            
            $("#recipeList").append(newRecipeItem);
        }
})};
function getRecipeIngredients(){
  queryURL = "https://api.edamam.com/search?q=" + ingredient + "&app_id=4774b501&app_key=e1a8ea5f7cdb69019154dae735be3a85&health=vegetarian&to=18";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(res){
        var recipes = res.hits;
  for (i=0;i<recipes.length;i++){
    for (j=0;j<recipes[i].recipe.ingredientLines.length;j++){
      var ingredientList = recipes[i].recipe.ingredientLines[j];
      var recipeIngredientItem = $("<li>");
      recipeIngredientItem.append(ingredientList);
      $("#recipeIngredients"+i).append(recipeIngredientItem);
    };
  }});
}
// function addIngredient(){
//     var newIngredient = $("<button type='button' id='" + ingredient + "' class='citybutton collection-item active'>" + ingredient + "</button>");
//     $("#ingredientList").prepend(newIngredient);
//   };
function clearList(){
    $("#recipeList").empty();
}
$(document).on("click", ".citybutton", function() {
    clearList();
    ingredient = $(this).text();
    getRecipe();
  });

$("#searchButton").on("click", function(e){
    event.preventDefault();
    clearList();
    ingredient = $("#ingredientInput").val();
    getRecipe();
    getRecipeIngredients()
    // addIngredient();
  });
  