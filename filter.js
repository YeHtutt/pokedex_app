let pokemonNamesArray = [];
let filteredPokemon = [];
let validInput = false;

function displayfilterOverlay() {
    document.body.style = "overflow: hidden";
    document.getElementById('filteredPokemonContainer').innerHTML = '';
    document.getElementById('filterPokemon').classList.remove('d-none');
    document.getElementById('backArrow').classList.remove('d-none');
    document.getElementById('backArrow').style.zIndex = "1";
    filteredPokemon = [];
}

async function loadPokemonsForFilter() {
    displayfilterOverlay();
    let url = `https://pokeapi.co/api/v2/pokemon?limit=50`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemonsResponse = responseAsJson['results'];
    inputValid(pokemonsResponse);
    document.getElementById('inputField').value = '';
}

function filterPokemon() {
    let search = document.getElementById('inputField').value;
    search = search.toLowerCase();
    for (let i = 0; i < pokemonNamesArray.length; i++) {
        let element = pokemonNamesArray[i];
        if (element.toLowerCase().includes(search)) {
            validInput = true;
            filteredPokemon.push(element);
        }
    }
}

function inputValid(pokemonsResponse) {
    filterPokemon();
    let inputValue = document.getElementById('inputField').value;
    if (inputValue == '') {
        hideFilterOverlay();
    } else if (validInput) {
        queryPokeMons(pokemonsResponse); //pokemons Anfrage
    } else {
        hideFilterOverlay();
    }
}

async function queryPokeMons(pokemonsResponse) {
    for (let j = 0; j < filteredPokemon.length; j++) {
        const filteredPokemonName = filteredPokemon[j];
        for (let i = 0; i < pokemonsResponse.length; i++) {
            const singlePokemonName = pokemonsResponse[i]['name'];
            let url = `https://pokeapi.co/api/v2/pokemon/${singlePokemonName}`;
            let response = await fetch(url);
            let responseAsJson = await response.json();
            showFilteredPokemons(filteredPokemonName, singlePokemonName, responseAsJson, i);
        }
    }
}

function showFilteredPokemons(filteredPokemonName, singlePokemonName, responseAsJson, i) {
    let pokemonImage = responseAsJson['sprites']['other']['official-artwork']['front_shiny'];
    if (filteredPokemonName == singlePokemonName) {
        renderFilteredCards(singlePokemonName, i, responseAsJson, pokemonImage);
    }
}


function renderFilteredCards(singlePokemonName, i, responseAsJson, pokemonImage) {
    let pokemonId = responseAsJson['id'];
    document.getElementById('filteredPokemonContainer').innerHTML += /*html*/`
        <div id="cardOverlay${i}" onclick="showPokemonCard('${singlePokemonName}', ${i})" class="cardOverlay">
            <div id="cardAbove${i}" class="cardAbove">
                <div class="pokemonName"> <h2> ${singlePokemonName} </h2> </div>
                <div class="textCenter mag-top-50"><b>#${pokemonId}</b></div>
            </div>
            <div id="cardBelow${i}" class="cardBelow">
            <img class="image" id="image${i}" src="${pokemonImage}">
            <div>
        </div>
    `;
    let pokemonTypes = responseAsJson['types'];
    for (let j = 0; j < pokemonTypes.length; j++) {
        const pokemonType = pokemonTypes[j];
        let type = pokemonType['type']['name'];
        fillPokemonCardsColor(type, i);
    }
}

function fillPokemonCardsColor(type, i) {
    let color = typeColors[type] || '#A8A77A';
    document.getElementById(`cardOverlay${i}`).style.background = color;
}
