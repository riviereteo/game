const games = [
    ['hum/monster.html', 'img/hum.png', 'Hum', 'exp', '01/10/2023'],
    ['lag/ball.html', 'img/lag.png', 'Lag', 'exp', '01/11/2023'],
    ['lify/index.html', 'img/lify.png', 'Lify', 'exp', '25/01/2024'],
    ['snake/index.html', 'img/snake.png', 'Snake', 'game', '01/12/2023'],
    ['upside/UPSIDE.html', 'img/upside.png', 'UPSIDE', 'game', '01/07/2023'],
];

let params = {
    mode: 'game',
}
document.addEventListener("DOMContentLoaded", function () {
    const username = 'riviereteo';
    const repository = 'game';

    const apiUrl = `https://api.github.com/repos/${username}/${repository}/commits`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(commits => {
            commits.forEach(commit => {
                const commitparent = document.createElement('div');
                commitparent.className = 'commitparent';
                const listItem = document.createElement('p');
                listItem.textContent = commit.commit.message;
                listItem.className = 'commit';
                commitparent.dataset.type = 'commit';
                const date = document.createElement('p');
                let thedate = commit.commit.author.date;
                thedate = thedate.substring(8, 10) + '/' + thedate.substring(5, 7) + '/' + thedate.substring(0, 4);
                date.textContent = thedate;
                date.className = 'dateGame';
                commitparent.appendChild(listItem);
                commitparent.appendChild(date);
                document.getElementById('gameContainer').appendChild(commitparent);
            });
            checkup();
        })
        .catch(error => console.error('Erreur lors de la récupération des commits:', error));
    make();
});

function start(url) {
    let href = window.location.href;
    let index = href.indexOf('game/');
    if (index !== -1) {
        href = href.substring(0, index + 5);
    }
    window.location.href = href + url;
}

function make() {
    const gameBigparent = document.createElement('div');
    gameBigparent.id = 'gameBigparent';
    document.body.appendChild(gameBigparent);
    const menuRight = document.createElement('div');
    menuRight.id = 'menuRight';
    const searchButton = document.createElement('button');
    searchButton.id = 'searchButton';
    searchButton.innerHTML = '<span class="material-symbols-outlined">search</span>';
    searchButton.addEventListener('click', () => {
        if (!document.getElementById('searchBar')) {
            const searchBar = document.createElement('input');
            searchBar.id = 'searchBar';
            searchBar.type = 'text';
            searchBar.placeholder = 'Search';
            searchBar.addEventListener('input', () => {
                switch(params.mode){
                    case 'game':
                        searchGame(searchBar.value);
                        break;
                    case 'exp':
                        searchExp(searchBar.value);
                        break;
                    case 'news':
                        searchNews(searchBar.value);
                        break;
                }
            });
            menuRight.insertBefore(searchBar, searchButton);
            searchBar.focus();
        }else{
            document.getElementById('searchBar').style.animation = 'searchBarDisappear 0.5s ease-in-out forwards';
            setTimeout(() => {
                document.getElementById('searchBar').remove();
            }, 500);
        }
    });
    menuRight.appendChild(searchButton);
    const menu = document.createElement('div');
    menu.className = 'menu';
    const itemMenuGame = document.createElement('div');
    itemMenuGame.className = 'itemMenu';
    itemMenuGame.innerHTML = '<span class="material-symbols-outlined">stadia_controller</span>';
    const itemMenuExp = document.createElement('div');
    itemMenuExp.className = 'itemMenu';
    itemMenuExp.innerHTML = '<span class="material-symbols-outlined">experiment</span>';
    const itemMenuNews = document.createElement('div');
    itemMenuNews.className = 'itemMenu';
    itemMenuNews.innerHTML = '<span class="material-symbols-outlined">newspaper</span>';
    itemMenuGame.addEventListener('click', () => {
        params.mode = 'game';
        checkup();
    });
    itemMenuExp.addEventListener('click', () => {
        params.mode = 'exp';
        checkup();
    });
    itemMenuNews.addEventListener('click', () => {
        params.mode = 'news';
        checkup();
    });
    menu.appendChild(itemMenuGame);
    menu.appendChild(itemMenuExp);
    menu.appendChild(itemMenuNews);
    document.getElementById('gameBigparent').appendChild(menu);
    document.getElementById('gameBigparent').appendChild(menuRight);
    const gameContainer = document.createElement('div');
    gameContainer.id = 'gameContainer';
    document.getElementById('gameBigparent').appendChild(gameContainer);
    games.forEach(game => {
        const jeux = document.createElement('div');
        jeux.className = 'game';
        const img = document.createElement('img');
        img.src = game[1];
        img.alt = game[2];
        img.className = 'imgGame';
        const parentGameOnLeftImg = document.createElement('div');
        parentGameOnLeftImg.className = 'parentGameOnLeftImg';
        const name = document.createElement('p');
        name.textContent = game[2];
        name.className = 'titreGame';
        const date = document.createElement('p');
        date.textContent = game[4];
        date.className = 'dateGame';
        jeux.appendChild(img);
        parentGameOnLeftImg.appendChild(name);
        parentGameOnLeftImg.appendChild(date);
        jeux.appendChild(parentGameOnLeftImg);
        jeux.addEventListener('click', () => start(game[0]));
        jeux.dataset.type = game[3];
        document.getElementById('gameContainer').appendChild(jeux);
    });
}

