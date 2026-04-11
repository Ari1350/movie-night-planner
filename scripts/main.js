const apiKey = 'b9a27ad';

document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    if (query) searchMovies(query);
});

async function searchMovies(query) {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = "<p>Searching movies...</p>";

    try {
        const response = await fetch(`https://omdbapi.com{apiKey}&s=${query}`);
        const data = await response.json();

        if (data.Search) {
            displayMovies(data.Search);
        } else {
            movieGrid.innerHTML = "<p>No movies found. Try another title.</p>";
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function displayMovies(movies) {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = ""; 

    for (const movie of movies) {
        const detailsResponse = await fetch(`https://omdbapi.com{apiKey}&i=${movie.imdbID}`);
        const details = await detailsResponse.json();

        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${details.Poster !== 'N/A' ? details.Poster : 'https://placeholder.com'}" alt="${details.Title}">
            <div class="movie-info">
                <h3>${details.Title}</h3>
                <p class="rating">⭐ ${details.imdbRating} | ${details.Year}</p>
                <p style="font-size: 0.8rem; color: #666;">${details.Genre}</p>
                <button onclick="alert('Plot: ${details.Plot.replace(/'/g, "")}')" style="width:100%; margin-top:10px; background: #C1E1C1; border:none; padding:5px; cursor:pointer; border-radius:3px;">Details</button>
            </div>
        `;
        movieGrid.appendChild(card);
    }
}

searchMovies('Avengers');

