// Base recipe ingredients for 36 cookies
const baseRecipe = {
    butter: { amount: 1, unit: "cup", text: "salted butter softened" },
    sugar: { amount: 1, unit: "cup", text: "granulated sugar" },
    brownSugar: { amount: 1, unit: "cup", text: "light brown sugar packed" },
    vanilla: { amount: 2, unit: "teaspoons", text: "pure vanilla extract" },
    eggs: { amount: 2, unit: "large", text: "eggs" },
    flour: { amount: 3, unit: "cups", text: "all-purpose flour" },
    bakingSoda: { amount: 1, unit: "teaspoon", text: "baking soda" },
    bakingPowder: { amount: 0.5, unit: "teaspoon", text: "baking powder" },
    salt: { amount: 1, unit: "teaspoon", text: "sea salt" },
    chocolateChips: { amount: 2, unit: "cups", text: "chocolate chips (12 oz)" }
};

function formatAmount(amount) {
    if (Number.isInteger(amount)) {
        return amount.toString();
    }

    // Convert decimal to fraction for common measurements
    const fractions = {
        0.25: "¼",
        0.33: "⅓",
        0.5: "½",
        0.66: "⅔",
        0.75: "¾"
    };

    const whole = Math.floor(amount);
    const decimal = amount - whole;

    // Check if decimal is close to a common fraction
    for (let [dec, fraction] of Object.entries(fractions)) {
        if (Math.abs(decimal - parseFloat(dec)) < 0.05) {
            return whole > 0 ? `${whole}${fraction}` : fraction;
        }
    }

    // Round to 2 decimal places if no fraction match
    return amount.toFixed(2).replace(/\.?0+$/, '');
}

function updateIngredients(cookieCount) {
    const ratio = cookieCount / 36;
    const ingredientsList = document.getElementById('ingredients-list');

    ingredientsList.innerHTML = '';

    const ingredients = [
        { ...baseRecipe.butter, id: 'butter' },
        { ...baseRecipe.sugar, id: 'sugar' },
        { ...baseRecipe.brownSugar, id: 'brownSugar' },
        { ...baseRecipe.vanilla, id: 'vanilla' },
        { ...baseRecipe.eggs, id: 'eggs' },
        { ...baseRecipe.flour, id: 'flour' },
        { ...baseRecipe.bakingSoda, id: 'bakingSoda' },
        { ...baseRecipe.bakingPowder, id: 'bakingPowder' },
        { ...baseRecipe.salt, id: 'salt' },
        { ...baseRecipe.chocolateChips, id: 'chocolateChips' }
    ];

    ingredients.forEach((ingredient, index) => {
        const adjustedAmount = ingredient.amount * ratio;
        const formattedAmount = formatAmount(adjustedAmount);
        const itemId = `ingredient${index + 1}`;

        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `
            <input type="checkbox" class="item-checkbox" id="${itemId}">
            <label for="${itemId}" class="item-label">
                <span class="ingredient-amount">${formattedAmount}</span> 
                <span class="ingredient-unit">${ingredient.unit}</span> 
                <span class="ingredient-text">${ingredient.text}</span>
            </label>
        `;

        ingredientsList.appendChild(li);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const cookieCountInput = document.getElementById('cookie-count');
    const decreaseBtn = document.getElementById('decrease-btn');
    const increaseBtn = document.getElementById('increase-btn');

    // Initial update
    updateIngredients(36);

    cookieCountInput.addEventListener('input', (e) => {
        let value = parseInt(e.target.value) || 36;
        value = Math.max(1, value);
        e.target.value = value;
        updateIngredients(value);
    });

    decreaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(cookieCountInput.value) || 36;
        let newValue = Math.max(1, currentValue - 1);
        cookieCountInput.value = newValue;
        updateIngredients(newValue);
    });

    increaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(cookieCountInput.value) || 36;
        let newValue = currentValue + 1;
        cookieCountInput.value = newValue;
        updateIngredients(newValue);
    });
});