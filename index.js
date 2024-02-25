function start(url) {
    let href = window.location.href;
    href = href.substring(0, href.lastIndexOf('/'));
    window.location.href = href + '/' + url;
}

let intervalOfCarouselSlide;

document.addEventListener("DOMContentLoaded", function () {
    let page = 0;
    const apiUrl = `https://api.github.com/repos/riviereteo/game/commits`;
    const carrouselNews = document.getElementById('carrouselNews');
    const carrouselNavigator = document.getElementById('carrouselNavigator');
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            while (page < 10) {
                const words = data[page].commit.message.split(" ");
                for (let i = 0; i < words.length; i++) {
                    if (titles.includes(words[i])) {
                        let index = titles.indexOf(words[i]);
                        const carrouselFrame = document.createElement('div');
                        carrouselFrame.className = 'carrouselFrame';
                        carrouselFrame.onclick = () => start(link[index]);
                        carrouselFrame.style.backgroundImage = `url(${img[index]})`;
                        carrouselNews.childNodes.length === 1 ? carrouselFrame.classList.add('carrouselFrameHere') : carrouselFrame.classList.add('carrouselFrameNotHere');
                        const messageText = document.createElement('p');
                        messageText.innerHTML = data[page].commit.message;
                        messageText.className = 'messageText';
                        const dateText = document.createElement('p');
                        dateText.className = 'dateText';
                        const date = data[page].commit.author.date;
                        dateText.innerHTML = date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4)
                        const version = document.createElement('p');
                        version.className = 'version';
                        version.innerHTML = versions[index];
                        carrouselFrame.appendChild(messageText);
                        carrouselFrame.appendChild(dateText);
                        carrouselFrame.appendChild(version);
                        carrouselNews.appendChild(carrouselFrame);
                        const carrouselDot = document.createElement('div');
                        carrouselDot.className = 'carrouselDot';
                        carrouselNews.childNodes.length === 2 ? carrouselDot.classList.add('carrouselDotHere') : carrouselDot.classList.add('carrouselDotNotHere');
                        carrouselDot.addEventListener('click', () => {
                            clearInterval(intervalOfCarouselSlide);
                            intervalOfCarouselSlide = setInterval(slideAuto, 5000);
                            carrouselNavigator.childNodes.forEach(dot => {
                                dot.classList.remove('carrouselDotHere');
                                dot.classList.add('carrouselDotNotHere');
                            });
                            let ancienhere = document.querySelector('.carrouselFrameHere');
                            ancienhere.classList.remove('carrouselFrameHere');
                            ancienhere.classList.add('carrouselFrameNotHere');
                            carrouselFrame.classList.remove('carrouselFrameNotHere');
                            carrouselFrame.classList.add('carrouselFrameHere');
                            carrouselDot.classList.remove('carrouselDotNotHere');
                            carrouselDot.classList.add('carrouselDotHere');
                        });
                        carrouselNavigator.appendChild(carrouselDot);
                        break;
                    }
                }
                page++;
            }
        });
    intervalOfCarouselSlide = setInterval(slideAuto, 5000);
});

function slideAuto() {
    let ancienhere = document.querySelector('.carrouselFrameHere');
    let carrouselNews = document.getElementById('carrouselNews');
    let carrouselNavigator = document.getElementById('carrouselNavigator');
    let suivant = ancienhere.nextElementSibling;
    if (suivant === null) {
        suivant = carrouselNews.firstElementChild;
    }
    suivant.classList.remove('carrouselFrameNotHere');
    suivant.classList.add('carrouselFrameHere');
    let ancienhereDot = document.querySelector('.carrouselDotHere');
    ancienhereDot.classList.remove('carrouselDotHere');
    ancienhereDot.classList.add('carrouselDotNotHere');
    let suivantDot = ancienhereDot.nextElementSibling;
    if (suivantDot === null) {
        suivantDot = carrouselNavigator.firstElementChild;
    }
    suivantDot.classList.remove('carrouselDotNotHere');
    suivantDot.classList.add('carrouselDotHere');
    ancienhere.classList.remove('carrouselFrameHere');
    ancienhere.classList.add('carrouselFrameNotHere');
}

/*let params = {
    mode: 'game',
}

let search = () => { };

document.addEventListener("DOMContentLoaded", function () {
    const username = 'riviereteo';
    const repository = 'game';
    let allCommits = [];
    let page = 1;

    function fetchAllCommits() {
        const apiUrl = `https://api.github.com/repos/${username}/${repository}/commits?page=${page}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La requête a échoué');
                }
                return response.json();
            })
            .then(commits => {
                if (commits.length > 0) {
                    allCommits = allCommits.concat(commits);
                    page++;
                    fetchAllCommits();
                } else {
                    displayCommits(allCommits);
                }
            })
            .catch(error => console.error('Erreur lors de la récupération des commits:', error));
    }

    function displayCommits(commits) {
        const commitsContainer = document.getElementById('gameContainer');
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
            commitsContainer.appendChild(commitparent);
        });
        checkup();
    }

    fetchAllCommits();

    make();
});

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
            search = () => {
                switch (params.mode) {
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
            }
            searchBar.addEventListener('input', search);
            menuRight.insertBefore(searchBar, searchButton);
            searchBar.focus();
        } else {
            document.getElementById('searchBar').style.animation = 'searchBarDisappear 0.5s ease-in-out forwards';
            setTimeout(() => {
                document.getElementById('searchBar').remove();
            }, 500);
            document.getElementById('searchBar').value = '';
            search();
            search = () => { };
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
        search();
    });
    itemMenuExp.addEventListener('click', () => {
        params.mode = 'exp';
        checkup();
        search();
    });
    itemMenuNews.addEventListener('click', () => {
        params.mode = 'news';
        checkup();
        search();
    });
    menu.appendChild(itemMenuGame);
    menu.appendChild(itemMenuExp);
    menu.appendChild(itemMenuNews);
    document.getElementById('gameBigparent').appendChild(menu);
    document.getElementById('gameBigparent').appendChild(menuRight);
    const gameContainer = document.createElement('div');
    gameContainer.id = 'gameContainer';
    document.getElementById('gameBigparent').appendChild(gameContainer);
    Object.values(games).forEach(game => {
        const jeux = document.createElement('div');
        jeux.className = 'game';
        const img = document.createElement('img');
        img.src = game.img;
        img.alt = game.titre;
        img.className = 'imgGame';
        const parentGameOnLeftImg = document.createElement('div');
        parentGameOnLeftImg.className = 'parentGameOnLeftImg';
        const name = document.createElement('p');
        name.textContent = game.titre;
        name.className = 'titreGame';
        const date = document.createElement('p');
        date.textContent = game.Date;
        date.className = 'dateGame';
        jeux.appendChild(img);
        parentGameOnLeftImg.appendChild(name);
        parentGameOnLeftImg.appendChild(date);
        jeux.appendChild(parentGameOnLeftImg);
        jeux.addEventListener('click', () => start(game.link));
        jeux.dataset.type = game.type;
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
}*/
