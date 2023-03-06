let res = document.getElementById("result");
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
let getInfo = () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    res.innerHTML = `<h2 class="msg">The input field cannot be empty</h2>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("user-inp").value = "";
        console.log(data);
        console.log(data.drinks[0]);
        let myDrink = data.drinks[0];
        console.log(myDrink.strDrink);
        console.log(myDrink.strDrinkThumb);
        console.log(myDrink.strInstructions);
        let j = 1;
        let igd = [];
        for (let i in myDrink) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myDrink[i]) 
          {
            ingredient = myDrink[i];
            if (myDrink[`strMeasure` + j]) {
              measure = myDrink[`strMeasure` + j];
            } else {
              measure = "";
            }
            j += 1;
            igd.push(`${measure} ${ingredient}`);
          }
        }
        document.body.style.backgroundImage=myDrink.strDrinkthumb;
        console.log(igd);
        res.innerHTML = `
        <h2>${myDrink.strDrink}</h2>
        <img src=${myDrink.strDrinkThumb}>
        <h2>Ingredients:</h2>
        <ul class="ingredients"></ul>
        <h2>Instructions:</h2>
        <p>${myDrink.strInstructions}</p>
        `;
        let ingcon = document.querySelector(".ingredients");
        igd.forEach((item) => {
          let listItem = document.createElement("li");
          listItem.innerText = item;
          ingcon.appendChild(listItem);
        });
      })
      .catch(() => {
        res.innerHTML = `<p class="not found">no cocktail found in that name .please try again</p>`;
      });
      document.body.style.backgroundImage=myDrink.strDrinkthumb;
  }
};
let searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", getInfo);
document.body.style.backgroundImage=myDrink.strDrinkthumb;
