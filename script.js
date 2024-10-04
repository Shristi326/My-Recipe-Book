const originalRecipes = []; 
document.getElementById('add-recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const ingredients = document.getElementById('ingredients').value; // Capture ingredients
    const image = document.getElementById('image').files[0];

    if (!image) {
        alert('Please select an image.');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = function() {
        const recipeList = document.getElementById('recipe-list');
        
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-item'); 
        
        const article = document.createElement('article');
        article.setAttribute('data-category', category);
    
      
        article.innerHTML = `
            <h1 class="recipe-title">${title}</h1> <!-- Added class for styling -->
            <img src="${reader.result}" alt="${title}">
            <p class="center-text"><strong>Category:</strong> ${category}</p>
            <br>
            <p class="center-text"><strong>Ingredients:</strong> ${ingredients}</p>
            <br>
            <p class="center-text">${description}</p>
        `;
    
        recipeDiv.appendChild(article);
        recipeList.appendChild(recipeDiv);

       
        originalRecipes.push({ title, description, category, ingredients, image: reader.result });
    };  

    reader.readAsDataURL(image); 

    document.getElementById('add-recipe-form').reset();
});

function filterRecipes() {
    const filterInput = document.getElementById('filter').value.toLowerCase();
    const recipeList = document.getElementById('recipe-list');
    
    recipeList.innerHTML = '';

    originalRecipes.forEach(recipe => {
        if (recipe.category.toLowerCase().includes(filterInput)) {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe-item');
        
            const article = document.createElement('article');
            article.setAttribute('data-category', recipe.category);
            article.innerHTML = `
                <h1 class="recipe-title">${recipe.title}</h1> 
                <img src="${recipe.image}" alt="${recipe.title}">
                <br>
                <p class="center-text"><strong>Category:</strong> ${recipe.category}</p>
                <br>
                <p class="center-text"><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <br>
                <p class="center-text">${recipe.description}</p>
            `;
        
            recipeDiv.appendChild(article);
            recipeList.appendChild(recipeDiv);
        }
    });
}
