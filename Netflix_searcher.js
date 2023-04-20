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

      const page = document.querySelector("#page");
      // if (data && data.length > 0) {
        console.log('test data')
        const dataArray = data.results;
        dataArray.forEach((item) => {
          if (item.title) {
            const fetchedTitle = document.createElement('li');
            fetchedTitle.innerText = `Title: ${item.title}`;
            page.appendChild(fetchedTitle);
          } else {
            const noResults = document.createElement("div");
            noResults.innerText = "No results found";
            page.appendChild(noResults);
          }
        });
    })
    .catch((error) => {
      console.error(error);
    });
}


//     console.log("data:", data);
