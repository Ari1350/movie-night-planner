const apiKey = 'b9a27ad';
const TMDB_KEY = '77f7228812c3f878b3017a58066f1f42'; 

document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    if (query) searchMovies(query);
});

async function searchMovies(query) {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = "<p>Searching movies...</p>";

    try {
        const response = await fetch(`https://omdbapi.com/?apikey=${apiKey}&s=${query}`);
        const data = await response.json();

        if (data.Search) {
            displayMovies(data.Search);
        } else {
            movieGrid.innerHTML = "<p>No movies found. Try another title.</p>";
        }

        localStorage.setItem('lastSearch', query);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function displayMovies(movies) {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = ""; 

    const limitedMovies = movies.slice(0, 6);

    for (const movie of limitedMovies) {
        const detailsResponse = await fetch(`https://omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
        const details = await detailsResponse.json();

        let tmdbRating = "N/A";
        try {
            const tmdbRes = await fetch(`https://api.themoviedb.org/3/find/${movie.imdbID}?api_key=${TMDB_KEY}&external_source=imdb_id`);
            const tmdbData = await tmdbRes.json();
            if (tmdbData.movie_results && tmdbData.movie_results.length > 0) {
                tmdbRating = tmdbData.movie_results[0].vote_average;
            }
        } catch (err) {
            console.warn("TMDB no respondió para esta película");
        }

        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.animation = "fadeIn 0.5s ease forwards";

        card.innerHTML = `
            <img src="${details.Poster !== 'N/A' ? details.Poster : 'https://placeholder.com'}" alt="${details.Title}">
            <div class="movie-info">
                <h3>${details.Title}</h3>
                <p class="rating">⭐ OMDb: ${details.imdbRating} | 🎬 TMDB: ${tmdbRating}</p>
                <p style="font-size: 0.8rem; color: #666;">${details.Genre} (${details.Year})</p>
                <button onclick="alert('Plot: ${details.Plot.replace(/'/g, "")}')" style="width:100%; margin-top:10px; background: #C1E1C1; border:none; padding:5px; cursor:pointer; border-radius:3px;">Details</button>
                <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(details.Title + ' trailer')}" target="_blank" style="display:block; text-align:center; margin-top:5px; color:#50C878; font-size:0.8rem; text-decoration:none;">Ver Trailer</a>
            </div>
        `;
        movieGrid.appendChild(card);
    }
}

searchMovies('Avengers');


