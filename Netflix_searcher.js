// fetch request to API
// create an interactive search bar which sends request to yelp
const searchBar = document.getElementById("search-form");
const input = document.getElementById("search-input");
const page = document.getElementById("page");

searchBar.addEventListener("submit", (event) => {
  // if (event.code === "Enter") {
  //   // make ajax request
    event.preventDefault();
    const searchTerm = input.value;
    console.log(searchTerm);
    getRequest(searchTerm);
});

function getRequest(searchTerm) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "54e55a9549mshf6808e45c16656cp1df1e6jsna81eea57228f",
      "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
    },
  };

  fetch(
    `https://ott-details.p.rapidapi.com/advancedsearch?q=${searchTerm}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let counter = 0;
      const page = document.querySelector("#page");
      // if (data && data.length > 0) {
        
        const dataArray = data.results;
        const randomItems = getRandomItems(data.results, 5)
        for (let i = 0; i < randomItems.length; i++){
        // dataArray.forEach((item) => {
          const item = randomItems[i];

          if (counter === 5) break;
          if (item.title && counter < 5) {
            
            const fetchedTitle = document.createElement('li');
            const fetchedYear = document.createElement('p');
            const fetchedSynopsis = document.createElement('p');
            // const fetchedImage = document.createElement('img');
            
            fetchedYear.innerText = `Release Year: ${item.released}`;
            fetchedTitle.innerText = `Title: ${item.title}`;
            fetchedSynopsis.innerText = `Synopsis: ${item.synopsis}`;
            // fetchedImage.src = item.imageurl;


            page.appendChild(fetchedTitle);
            page.appendChild(fetchedYear);
            page.appendChild(fetchedSynopsis)
            // page.appendChild(fetchedImage);
            counter++;
          } 
          else {
            const noResults = document.createElement("div");
            noResults.innerText = "No results found";
            page.appendChild(noResults);
          }
        }
    })
    .catch((error) => {
      console.error(error);
    });
}

function getRandomItems(items, count) {
  const randomItems = [];
  const itemCount = Math.min(count, items.length);
  while (randomItems.length < itemCount) {
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomItem = items[randomIndex];
    if (randomItems.indexOf(randomItem) === -1) {
      randomItems.push(randomItem);
    }
  }
  return randomItems;
}


//     console.log("data:", data);
