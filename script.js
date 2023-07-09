let currentPokemon;

async function loadPokemons() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=50`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemons = responseAsJson['results'];
    //console.log('API answer: ', responseAsJson);
    //console.log('Pokemon results: ', pokemons);
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
    renderPokemonName(singlePokemonName, i, currentPokemon);
    renderPokemonImage(currentPokemon, i);
    renderPokemonType(currentPokemon, i);
}

function renderPokemonName(singlePokemonName, i, currentPokemon) {
    let pokemonId = currentPokemon['id'];
    document.getElementById('mainContainer').innerHTML += /*html*/`
        <div id="card${i}" onclick="showPokemonCard('${singlePokemonName}')" class="card">
            <div id="cardAbove${i}" class="cardAbove">
                <div class="pokemonName"> <h2> ${singlePokemonName} </h2> </div>
                <div class="textCenter mag-top-50" id="pokeId"><b>#${pokemonId}</b></div>
            </div>

            <div id="cardBelow${i}" class="cardBelow"> <div>
        </div>
    `;
    pokemonNamesArray.push(singlePokemonName); //Alle Pokemon Namen ins Array speichern
}

function renderPokemonImage(currentPokemon, i) {
    let pokemonImage = currentPokemon['sprites']['other']['official-artwork']['front_shiny'];
    document.getElementById(`cardBelow${i}`).innerHTML += `
    <img class="image" id="image${i}" src="${pokemonImage}">
    `;
}

function renderPokemonType(currentPokemon, i) {
    let pokemonTypeData = currentPokemon['types'];
    for (let j = 0; j < pokemonTypeData.length; j++) {
        const pokemonType = pokemonTypeData[j];
        let type = pokemonType['type']['name'];

        fillColorPokemonCardsByType(type, i);
    }
}

function fillColorPokemonCardsByType(type, i) {
    if (type == 'grass') {
        grassCard(i);
    }
    if (type == 'fire') {
        fireCard(i);
    }
    if (type == 'poison') {
        poisonCard(i);
    }
    if (type == 'flying') {
        flyingCard(i);
    }
    if (type == 'bug') {
        bugCard(i);
    }
    if (type == 'water') {
        waterCard(i);
    }
    if (type == 'elecktric') {
        elecktricCard(i);
    }
    if (type == 'ground') {
        groundCard(i);
    }
    if (type == 'fairy') {
        fairyCard(i);
    }
    if (type == 'normal') {
        normalCard(i);
    }
}


function grassCard(i) {
    document.getElementById(`card${i}`).style.background = '#7AC74C';
}


function fireCard(i) {
    document.getElementById(`card${i}`).style.background = '#EE8130';
}

function poisonCard(i) {
    document.getElementById(`card${i}`).style.background = '#A33EA1';
}

function flyingCard(i) {
    document.getElementById(`card${i}`).style.background = '#A98FF3';
}

function bugCard(i) {
    document.getElementById(`card${i}`).style.background = '#A6B91A';
}

function waterCard(i) {
    document.getElementById(`card${i}`).style.background = '#6390F0';
}

function elecktricCard(i) {
    document.getElementById(`card${i}`).style.background = '#F7D02C';
}

function groundCard(i) {
    document.getElementById(`card${i}`).style.background = '#E2BF65';
}

function fairyCard(i) {
    document.getElementById(`card${i}`).style.background = '#D685AD';
}

function normalCard(i) {
    document.getElementById(`card${i}`).style.background = '#A8A77A';
}

function hideFilterOverlay() {
    document.body.style = "overflow: visible";
    document.getElementById('filteredPokemonContainer').innerHTML = '';
    document.getElementById('filterPokemon').classList.add('d-none');
    document.getElementById('backArrow').classList.add('d-none');
    document.getElementById('backArrow').style.zIndex = "0";
    filteredPokemon = [];
}