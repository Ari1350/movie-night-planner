const apiKey = 'b9a27ad'; 
const movieID = 'tt0372784'; 

async function testComplexData() {
    const url = `https://omdbapi.com{apiKey}&i=${movieID}`;
    const response = await fetch(url);
    const movie = await response.json();

    console.log("1. Title:", movie.Title);
    console.log("2. Year:", movie.Year);
    console.log("3. Rating:", movie.Rated);
    console.log("4. Genre:", movie.Genre);
    console.log("5. Director:", movie.Director);
    console.log("6. Actors:", movie.Actors);
    console.log("7. Plot:", movie.Plot);
    console.log("8. Awards:", movie.Awards);
}

testComplexData();
