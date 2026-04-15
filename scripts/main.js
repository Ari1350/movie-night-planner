const apiKey = 'b9a27ad';
const TMDB_KEY = '77f7228812c3f878b3017a58066f1f42';

document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    if (query) initSearch(query);
});

async function initSearch(query) {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = "<p>Loading movies...</p>";

    try {
        const response = await fetch(`https://omdbapi.com{OMDB_KEY}&s=${query}`);
        const data = await response.json();

        if (data.Search) {
            renderList(data.Search);
        } else {
            movieGrid.innerHTML = "<p>No movies found.</p>";
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

async function renderList(movies) {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = "";

    for (const movie of movies) {

        const detailRes = await fetch(`https://omdbapi.com{OMDB_KEY}&i=${movie.imdbID}`);
        const details = await detailRes.json();

        const tmdbRes = await fetch(`https://themoviedb.org{movie.imdbID}?api_key=${TMDB_KEY}&external_source=imdb_id`);
        const tmdbData = await tmdbRes.json();
        
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${details.Poster !== 'N/A' ? details.Poster : 'https://placeholder.com'}" alt="${details.Title}">
            <div class="movie-info">
                <h3>${details.Title}</h3>
                <p>⭐ ${details.imdbRating} | ${details.Year}</p>
                <p style="font-size: 0.85rem;">${details.Plot.substring(0, 80)}...</p>
                <a href="https://youtube.com{details.Title}+trailer" target="_blank" class="btn-trailer">Watch Trailer</a>
            </div>
        `;
        movieGrid.appendChild(card);
    }
}

