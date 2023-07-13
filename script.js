let currentPokemon;
let nextPokemonName;
let lastPokemonName;

async function loadPokemons() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=50`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemons = responseAsJson['results'];
    await loadSinglePokemon(pokemons); // Warte, bis alle Pokemon geladen sind
}

async function loadSinglePokemon(pokemons) {
    for (let i = 0; i < pokemons.length; i++) {
        let singlePokemonName = pokemons[i].name; // Keine Notwendigkeit für ['name'] hier
        let singlePokemonNameUrl = `https://pokeapi.co/api/v2/pokemon/${singlePokemonName}`;

        let pokemonNameResponse = await fetch(singlePokemonNameUrl);
        currentPokemon = await pokemonNameResponse.json();
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
        <div id="card${i}" onclick="showPokemonCard('${singlePokemonName}', ${i} )" class="card">
            <div id="cardAbove${i}" class="cardAbove">
                <div class="pokemonName"> <h2> ${singlePokemonName} </h2> </div>
                <div class="textCenter mag-top-50" id="pokeId"><b>#${pokemonId}</b></div>
            </div>
            <div id="cardBelow${i}" class="cardBelow"> <div>
        </div>`;
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

const typeColors = { //ein Objekt mit den Pokémon-Typ als Schlüssel und die entsprechende Hintergrundfarbe als Wert erstellen
    grass: '#7AC74C',
    fire: '#EE8130',
    poison: '#A33EA1',
    flying: '#A98FF3',
    bug: '#A6B91A',
    water: '#6390F0',
    electric: '#F7D02C',
    ground: '#E2BF65',
    fairy: '#D685AD'
}

function fillColorPokemonCardsByType(type, i) {
    let color = typeColors[type] || '#A8A77A'; //wenn übergabeTyp nicht im typeColor Objekt gefunden wird, wird color bekommt den Wert ('#A8A77A' NormalFall)
    document.getElementById(`card${i}`).style.background = color; 
}

function hideFilterOverlay() {
    document.body.style = "overflow: visible";
    document.getElementById('filteredPokemonContainer').innerHTML = '';
    document.getElementById('filterPokemon').classList.add('d-none');
    document.getElementById('backArrow').classList.add('d-none');
    document.getElementById('backArrow').style.zIndex = "0";
    filteredPokemon = [];
}
