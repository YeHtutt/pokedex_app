async function showPokemonCard(singlePokemonName) {
    document.body.style = "overflow: hidden";
    document.getElementById('overLay').classList.remove('d-none');

    let Url_SinglePokemon = `https://pokeapi.co/api/v2/pokemon/${singlePokemonName}`;
    let response = await fetch(Url_SinglePokemon);
    pokemon = await response.json();

    hideFilterOverlay();
    renderPokemonCard(pokemon);
}

function renderPokemonCard(pokemon) {
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
    <img class="singlePokemonImage" src="${pokemonImage}">
    `;
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
    document.getElementById('weightHeightContainer').innerHTML += `
    <div class="weight">
            <h3>${weight} KG</h3>
            <div>Weight</div>
            </div>

            <div class="height">
            <h3>${height} cm</h3>
            <div>Height</div>
    </div>
    `;
}

function renderPropertyProgressbar(pokemon) {
    let color = ['red', 'yellow', 'skyblue', 'darkgray', 'green', 'brown'];
    document.getElementById('pokemonCardBelow').innerHTML = '';
    document.getElementById('pokemonCardBelow').innerHTML += `
        <h1>Base Stats</h1>
    `;

    pokemonStats = pokemon['stats'];
    for (let j = 0; j < (pokemonStats.length && color.length) ; j++) {
        let stat = pokemonStats[j];
        let baseStat = stat['base_stat'];
        if(baseStat >= 100){
            baseStat = 100;
        }
        let progressValue = baseStat;
        //console.log('%: ', baseStat);
        let statName = stat['stat']['name'];
        let statNameArray = statName.split('-');
        //console.log('array:', statNameArray);
        let Statics;
        if (statNameArray[0] && statNameArray[1]) {
            Statics = statNameArray[0].slice(0, 3) + '-' + statNameArray[1].slice(0, 3);
        }
        else {
            Statics = statNameArray[0].slice(0, 2);
        }
        document.getElementById('pokemonCardBelow').innerHTML += `
        <div class="propertyContainer">
        <div>${Statics.toUpperCase()}</div>
    
        <div class="progress-container">
        <div id="progress${j}" class="progress-bar" style="background-color: ${color[j]}" data-label="0%"></div>
        </div>

        </div>
        `;

            let progressBar = document.getElementById(`progress${j}`);
            progressBar.style.width = progressValue + '%';
            progressBar.setAttribute('data-label', progressValue + '%');
    }
}


function fillColorPokemonType(type) {
    if (type == 'grass') {
        grass(type);
    }
    if (type == 'fire') {
        fire(type);
    }
    if (type == 'poison') {
        poison(type);
    }
    if (type == 'flying') {
        flying(type);
    }
    if (type == 'bug') {
        bug(type);
    }
    if (type == 'water') {
        water(type);
    }
    if (type == 'elecktric') {
        elecktric(type);
    }
    if (type == 'ground') {
        ground(type);
    }
    if (type == 'fairy') {
        fairy(type);
    }
    if (type == 'normal') {
        normal(type);
    }
}


function grass(type) {
    document.getElementById(`typeContainer`).innerHTML += `
    <div class="typeBox textCenter" style="background-color: #7AC74C">${type}</div>
    `;
    document.getElementById('pokemonCardAbove').style.background = '#7AC74C';
}

function fire(type) {
    document.getElementById(`typeContainer`).innerHTML += `
    <div class="typeBox textCenter" style="background-color: #EE8130">${type}</div>
    `;
    document.getElementById('pokemonCardAbove').style.background = '#EE8130';
}

function poison(type) {
    document.getElementById(`typeContainer`).innerHTML += `
    <div class="typeBox textCenter" style="background-color: #A33EA1">${type}</div>
    `;
    document.getElementById('pokemonCardAbove').style.background = '#A33EA1';
}

function flying(type) {
    document.getElementById(`typeContainer`).innerHTML += `
    <div class="typeBox textCenter" style="background-color: #A98FF3">${type}</div>
    `;
    document.getElementById('pokemonCardAbove').style.background = '#A98FF3';
}

function bug(type) {
    document.getElementById(`typeContainer`).innerHTML += `
    <div class="typeBox textCenter" style="background-color: #A6B91A">${type}</div>
    `;
    document.getElementById('pokemonCardAbove').style.background = '#A6B91A';
}

function water(type) {
    document.getElementById(`typeContainer`).innerHTML += `
    <div class="typeBox textCenter" style="background-color: #6390F0">${type}</div>
    `;
    document.getElementById('pokemonCardAbove').style.background = '#6390F0';
}

function elecktric(type) {
    document.getElementById(`typeContainer`).innerHTML += `
    <div class="typeBox textCenter" style="background-color: #F7D02C">${type}</div>
    `;
    document.getElementById('pokemonCardAbove').style.background = '#F7D02C';
}

function ground(type) {
    document.getElementById(`typeContainer`).innerHTML += `
    <div class="typeBox textCenter" style="background-color: #E2BF65">${type}</div>
    `;
    document.getElementById('pokemonCardAbove').style.background = '#E2BF65';
}

function fairy(type) {
    document.getElementById(`typeContainer`).innerHTML += `
    <div class="typeBox textCenter" style="background-color: #D685AD">${type}</div>
    `;
    document.getElementById('pokemonCardAbove').style.background = '#D685AD';
}

function normal(type) {
    document.getElementById(`typeContainer`).innerHTML += `
    <div class="typeBox textCenter" style="background-color: #A8A77A">${type}</div>
    `;
    document.getElementById('pokemonCardAbove').style.background = '#A8A77A';
}


function closeOverLay() {
    document.getElementById('overLay').classList.add('d-none');
    document.body.style = "overflow: visible";
}

function stopPropagation(event) {
    event.stopPropagation();
} 
