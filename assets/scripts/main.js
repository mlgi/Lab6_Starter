// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  'assets/recipes/gyudon.json',
  'assets/recipes/chicken_tortilla_soup.json',
  'assets/recipes/chicken_n_dumplings.json'
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {};

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };
  // Add the first three recipe cards to the page
  createRecipeCards();
  // Make the "Show more" button functional
  bindShowMore();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    // This function is called for you up above
    // From this function, you are going to fetch each of the recipes in the 'recipes' array above.
    // Once you have that data, store it in the 'recipeData' object. You can use whatever you like
    // for the keys. Once everything in the array has been successfully fetched, call the resolve(true)
    // callback function to resolve this promise. If there's any error fetching any of the items, call
    // the reject(false) function.

    let promises = []; // keep track of each promise we make fetching the urls

    recipes.forEach(url => {
      // add each fetch promise to the array
      promises.push(
        fetch(url)
          // catch any errors in fetching (network connection)
          .catch(error => { 
            console.log(error);
            reject();
          })
          // check if we get a proper response (still resolves even with 404)
          .then(response => { 
            if (!response.ok) {
              console.log('response not 200')
              reject();
            } 
            return response.json();
          })
          // add the data (we'll process it later) 
          .then(data => {
            //console.log(data);
            recipeData[url] = {
              data: data,
              card: null
            };
          })
      );
    });

    // resolve once all promises are resolved
    Promise.all(promises)
      .then(() => resolve(true))
      .catch((error)=> {
        console.log(error);
        reject();
      });

    // For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
    // in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.

    // Part 1 Expose - TODO
  });
}

function createRecipeCards() {
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  // Part 1 Expose - TODO
  const main = document.querySelector('main');
  for (let i = 0; i < 3; i++) {
    let recipeInfo = recipeData[recipes[i]].data;
    const newCard = document.createElement('recipe-card');
    newCard.data = recipeInfo;

    recipeData[recipes[i]].card = newCard;
    main.appendChild(newCard);
  }
}

function toggleMoreCards(event) {
  const arrow = document.querySelector('#button-wrapper > img');
  const button = document.querySelector('button');
  const main = document.querySelector('main');

  if (button.textContent == "Show more") { 
    // go through each recipe url
    recipes.forEach(url => {
      // if card doesn't exist for the url
      if (!recipeData[url].card) { 
        // make a new card
        const newCard = document.createElement('recipe-card');
        newCard.data = recipeData[url].data;
        
        recipeData[url].card = newCard;
        main.appendChild(newCard);
      } else { // if the card already exists
        // we just unhide it
        recipeData[url].card.removeAttribute('hidden');
      }
    });
    arrow.hidden = true;
    button.textContent = "Show less";
  } else {
    // hide all but first three
    for (let i = 3; i < recipes.length; i++) {
      let url = recipes[i];
      recipeData[url].card.setAttribute('hidden',true);
    }
    arrow.hidden = false;
    button.textContent = "Show more";
  }
}

function bindShowMore() {
  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/

  // Part 2 Explore - TODO
  const button = document.getElementById('button-wrapper');

  button.addEventListener('click', toggleMoreCards);
}