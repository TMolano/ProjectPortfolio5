//API information
const key = "57acb95e5d18bf2ef168007fd66dd5ce";
const api_endpoint = "https://gateway.marvel.com/v1/public/comics";

//Local Storage
if(!localStorage.getItem('searchValue')) {
    populateStorage();
} else {
    setStyles();
}
//Loads previous data from storage
function setStyles() {

    const searchInput = localStorage.getItem('searchValue');

    document.getElementById('searchbar').value = searchInput;

        searchQuery();

}
//Add new style to local storage
function populateStorage() {

    localStorage.setItem('searchValue', document.getElementById('searchbar').value);
    if(document.getElementById('searchbar').length > 0)
    {
        setStyles();
    }
}


//Fetch API data
//Filter Comics based off Search Input
function searchQuery() {
    const filterValue = document.getElementById("searchbar").value.toUpperCase();
    const inputValue = document.getElementById("searchbar").value;
    const url = `${api_endpoint}?titleStartsWith=${filterValue}&limit=40&orderBy=issueNumber%2Ctitle&apikey=${key}`;
    let loadWheel = document.getElementById("loader");
    loadWheel.style.display = "block";
    fetch(url)

        .then(results => results.json())

        .then(resultsJSON => {
            //Insert API data
            let newContent = "";
            console.log(resultsJSON.data.results);
            //If more than 20 results
            if (resultsJSON.data.results.length > 20) {
                loadWheel.style.display = "none";
                load.style.display = "block";
                for (let i = 0; i < 20; i++) {
                    newContent += '<li class="comicItem"><article>' + '<img src="' + resultsJSON.data.results[i].thumbnail.path + '.jpg"' + ' alt="image of comic art">';
                    newContent += '<h3>' + resultsJSON.data.results[i].title + '</h3>';
                    newContent += '<h3>' + "$" + Math.floor(Math.random() * 90 + 10) + '</h3>';
                    newContent += '<button class="addComicBtn">Add to MyList' + '</button></article></li>';

                }

            }

            //Between 1-20 results
            else if (resultsJSON.data.results.length <= 20 && resultsJSON.data.results.length >= 0) {
                loadWheel.style.display = "none";
                load.style.display = "none";
                for (let i = 0; i < resultsJSON.data.results.length; i++) {
                    newContent += '<li class="comicItem"><article>' + '<img src="' + resultsJSON.data.results[i].thumbnail.path + '.jpg"' + ' alt="image of comic art">';
                    newContent += '<h3>' + resultsJSON.data.results[i].title + '</h3></article></li>';
                    newContent += '<h3>' + "$" + Math.floor(Math.random() * 90 + 10) + '</h3>';
                    newContent += '<button class="addComicBtn">Add to MyList' + '</button></article></li>';
                }
            }

            let apiResults = document.querySelector("ul#comicList");
            apiResults.innerHTML = newContent;

            //function for results text, transition effects after search
            function inputResults() {
                let resultsHeader = document.getElementById("results-of-search");
                resultsHeader.innerHTML = resultsJSON.data.results.length + " Results for \"" + inputValue + "\"";

                let body = document.getElementById("body");
                body.style.overflowY = "visible";



            }

            let li = document.querySelectorAll(".comicItem");
            for (let i = 0; i < li.length; i++) {

                let a = li[i].getElementsByTagName("h3")[0];
                if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
                    li[i].style.display = "";
                }

                else {
                    li[i].style.display = "none";

                }

            }
            inputResults();
        })

        .catch(error => {
            console.log("An Error Occurred:", error);

        });
}
//Event when Form is submitted
    const form = document.getElementById("search-form");
    form.onsubmit = function (ev) {
        ev.preventDefault();
        populateStorage();
        searchQuery();
    };


const load = document.getElementById("load");

load.addEventListener("click", function () {

    load.style.display = "none";

    const filterValue = document.getElementById("searchbar").value.toUpperCase();
    const url = `${api_endpoint}?titleStartsWith=${filterValue}&limit=40&orderBy=issueNumber%2Ctitle&apikey=${key}`;

    fetch(url)

        .then(results => results.json())

        .then(resultsJSON => {
            //Insert API data
            let newContent = '';
            console.log(resultsJSON.data.results);

            for (let i = 21; i < 40; i++) {
                newContent += '<li class="comicItem"><article>' + '<img src="' + resultsJSON.data.results[i].thumbnail.path + '.jpg"' + ' alt="image of comic art">';
                newContent += '<h3>' + resultsJSON.data.results[i].title + '</h3></article></li>';
            }
            let apiResults = document.querySelector("ul#comicList");
            apiResults.insertAdjacentHTML("beforeend", newContent);

            document.getElementById("comicList").style.height = "fit-content";

        })

        .catch(error => {
            console.log("An Error Occurred:", error)
        });
});

let apiArray = [];
let addComic = document.querySelectorAll("button.addComicBtn");

for(let i=0; addComic.length > 0; i++) {
    addComic[i].addEventListener("click", function () {
        alert("hello");
    });
}








