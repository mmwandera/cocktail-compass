document.addEventListener('DOMContentLoaded' , function(){
    // DOM elements
    const popularDrinksList = document.getElementById('popular-cocktail-list');
    const latestDrinksList = document.getElementById('latest-cocktail-list');
    const drinkDetails = document.querySelector('.right');
    const cocktailRoulette = document.querySelector('.randomize-button');
    const searchInput = document.querySelector('input[type="text"]');
    const searchButton = document.querySelector('button');
    const searchResults = document.querySelector('#results');

    // Function to display drink details on the right side
    function fetchAndDisplayDrinkDetails(id) {
        // Fetch drink details from the API
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => response.json())
            .then(data => {
    
                // console.log(data.drinks[0]);
                // Construct the HTML for drink details
                // Including name, image, ingredients, instructions, and glass type
                // Append the HTML to the 'drinkDetails' div
                // Display an error message if there's an issue with the API
                let ingredientsList = '';
    
                for (let i = 1; i <= 15; i++) {
                    const ingredientKey = 'strIngredient' + i;
                    const measureKey = 'strMeasure' + i;
    
                    if (data.drinks[0][ingredientKey] !== null && data.drinks[0][ingredientKey] !== '') {
                        ingredientsList += `<li>${data.drinks[0][ingredientKey]}</li>`;
                    }
                }
    
                drinkDetails.innerHTML =
                    `
                    <h2 class="cocktail-name">${data.drinks[0].strDrink}</h2>
                    <div class="cocktail-image">
                        <!-- Image of the cocktail -->
                        <img src="${data.drinks[0].strDrinkThumb}" style ="height:300px; width=300px; object-fit: contain; " />
                    </div>
                    <h3 class="ingredients-heading">Ingredients</h3>
                    <div class="ingredients">
                        <!-- Ingredient cards appended dynamically -->
                        <ul>
                            ${ingredientsList}
                        </ul>
                    </div>
                    <h3 class="instructions-heading">Instructions</h3>
                    <p class="instructions-text">
                        <!-- Instructions fetched from the server -->
                        ${data.drinks[0].strInstructions}
                    </p>
                    <h3 class="glass-heading">Glass</h3>
                    <p class="glass-text">
                        <!-- Glass fetched from the server -->
                        ${data.drinks[0].strGlass}
                    </p>
                    `;

            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    
    }
    
    // displays initial drink
    fetchAndDisplayDrinkDetails(17241);
    
    // Function to fetch and append popular drinks to the list
    // Also adds click event listener to display details when clicked
    // Uses an array of drink IDs to fetch data
    // Display an error message if there's an issue with the API
    // Replace the '11000' and other IDs with your desired IDs
    // Adjust the 'popularDrinksList' and 'latestDrinksList' IDs accordingly
    // Adjust the API endpoint based on your requirements
    // Add error handling for the fetch request
    function fetchPopularDrinkList(idArray){
        idArray.forEach(function(id){
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
                .then(response => response.json())
                .then(data => {
            
                // console.log(data.drinks[0])
                // console.log(data.drinks[0].idDrink)
                // console.log(data.drinks[0].strDrink)

                const li = document.createElement('li');
                li.textContent = data.drinks[0].strDrink;
                popularDrinksList.appendChild(li);

                let currentId = data.drinks[0].idDrink
                li.addEventListener('click', () =>{
                    fetchAndDisplayDrinkDetails(currentId)
                })
            })
            .catch(error => console.log('Error fetching data:', error));

            })

    }

    const popularDrinksIdArray = [11000,11001,11002,11003,11004,11005,11006,11007]
    fetchPopularDrinkList(popularDrinksIdArray)

    // Function to fetch and append latest drinks to the list
    // Also adds click event listener to display details when clicked
    // Uses an array of drink IDs to fetch data
    // Display an error message if there's an issue with the API
    // Replace the '178370' and other IDs with your desired IDs
    // Adjust the 'popularDrinksList' and 'latestDrinksList' IDs accordingly
    // Adjust the API endpoint based on your requirements
    // Add error handling for the fetch request
    function fetchLatestDrinkList(idArray){
        idArray.forEach(function(id){
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
                .then(response => response.json())
                .then(data => {
                
                // console.log(data.drinks[0])
                // console.log(data.drinks[0].idDrink)
                // console.log(data.drinks[0].strDrink)

                const li = document.createElement('li');
                li.textContent = data.drinks[0].strDrink
                latestDrinksList.appendChild(li);

                let currentId = data.drinks[0].idDrink
                li.addEventListener('click', () =>{
                    fetchAndDisplayDrinkDetails(currentId)
                })
            })
            .catch(error => console.log('Error fetching data:', error));

            })

    }

    const latestDrinksIdArray = [178370,178369,17191,178367,178366,178365,178364,178363]
    fetchLatestDrinkList(latestDrinksIdArray)

    // Functionality for the cocktail roulette feature
    // Fetches a random cocktail from the API
    // Constructs the HTML for the random drink details
    // Display an error message if there's an issue with the API
    // Add error handling for the fetch request
    cocktailRoulette.addEventListener('click', () => {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(response => response.json())
            .then(data => {

                // console.log(data);

                let ingredientsList = '';
    
                for (let i = 1; i <= 15; i++) {
                    const ingredientKey = 'strIngredient' + i;
                    const measureKey = 'strMeasure' + i;
    
                    if (data.drinks[0][ingredientKey] !== null && data.drinks[0][ingredientKey] !== '') {
                        ingredientsList += `<li>${data.drinks[0][ingredientKey]}</li>`;
                    }
                }
    
                drinkDetails.innerHTML =
                    `
                    <h2 class="cocktail-name">${data.drinks[0].strDrink}</h2>
                    <div class="cocktail-image">
                        <!-- Image of the cocktail -->
                        <img src="${data.drinks[0].strDrinkThumb}" style ="height:300px; width=300px" />
                    </div>
                    <h3 class="ingredients-heading">Ingredients</h3>
                    <div class="ingredients">
                        <!-- Ingredient cards appended dynamically -->
                        <ul>
                            ${ingredientsList}
                        </ul>
                    </div>
                    <h3 class="instructions-heading">Instructions</h3>
                    <p class="instructions-text">
                        <!-- Instructions fetched from the server -->
                        ${data.drinks[0].strInstructions}
                    </p>
                    <h3 class="glass-heading">Glass</h3>
                    <p class="glass-text">
                        <!-- Glass fetched from the server -->
                        ${data.drinks[0].strGlass}
                    </p>
                    `;
            })
            .catch(error => console.error('Error fetching data:', error));
    });

    // Functionality for the search button
    // Fetches the cocktails based on the user's input
    // Clears the previous search results
    // Displays the search results with their respective IDs
    // Display an error message if there's an issue with the API
    // Add error handling for the fetch request
    searchButton.addEventListener('click', () => {
        const cocktailName = searchInput.value;
        searchResults.innerHTML = ''; // Clear the existing search results

        if (cocktailName === '') {
            alert('Please enter a cocktail name');
            return;
        }

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
            .then(response => response.json())
            .then(data => {
                if (data.drinks === null) {
                    const noResults = document.createElement('p');
                    noResults.textContent = `No results for "${cocktailName}"`;
                    searchResults.appendChild(noResults);
                } else {
                    const searchHeading = document.createElement('p');
                    searchHeading.textContent = `Search results for "${cocktailName}"`;
                    searchResults.appendChild(searchHeading);

                    data.drinks.forEach(drink => {
                        const li = document.createElement('li');
                        li.textContent = drink.strDrink;
                        searchResults.appendChild(li);

                        let currentId = drink.idDrink;
                        li.addEventListener('click', () => {
                            fetchAndDisplayDrinkDetails(currentId);
                        });
                    });
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    });

    
})
   
