var ancienneFonction2 = window.onload;
var minlargeurPièces = 50;
var maxlargeurPièces = 110;
var marginPiècesRight = 25;
let alll8888;
let allcolorsPièces = [['#38bd8a', '#cd89a3', '#ba5e82', '#56957d', '#2c3a35'],
['#ecc068', '#7a9bdc', '#5a82d3', '#9e8147', '#554c3a'],
['#f2c615', '#617be0', '#76672e', '#675f42', '#b6de59'],
['#277bfa', '#ebc489', '#dd9a36', '#2a4874', '#354255'],
['#ef3447', '#60dc92', '#68afde', '#9a6ddf', '#d37536'],
['#9de4fb', '#e99f86', '#da5e34', '#34778d', '#375058'],
['#7fc12e', '#4bba45', '#9498e5', '#f0c9f2', '#beb950']];
let thepiècehovered = null;
var allpiècesisclicked = false;
var nbpièceschao = 0;
var throttleTimeout;

window.onload = function () {
    if (ancienneFonction2) {
        ancienneFonction2();
    }
    piècesContainer = document.createElement('div');
    piècesContainer.classList.add('pièces-container');
    document.body.appendChild(piècesContainer);
    piècesContainer.style.width = document.body.clientWidth - piècesContainer.offsetLeft + 'px';
    alll8888 = piècesContainer.offsetLeft;
    var widthallpièces = 0;
    let widthofallpièces = [];
    while (widthallpièces + 30 < document.body.clientWidth) {
        var width = Math.floor(Math.random() * ((maxlargeurPièces + widthofallpièces.length / 10) - (minlargeurPièces + widthofallpièces.length / 5) + 1)) + (minlargeurPièces + widthofallpièces.length / 5);
        widthallpièces += width + marginPiècesRight;
        widthofallpièces.push(width);
    }
    var sens = null;
    var déjàsensinverse = false;
    var anciennecouleur = 0;
    var couleur = 0;
    //choisir une palette de couleur aléatoire
    var allcolors = allcolorsPièces[Math.floor(Math.random() * allcolorsPièces.length)];
    for (var i = 0; i < widthofallpièces.length; i++) {
        pièce = document.createElement('div');
        pièce.classList.add('pièce');
        pièce.style.width = widthofallpièces[i] + 'px';
        height = Math.floor(Math.random() * (document.body.clientHeight / 2.5 - document.body.clientHeight / 8.5 + 1)) + document.body.clientHeight / 4;
        pièce.style.height = height + 'px';
        pièce.style.borderRadius = widthofallpièces[i] / 7 + 'px';
        pièce.dataset.ischao = 'true';
        // lui donner une couleur aléatoire
        anciennecouleur = couleur;
        couleur = Math.floor(Math.random() * 5);
        if (anciennecouleur == couleur) {
            couleur = Math.floor(Math.random() * 5);
        }
        pièce.style.backgroundColor = allcolors[couleur];
        pièce.style.marginRight = marginPiècesRight + 'px';
        piècesContainer.appendChild(pièce);
        //choisir le sens du slide vertical aléatoirement
        var anciensens = sens;
        sens = Math.floor(Math.random() * 2);
        if (anciensens == sens) {
            if (!déjàsensinverse) {
                sens = Math.floor(Math.random() * 2);
            }
            déjàsensinverse = !déjàsensinverse;
        }
        if (sens == 0) {
            pièce.dataset.direction = 'up';
            dessinerFlèche(pièce, 'up');
        } else {
            pièce.dataset.direction = 'down';
            dessinerFlèche(pièce, 'down');
        }
        pièce.addEventListener('mouseover', function (e) {
            thepiècehovered = this;
        });
        pièce.addEventListener('mouseout', function (e) {
            if (this.dataset.direction == 'up') {
                this.classList.remove('pièce-active-draging-up');
            } else {
                this.classList.remove('pièce-active-draging-down');
            }
            thepiècehovered = null;
        });
        pièce.addEventListener('mousedown', function (e) {
            var event = new Event("focus");
            document.documentElement.dispatchEvent(event);
            if (this == thepiècehovered) {
                allpiècesisclicked = true;
                if (thepiècehovered.dataset.direction == 'up') {
                    thepiècehovered.classList.add('pièce-active-draging-up');
                } else {
                    thepiècehovered.classList.add('pièce-active-draging-down');
                }
            }
        });
        document.addEventListener('mouseup', function (e) {
            var event = new Event("focus");
            document.documentElement.dispatchEvent(event);
            allpiècesisclicked = false;
            if (thepiècehovered) {
                if (thepiècehovered.dataset.direction == 'up') {
                    thepiècehovered.classList.remove('pièce-active-draging-up');
                } else {
                    thepiècehovered.classList.remove('pièce-active-draging-down');
                }
            }
        });
        document.addEventListener('mousemove', function (e) {
            if (allpiècesisclicked && thepiècehovered) {
                clearTimeout(throttleTimeout);
                throttleTimeout = setTimeout(function () {
                    if (thepiècehovered.dataset.direction == 'up') {
                        var index = Array.prototype.indexOf.call(thepiècehovered.parentNode.children, thepiècehovered);
                        if (e.movementY < - 15 + index / 9 - thepiècehovered.clientHeight / 120) {
                            thepiècehovered.style.animation = 'slide-up 0.5s forwards';
                            handlePieceRemoval(thepiècehovered);
                        }
                    } else {
                        var index = Array.prototype.indexOf.call(thepiècehovered.parentNode.children, thepiècehovered);
                        if (e.movementY > 15 - index / 9 + thepiècehovered.clientHeight / 110) {
                            thepiècehovered.style.animation = 'slide-down 0.5s forwards';
                            handlePieceRemoval(thepiècehovered);
                        }
                    }
                }, 3);
            }
        });
    }
};

