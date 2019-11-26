// OMDb API KEY
let url = 'https://www.omdbapi.com/?apikey=a99024af&t=';
// Json Data
let jsMovie = {
    "movies": [
        {
            "title": "Reservoir Dogs",
            "youtubeID": "vayksn4Y93A"
        },
        {
            "title": "Pulp Fiction",
            "youtubeID": "s7EdQ4FqbhY"
        },
        {
            "title": "The Hateful Eight",
            "youtubeID": "nIOmotayDMY"
        },
        {
            "title": "Sin City",
            "youtubeID": "T2Dj6ktPU5c"
        },
        {
            "title": "Django Unchained",
            "youtubeID": "0fUCuvNlOCg"
        }
    ]
};
//YouTube API script + source link
var yt = document.createElement('script');
yt.src = "https://www.youtube.com/iframe_api";
var firstScript = document.getElementsByTagName('script')[0];
firstScript.parentNode.insertBefore(yt, firstScript);
//Finder HTML element ud fra 'root' ID - Oprettelse af container til at neste de efterfølgende elementer i
let container = document.getElementById('root');
//for-loop løber igennem selvoprettet JSon fil 'jsMovie', opretter html elementer til siden
for (let i = 0; i < jsMovie.movies.length; i++) {
    //URL med filmen(i)s titel til søgning på OMDb API. - 'replacer' mellemrum i titel
    let finalUrl = url + jsMovie.movies[i].title.replace(/( )/g, "%20");
    fetch(finalUrl)
        .then(response => {
            return response.json();
        })
        .then(movie => {
            //Laver et nyt 'section' element så jeg kan bruge FlexBox
            const movieSection = document.createElement('section');
            movieSection.setAttribute('class', 'column');
            //Oprettelse af elementer til resten af information om filmen(i)
            const h3 = document.createElement('h3');
            const image = document.createElement('img');
            image.setAttribute('src', movie.Poster);
            image.setAttribute('alt', movie.Title);
            const trailer = document.createElement('div');
            trailer.setAttribute('id', 'player' + i);
            trailer.setAttribute('class', 'show');
            const plot = document.createElement('p');
            const rating = document.createElement('p');
            const release = document.createElement('p');
            const ageYears = document.createElement('p');
            //Udregning af filmens alder
            let today = new Date().getFullYear();
            let movieAge = today - movie.Year;
            if (movieAge != movie.Year) {
                ageYears.textContent = ('The movie is released ' + movieAge + ' years ago');
            } else {
                ageYears.textContent = ('The movie is released this year');
            }
            //Filmens information indsættes i elementer vha Json Data
            plot.textContent = movie.Plot;
            rating.textContent = 'IMDB Rating: ' + movie.imdbRating;
            release.textContent = movie.Year;
            h3.textContent = movie.Title;
            //Indsætter elementerne i containeren 'movieSection'
            movieSection.appendChild(h3);
            movieSection.appendChild(image);
            movieSection.appendChild(trailer);
            movieSection.appendChild(plot);
            movieSection.appendChild(rating);
            movieSection.appendChild(ageYears);
            //Indsætter containeren i mit FlexBox element
            container.appendChild(movieSection);
        })
        //Error catch
        .catch(function (err) {
            console.log('error: ' + err);
        })
}

//Funktion til at afspille den rigtige trailer
var player;
function onYouTubeIframeAPIReady() {
    for (let i = 0; i < jsMovie.movies.length; i++) {
        player = new YT.Player('player' + i, {
            height: '390',
            videoId: jsMovie.movies[i].youtubeID,
            playerVars: {'autoplay': 0},
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }
}
//Denne funktion kaldes når state ændres
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}