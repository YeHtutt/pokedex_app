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

        //console.log('currentPokemon: ', currentPokemon);

        renderCards(currentPokemon, i, singlePokemonName);
    }
}

function renderCards(currentPokemon, i, singlePokemonName) {
    renderPokemonName(singlePokemonName, i);
    renderPokemonImage(currentPokemon, i) ;
    renderPokemonType(currentPokemon, i);
}

function renderPokemonName(singlePokemonName, i) {
    document.getElementById('mainContainer').innerHTML += `
        <div id="card${i}" class="card">
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

function renderPokemonType(currentPokemon, i) {
    let pokemonTypeData = currentPokemon['types'];
    for (let j = 0; j < pokemonTypeData.length; j++) {
        const pokemonType = pokemonTypeData[j];
        let type = pokemonType['type']['name'];

        console.log('types:', type);
        fillColorPokemonType(type, i);
    }
}


function fillColorPokemonType(type, i) {
    if(type == 'grass') {
        grass(type, i);
    }
    if(type == 'fire') {
        fire(type, i);
    }
    if(type == 'poison') {
        poison(type, i);
    }
    if(type == 'flying') {
        flying(type, i);
    }
    if(type == 'bug') {
        bug(type, i);
    }
    if(type == 'water') {
        water(type, i);
    }
    if(type == 'elecktric') {
        elecktric(type, i);
    }
    if(type == 'ground') {
        ground(type, i);
    }
    if(type == 'fairy') {
        fairy(type, i);
    }
    if(type == 'normal') {
        normal(type, i);
    }
}

function grass(type, i) {
    document.getElementById(`cardAbove${i}`).innerHTML += /*html*/`
    <div class="type textCenter" style="background-color: green">${type}</div>
    `;
}

function fire(type, i) {
    document.getElementById(`cardAbove${i}`).innerHTML += /*html*/`
    <div class="type textCenter" style="background-color: red">${type}</div>
    `;
}

function poison(type, i) {
    document.getElementById(`cardAbove${i}`).innerHTML += /*html*/`
    <div class="type textCenter" style="background-color: blueviolet">${type}</div>
    `;
}

function flying(type, i) {
    document.getElementById(`cardAbove${i}`).innerHTML += /*html*/`
    <div class="type textCenter" style="background-color: lightblue">${type}</div>
    `;
}

function bug(type, i) {
    document.getElementById(`cardAbove${i}`).innerHTML += /*html*/`
    <div class="type textCenter" style="background-color: yellowgreen">${type}</div>
    `;
}

function water(type, i) {
    document.getElementById(`cardAbove${i}`).innerHTML += /*html*/`
    <div class="type textCenter" style="background-color: blue">${type}</div>
    `;
}

function elecktric(type, i) {
    document.getElementById(`cardAbove${i}`).innerHTML += /*html*/`
    <div class="type textCenter" style="background-color: yellow">${type}</div>
    `;
}

function ground(type, i) {
    document.getElementById(`cardAbove${i}`).innerHTML += /*html*/`
    <div class="type textCenter" style="background-color: gray">${type}</div>
    `;
}

function fairy(type, i) {
    document.getElementById(`cardAbove${i}`).innerHTML += /*html*/`
    <div class="type textCenter" style="background-color: purple">${type}</div>
    `;
}

function normal(type, i) {
    document.getElementById(`cardAbove${i}`).innerHTML += /*html*/`
    <div class="type textCenter" style="background-color: lightgray">${type}</div>
    `;
}

