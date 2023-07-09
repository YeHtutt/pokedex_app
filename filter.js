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
            //console.log(responseAsJson);
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
        <div id="cardOverlay${i}" onclick="showPokemonCard('${singlePokemonName}')" class="cardOverlay">
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
    if (type == 'grass') {
        grassCardFilter(i);
    }
    if (type == 'fire') {
        fireCardFilter(i);
    }
    if (type == 'poison') {
        poisonCardFilter(i);
    }
    if (type == 'flying') {
        flyingCardFilter(i);
    }
    if (type == 'bug') {
        bugCardFilter(i);
    }
    if (type == 'water') {
        waterCardFilter(i);
    }
    if (type == 'elecktric') {
        elecktricCardFilter(i);
    }
    if (type == 'ground') {
        groundCardFilter(i);
    }
    if (type == 'fairy') {
        fairyCardFilter(i);
    }
    if (type == 'normal') {
        normalCardFilter(i);
    }
}


function grassCardFilter(i) {
    document.getElementById(`cardOverlay${i}`).style.background = '#7AC74C';
}


function fireCardFilter(i) {
    document.getElementById(`cardOverlay${i}`).style.background = '#EE8130';
}

function poisonCardFilter(i) {
    document.getElementById(`cardOverlay${i}`).style.background = '#A33EA1';
}

function flyingCardFilter(i) {
    document.getElementById(`cardOverlay${i}`).style.background = '#A98FF3';
}

function bugCardFilter(i) {
    document.getElementById(`cardOverlay${i}`).style.background = '#A6B91A';
}

function waterCardFilter(i) {
    document.getElementById(`cardOverlay${i}`).style.background = '#6390F0';
}

function elecktricCardFilter(i) {
    document.getElementById(`cardOverlay${i}`).style.background = '#F7D02C';
}

function groundCardFilter(i) {
    document.getElementById(`cardOverlay${i}`).style.background = '#E2BF65';
}

function fairyCardFilter(i) {
    document.getElementById(`cardOverlay${i}`).style.background = '#D685AD';
}

function normalCardFilter(i) {
    document.getElementById(`cardOverlay${i}`).style.background = '#A8A77A';
}