function handlePieceRemoval(piece) {
    if (thepiècehovered.dataset.ischao == 'true') {
        alll8888 = piècesContainer.offsetLeft;
        thepiècehovered.dataset.ischao = 'false';
        const children = thepiècehovered.parentNode.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const isChao = child.dataset.ischao;

            if (isChao == 'false') {
                alll8888 += child.clientWidth + marginPiècesRight;
            } else {
                break;
            }
        }

        document.getElementById('divpanneauscore').children[1].innerHTML = 'Pièces sauvées : ' + ++nbpièceschao;
    }
    thepiècehovered.dataset.ischao = 'false';
    thepiècehovered = null;
    allpiècesisclicked = false;
}

function dessinerFlèche(pièce, direction) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', pièce.offsetWidth);
    svg.setAttribute('height', pièce.offsetHeight);
    svg.setAttribute('class', 'triangles-container');

    var triangleHeight = pièce.offsetHeight / 6; // Hauteur d'un triangle en fonction de la taille de la pièce
    var spacing = pièce.offsetHeight / 20; // Espacement entre les triangles

    if (direction == 'up') {
        var totalHeight = (triangleHeight + spacing) * 3; // Hauteur totale de la viewBox en fonction de la taille des triangles et des espacements
    } else {
        var totalHeight = (triangleHeight + spacing) * 3 - triangleHeight / 2; // Hauteur totale de la viewBox en fonction de la taille des triangles et des espacements
    }
    var viewBoxWidth = 100; // Largeur fixe de la viewBox

    svg.setAttribute('viewBox', '0 0 ' + viewBoxWidth + ' ' + totalHeight);
    svg.style.display = 'flex'; // Centrer les triangles horizontalement

    for (var i = 0; i < 3; i++) {
        var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        var yOffset = i * (triangleHeight + spacing); // Calcul de l'offset en fonction de l'index

        if (direction == 'up') {
            polygon.setAttribute('points', '0,' + (yOffset + triangleHeight) + ' ' + (viewBoxWidth / 2) + ',' + yOffset + ' ' + viewBoxWidth + ',' + (yOffset + triangleHeight));
        } else {
            polygon.setAttribute('points', '0,' + yOffset + ' ' + (viewBoxWidth / 2) + ',' + (yOffset + triangleHeight) + ' ' + viewBoxWidth + ',' + yOffset);
        }

        polygon.setAttribute('fill', '#ffffff');
        svg.appendChild(polygon);
    }
    pièce.appendChild(svg);
}
