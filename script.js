let currentPokemon;

async function loadPokemons() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=50`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemons = responseAsJson['results'];

    //console.log('API answer: ', responseAsJson);
    console.log('Pokemon results: ', pokemons);
    
    loadSinglePokemon(pokemons);
    
}

async function loadSinglePokemon(pokemons) {
    for (let i = 0; i < pokemons.length; i++) {
        let singlePokemonName = pokemons[i]['name'];
        let singlePokemonNameUrl = `https://pokeapi.co/api/v2/pokemon/${singlePokemonName}`;

        let pokemonNameResponse = await fetch(singlePokemonNameUrl);
        currentPokemon = await pokemonNameResponse.json();

        console.log('currentPokemon: ', currentPokemon);

        renderCards(currentPokemon, i, singlePokemonName);
    }
}

function renderCards(currentPokemon, i, singlePokemonName) {
    renderPokemonName(singlePokemonName, i);
    renderPokemonImage(currentPokemon, i) ;
}

function renderPokemonName(singlePokemonName, i) {
    document.getElementById('mainContainer').innerHTML += /*html*/`
        <div id="card${i}" onclick="showPokemonCard('${singlePokemonName}')" class="card">
            <div id="cardAbove${i}" class="cardAbove">
                <div class="pokemonName"> <h2> ${singlePokemonName} </h2> </div>
            </div>

            <div id="cardBelow${i}" class="cardBelow"> <div>
        </div>
    `;
}

function renderPokemonImage(currentPokemon, i) {
    let pokemonImage = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
    document.getElementById(`cardBelow${i}`).innerHTML += `
    <img class="image" src="${pokemonImage}">
    `;
}