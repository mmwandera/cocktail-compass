document.addEventListener('DOMContentLoaded' , function(){
    const popularDrinksList = document.getElementById('popular-cocktail-list');
    const latestDrinksList = document.getElementById('latest-cocktail-list');
    const drinkDetails = document.querySelector('.right');


    let currentDrinkId = 1;

    function fetchAndDisplayDrinkDetails(id) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => response.json())
            .then(data => {
    
                // console.log(data.drinks[0]);
    
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
                        <img src="${data.drinks[0].strDrinkThumb}" style="height:300px; width=300px" />
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
                        <p>${data.drinks[0].strInstructions}</p>
                    </p>
                    <h3 class="glass-heading">Glass</h3>
                    <p class="glass-text">
                        <!-- Glass fetched from the server -->
                        <p>${data.drinks[0].strGlass}</p>
                    </p>
                    `;
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    
    }
    
    // display initial drink
    fetchAndDisplayDrinkDetails(17188);
    

    
    function fetchPopularDrinkList(idArray){
        idArray.forEach(function(id){
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
                .then(response => response.json())
                .then(data => {
            
                // console.log(data.drinks[0])
                // console.log(data.drinks[0].idDrink)
                // console.log(data.drinks[0].strDrink)

                const li = document.createElement('li');
                li.textContent = data.drinks[0].strDrink
                popularDrinksList.appendChild(li);
            })
            .catch(error => console.log('Error fetching data:', error));

            })

    }

    const popularDrinksIdArray = [11000,11001,11002,11003,11004,11005,11006,11007]
    fetchPopularDrinkList(popularDrinksIdArray)


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

                li.addEventListener('click', () => {
                    currentDrinkId = data.drinks[0].drinkId;
                    displayDrinkDetails(currentDrinkId);
                })
            })
            .catch(error => console.log('Error fetching data:', error));

            })

    }

    const latestDrinksIdArray = [178370,178369,17191,178367,178366,178365,178364,178363]
    fetchLatestDrinkList(latestDrinksIdArray)

    // Search functionality
    

})
   
