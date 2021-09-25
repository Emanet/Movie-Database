const main = document.querySelector("main");
const refresh = document.getElementById("main-page");
const poster_image = "https://image.tmdb.org/t/p/w500";
const search = document.getElementById("query");
const best_drama = document.getElementById("drama");
const drama_url =
  "https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=8bb2e98afa0c8bf8a7f179f204190278&language=en";
let popular_movies =
  "https://api.themoviedb.org/3/movie/popular?api_key=8bb2e98afa0c8bf8a7f179f204190278&language=en-US&page=1";
getMovies(popular_movies);
function listMovies(movie) {
  console.log(movie);
  movie.forEach((element) => {
    if (element.poster_path == null) {
      return;
    }
    const allMovies = document.createElement("div");
    allMovies.innerHTML = ` <div id="movie_card">
    <img src="${poster_image + element.poster_path}" alt="">
    <div id="desc"> <p id="movie_name">${element.title}</p>
    <p id="date">${element.release_date.slice(0, -6)}</p>
    <p id="score">${element.vote_average}</p>
    </div>  
  </div>`;
    main.appendChild(allMovies);
  });
}
refresh.addEventListener("click", () => {});
best_drama.addEventListener(
  "click",
  () => {
    let header = document.createElement("h1");
    showList();
    header.id = "drama-header";
    header.innerText = "Best Drama's";
    main.before(header);
    getMovies(drama_url);
  },
  { once: true }
);

search.addEventListener("keypress", (event) => {
  let search_term = event.target.value.toLowerCase();
  let search_url =
    "https://api.themoviedb.org/3/search/movie?api_key=8bb2e98afa0c8bf8a7f179f204190278&language=en-US&query=" +
    search_term +
    "&page=1&include_adult=false";
  showList();
  getMovies(search_url);
  var myobj = document.getElementById("drama-header");
  myobj.remove();
});
function getMovies(url) {
  fetch(url).then(async (response) => {
    const data = await response.json();
    listMovies(data.results);
  });
}
const showList = () => {
  main.innerHTML = "";
};