function checkup() {
    const games = document.getElementsByClassName('game');
    const commits = document.getElementsByClassName('commitparent');
    let gamepluscommits = [];
    for (let i = 0; i < games.length; i++) {
        gamepluscommits.push(games[i]);
    }
    for (let i = 0; i < commits.length; i++) {
        gamepluscommits.push(commits[i]);
    }
    switch (params.mode) {
        case 'game':
            document.getElementsByClassName('itemMenu')[0].style.backgroundColor = '#fff';
            document.getElementsByClassName('itemMenu')[0].style.color = '#000';
            document.getElementsByClassName('itemMenu')[1].style.backgroundColor = 'transparent';
            document.getElementsByClassName('itemMenu')[1].style.color = '#fff';
            document.getElementsByClassName('itemMenu')[2].style.backgroundColor = 'transparent';
            document.getElementsByClassName('itemMenu')[2].style.color = '#fff';
            gamepluscommits.forEach(game => {
                if (game.dataset.type === 'game') {
                    game.style.display = 'flex';
                } else {
                    game.style.display = 'none';
                }
            });
            break;
        case 'exp':
            document.getElementsByClassName('itemMenu')[0].style.backgroundColor = 'transparent';
            document.getElementsByClassName('itemMenu')[0].style.color = '#fff';
            document.getElementsByClassName('itemMenu')[1].style.backgroundColor = '#fff';
            document.getElementsByClassName('itemMenu')[1].style.color = '#000';
            document.getElementsByClassName('itemMenu')[2].style.backgroundColor = 'transparent';
            document.getElementsByClassName('itemMenu')[2].style.color = '#fff';
            gamepluscommits.forEach(game => {
                if (game.dataset.type === 'exp') {
                    game.style.display = 'flex';
                } else {
                    game.style.display = 'none';
                }
            });
            break;
        case 'news':
            document.getElementsByClassName('itemMenu')[0].style.backgroundColor = 'transparent';
            document.getElementsByClassName('itemMenu')[0].style.color = '#fff';
            document.getElementsByClassName('itemMenu')[1].style.backgroundColor = 'transparent';
            document.getElementsByClassName('itemMenu')[1].style.color = '#fff';
            document.getElementsByClassName('itemMenu')[2].style.backgroundColor = '#fff';
            document.getElementsByClassName('itemMenu')[2].style.color = '#000';
            gamepluscommits.forEach(game => {
                if (game.dataset.type === 'commit') {
                    game.style.display = 'flex';
                } else {
                    game.style.display = 'none';
                }
            });
            break;
    }
}

function searchGame(value) {
    const games = document.getElementsByClassName('game');
    for (let i = 0; i < games.length; i++) {
        if (games[i].children[1].children[0].textContent.toLowerCase().includes(value.toLowerCase()) && games[i].dataset.type === 'game') {
            games[i].style.display = 'flex';
            games[i].querySelectorAll('.titreGame').forEach(titre => {
                titre.innerHTML = titre.textContent;
            });
            games[i].querySelectorAll('.titreGame').forEach(titre => {
                titre.innerHTML = titre.textContent.replace(new RegExp(value, 'gi'), (match) => `<span class="highlight">${match}</span>`);
            });
        } else {
            games[i].style.display = 'none';
        }
    }
}

function searchExp(value) {
    const games = document.getElementsByClassName('game');
    for (let i = 0; i < games.length; i++) {
        if (games[i].children[1].children[0].textContent.toLowerCase().includes(value.toLowerCase()) && games[i].dataset.type === 'exp') {
            games[i].style.display = 'flex';
            games[i].querySelectorAll('.titreGame').forEach(titre => {
                titre.innerHTML = titre.textContent;
            });
            games[i].querySelectorAll('.titreGame').forEach(titre => {
                titre.innerHTML = titre.textContent.replace(new RegExp(value, 'gi'), (match) => `<span class="highlight">${match}</span>`);
            });
        } else {
            games[i].style.display = 'none';
        }
    }
}

function searchNews(value) {
    const games = document.getElementsByClassName('commitparent');
    for (let i = 0; i < games.length; i++) {
        if (games[i].children[0].textContent.toLowerCase().includes(value.toLowerCase()) && games[i].dataset.type === 'commit') {
            games[i].style.display = 'flex';
            games[i].querySelectorAll('.commit').forEach(titre => {
                titre.innerHTML = titre.textContent;
            });
            games[i].querySelectorAll('.commit').forEach(titre => {
                titre.innerHTML = titre.textContent.replace(new RegExp(value, 'gi'), (match) => `<span class="highlight">${match}</span>`);
            });
        } else {
            games[i].style.display = 'none';
        }
    }
}