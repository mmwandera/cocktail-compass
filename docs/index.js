const searchButton = document.querySelector('button'); // Assuming you have a search button
const searchInput = document.querySelector('input[type="text"]'); // Assuming you have a search input

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            // Assuming the data structure is consistent
            const cocktail = data.drinks[0]; // Assuming the first result is the one we want

            // Extract relevant data from the API response
            const cocktailName = cocktail.strDrink;
            const cocktailImage = cocktail.strDrinkThumb;
            const ingredients = []; // Assuming ingredients are stored as strIngredient1, strIngredient2, etc.
            for (let i = 1; i <= 15; i++) {
                if (cocktail[`strIngredient${i}`]) {
                    ingredients.push(cocktail[`strIngredient${i}`]);
                } else {
                    break;
                }
            }
            const instructions = cocktail.strInstructions;

            // Use the data to populate the UI
            // For example, you can populate the cocktail name, image, ingredients, and instructions in your HTML elements
        })
        .catch(error => {
            // Handle any errors from the fetch request
            console.error('Error fetching data:', error);
        });
});
