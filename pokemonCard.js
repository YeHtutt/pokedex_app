let Statics;
let indexVar;

async function showPokemonCard(singlePokemonName, i) {
    document.body.style = "overflow: hidden";
    document.getElementById('overLay').classList.remove('d-none');
    let Url_SinglePokemon = `https://pokeapi.co/api/v2/pokemon/${singlePokemonName}`;
    let response = await fetch(Url_SinglePokemon);
    pokemon = await response.json();
    hideFilterOverlay();
    renderPokemonCard(pokemon, i);
}

function renderPokemonCard(pokemon, i) {
    document.getElementById('overLay').innerHTML = /*html*/ `
    <div class="backward-box" onclick="stopPropagation(event)"><img src="img/arrow-backward.jpg" onclick="decrementPokemonCard(${i})"></div>
        <div id="pokemonCard${i}" class="pokemonCard" onclick="stopPropagation(event)">
            <div id="pokemonCardAbove" class="pokemonCardAbove"></div>
            <div id="pokemonCardMiddle" class="pokemonCardMiddle"></div>
            <div id="pokemonCardBelow" class="pokemonCardBelow"></div>
        </div>
    <div class="forward-box" onclick="stopPropagation(event)"><img src="img/arrow-forward.jpg" onclick="incrementPokemonCard(${i})"></div>
    `;
    renderSingleImageAndId(pokemon);
    renderSinglePokemonInfo(pokemon);
    renderPropertyProgressbar(pokemon);
}

function renderSingleImageAndId(pokemon) {
    let pokemonId = pokemon['id'];
    let pokemonImage = pokemon['sprites']['other']['official-artwork']['front_shiny'];
    document.getElementById('pokemonCardAbove').innerHTML = '';
    document.getElementById('pokemonCardAbove').innerHTML = `
    <div class="aboveTopContainer">
        <div class="pointer" onclick="closeOverLay()"><img class="arrowBack" src="img/arrow-left.png">Pokedex</div>
        <div>#${pokemonId}</div>
    </div>
    <img class="singlePokemonImage" src="${pokemonImage}"> `;
}

function renderSinglePokemonInfo(pokemon) {
    let pokemonName = pokemon['name'];
    let pokemonTypes = pokemon['types'];
    document.getElementById('pokemonCardMiddle').innerHTML = '';
    document.getElementById('pokemonCardMiddle').innerHTML += `
        <h1>${pokemonName}</h1>
        <div class="typeContainer" id="typeContainer"> </div>
        <div class="weightHeightContainer" id="weightHeightContainer"></div>
    `;
    for (let j = 0; j < pokemonTypes.length; j++) {
        let pokemonType = pokemonTypes[j];
        let type = pokemonType['type']['name'];
        fillColorPokemonType(type);
        document.getElementById('typeContainer').innerHTML += ``;
    }
    renderWeightHeight(pokemon);
}

function renderWeightHeight(pokemon) {
    let weight = pokemon['weight'];
    let height = pokemon['height'];
    weight = weight / 10;
    height = height * 10;
    document.getElementById('weightHeightContainer').innerHTML +=
        weightHeightTemplate(weight, height);
}

function weightHeightTemplate(weight, height) {
    return `
  <div class="weight">
            <h3>${weight} KG</h3>
            <div>Weight</div>
    </div>

    <div class="height">
            <h3>${height} cm</h3>
            <div>Height</div>
    </div>`;
}

function renderPropertyProgressbar(pokemon) {
    let color = ['red', 'yellow', 'skyblue', 'darkgray', 'green', 'brown'];
    document.getElementById('pokemonCardBelow').innerHTML = '';
    document.getElementById('pokemonCardBelow').innerHTML += ` <h1>Base Stats</h1> `;
    pokemonStats = pokemon['stats'];
    for (let j = 0; j < (pokemonStats.length && color.length); j++) {
        let stat = pokemonStats[j];
        let baseStat = stat['base_stat'];
        if (baseStat >= 100) { baseStat = 100; }
        let progressValue = baseStat;
        shortDescriptionOfStatics(stat);
        document.getElementById('pokemonCardBelow').innerHTML += renderPokemonStatics(Statics, j, color);
        fillProgressbarWithPercentage(j, progressValue);
    }
}

function renderPokemonStatics(Statics, j, color) {
    return `
    <div class="propertyContainer">
    <div>${Statics.toUpperCase()}</div>

    <div class="progress-container">
    <div id="progress${j}" class="progress-bar" style="background-color: ${color[j]}" data-label="0%"></div>
    </div>

    </div> `
}

function shortDescriptionOfStatics(stat) {
    let statName = stat['stat']['name'];
    let statNameArray = statName.split('-');
    if (statNameArray[0] && statNameArray[1]) {
        Statics = statNameArray[0].slice(0, 2) + statNameArray[1].slice(0, 2);
    }
    else if (statNameArray[0] && statName == 'hp') {
        Statics = statNameArray[0].slice(0, 2);
    }
    else if (statNameArray[0] && statName == 'defense') {
        Statics = statNameArray[0].slice(0, 3);
    }
    else if (statNameArray[0]) {
        Statics = statNameArray[0].slice(0, 2) + statNameArray[0].charAt(statNameArray[0].length - 1);
    }
}

function fillProgressbarWithPercentage(j, progressValue) {
    let progressBar = document.getElementById(`progress${j}`);
    progressBar.style.width = progressValue + '%';
    progressBar.setAttribute('data-label', progressValue + '%');
}

function fillColorPokemonType(type) {
    let color = typeColors[type] || '#A8A77A'; // Standardfarbe 'normal', falls kein passender Typ gefunden wird

    document.getElementById('typeContainer').innerHTML += `
      <div class="typeBox textCenter" style="background-color: ${color}">${type}</div>
    `;
    document.getElementById('pokemonCardAbove').style.background = color;
}


function closeOverLay() {
    document.getElementById('overLay').classList.add('d-none');
    document.body.style = "overflow: visible";
}

function stopPropagation(event) {
    event.stopPropagation();
}

function incrementPokemonCard(i) {
    if (i < 49) {
        indexVar = i + 1; //i inkrementieren und i in eine neue IndexVariable überschreiben
        showNextOrPreviousCard(indexVar);
    }
}

function decrementPokemonCard(i) {
    if (i > 0) {
        indexVar = i - 1; //i dekrementieren und i in eine neue IndexVariable überschreiben
        showNextOrPreviousCard(indexVar);
    }
}

async function showNextOrPreviousCard(indexVar) {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=50`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemons = responseAsJson['results'];

    if (indexVar < pokemons.length) {
        nextPokemonName = await pokemons[indexVar].name; //Pokemon Name des erhöhten Indexs vom API rauspicken
        showPokemonCard(nextPokemonName, indexVar); //den neuer Name an die Funktion für Pokemonkarte übergeben
    } else if (indexVar > 0) {
        nextPokemonName = await pokemons[indexVar].name; //Pokemon Name des verringerten Indexs vom API rauspicken
        showPokemonCard(nextPokemonName, indexVar); //den neuer Name an die Funktion für Pokemonkarte übergeben
    }
}