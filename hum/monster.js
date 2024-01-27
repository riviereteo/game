var width = document.body.clientWidth / 2;
var height = document.body.clientHeight / 2;

document.addEventListener('DOMContentLoaded', main);

function main() {
    const params = formulaire();
    if (params.nb == 'aleatoire') {
        var nb = Math.floor(Math.random() * 20) + 3;
    } else {
        var nb = params.nb;
    }
    let accroches = [];

    // Créer un tableau pour stocker les vitesses de chaque boule
    let vitesses = [];

    for (var i = 0; i < nb; i++) {
        var accroche = document.createElement('div');
        accroche.className = 'accroche';
        accroche.style.position = 'absolute';
        accroche.dataset.out = "-1";

        if (i == 0) {
            accroche.style.top = height + 'px';
            accroche.style.left = width + 'px';
        } else {
            var theaccroches = Math.floor(Math.random() * accroches.length);
            var theaccroche = accroches[theaccroches];
            var top = 0;
            var left = 0;
            while (Math.abs(top) < 15 || estproche(top, left, accroches, theaccroches, theaccroche)) {
                top = Math.floor(Math.random() * 100) - 50;
            }
            while (Math.abs(left) < 15 || estproche(top, left, accroches, theaccroches, theaccroche)) {
                left = Math.floor(Math.random() * 100) - 50;
            }
            if (theaccroche.style.top == height && theaccroche.style.left == width) {
                accroche.style.top = document.body.clientHeight / 2 + top + 'px';
                accroche.style.left = document.body.clientWidth / 2 + left + 'px';
            } else {
                accroche.style.top = parseInt(theaccroche.style.top) + top + 'px';
                accroche.style.left = parseInt(theaccroche.style.left) + left + 'px';
            }
            accroche.dataset.in = theaccroche.dataset.im;
            theaccroche.dataset.out += "," + i;
        }
        accroche.dataset.im = i;
        accroches.push(accroche);
        document.body.appendChild(accroche);

        // Initialiser les vitesses aléatoirement
        vitesses.push({
            x: Math.random() * 2 - 1, // Valeurs entre -1 et 1
            y: Math.random() * 2 - 1
        });
    }
    if (params.type == "tumeur") {
        accroches.forEach(element => {
            element.dataset.out = "-2";
            accroches.forEach(element2 => {
                element.dataset.out += "," + element2.dataset.im;
            });
        });
    }
    mvt(accroches);
}

function estproche(top, left, accroches, theaccroches, theaccroche) {
    if (theaccroche.style.top == height && theaccroche.style.left == width) {
        top = document.body.clientHeight / 2 + top;
        left = document.body.clientWidth / 2 + left;
    } else {
        top = parseInt(theaccroche.style.top) + top;
        left = parseInt(theaccroche.style.left) + left;
    }
    for (var i = 0; i < accroches.length; i++) {
        if (i != theaccroches) {
            var accroche = accroches[i];
            var top2 = parseInt(accroche.style.top);
            var left2 = parseInt(accroche.style.left);
            if (Math.abs(top - top2) < 15 && Math.abs(left - left2) < 15) {
                return true;
            }
        }
    }
}

// Fonction pour dessiner les lignes entre les éléments
function dessinerLignes(accroches, tumeur) {
    document.querySelectorAll('canvas').forEach((canvas) => {
        canvas.remove();
    });
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (tumeur) {
        accroches.forEach(element => {
            for( var i = 0; i < nbmoins1acrrout(element); i++){
                const x1 = parseInt(element.style.left) + element.offsetWidth / 2;
                const y1 = parseInt(element.style.top) + element.offsetHeight / 2;
                const targetIndex = parseInt(element.dataset.out.split(",")[i + 1]);
                const targetAccroche = accroches[targetIndex];
                const x2 = parseInt(targetAccroche.style.left) + targetAccroche.offsetWidth / 2;
                const y2 = parseInt(targetAccroche.style.top) + targetAccroche.offsetHeight / 2;
    
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
    } else {
        accroches.forEach((accroche) => {
            for (var i = 0; i < nbmoins1acrrout(accroche); i++) {
                const x1 = parseInt(accroche.style.left) + accroche.offsetWidth / 2;
                const y1 = parseInt(accroche.style.top) + accroche.offsetHeight / 2;
                const targetIndex = parseInt(accroche.dataset.out.split(",")[i + 1]);
                const targetAccroche = accroches[targetIndex];
                const x2 = parseInt(targetAccroche.style.left) + targetAccroche.offsetWidth / 2;
                const y2 = parseInt(targetAccroche.style.top) + targetAccroche.offsetHeight / 2;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
    }
}

function nbmoins1acrrout(accroche) {
    var out = accroche.dataset.out;
    if (out == "-1") {
        return 0;
    } else {
        return out.split(",").length - 1;
    }
}

function nbmoins1acrrin(accroche) {
    if (accroche.dataset.in) {
        return 1;
    }
    return 0;
}

var onreload = false;
window.addEventListener('beforeunload', function (e) {
    onreload = true;
});

function mvt(accroches) {
    var accroche = accroches[Math.floor(Math.random() * accroches.length)];
    var tumeur = false;
    if (accroche.dataset.out.split(",")[0] == "-2") {
        tumeur = true;
        //bouger l'accroche aléatoirement dans un rayon de 50px autour de son centre
        const x = parseInt(accroche.style.left) + accroche.offsetWidth / 2;
        const y = parseInt(accroche.style.top) + accroche.offsetHeight / 2;
        const coor = randomPointOnCircle(50, x, y);
        accroche.style.top = coor.y + 'px';
        accroche.style.left = coor.x + 'px';
    } else {
        const nb = nbmoins1acrrout(accroche) + nbmoins1acrrin(accroche);
        switch (nb) {
            case 1:
                //partie seul au bout
                mvtseul(accroche, accroches);
                break;
            case 2:
                //partie entre deux
                mvtdouble(accroche, accroches);
                break;
            default:
                break;
        }
    }
    dessinerLignes(accroches, tumeur);
    if (!onreload) {
        requestAnimationFrame(() => {
            mvt(accroches);
        });
    }
}

let rayons = [];
function mvtseul(accroche, accroches) {
    //récupérer le in ou le out
    var inorout = accroche.dataset.in;
    if (!inorout) {
        inorout = accroche.dataset.out.split(",")[1];
    }
    var targetAccroche = accroches[inorout];
    var rayon = 0;
    var x2 = parseInt(targetAccroche.style.left) + targetAccroche.offsetWidth / 2;
    var y2 = parseInt(targetAccroche.style.top) + targetAccroche.offsetHeight / 2;
    for (var i = 0; i < rayons.length; i++) {
        if ((rayons[i][0] == accroche.dataset.im && rayons[i][1] == targetAccroche.dataset.im) || (rayons[i][0] == targetAccroche.dataset.im && rayons[i][1] == accroche.dataset.im)) {
            rayon = rayons[i][2];
            break;
        }
    }
    if (rayon == 0) {
        var x1 = parseInt(accroche.style.left) + accroche.offsetWidth / 2;
        var y1 = parseInt(accroche.style.top) + accroche.offsetHeight / 2;
        rayon = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        rayons.push([accroche.dataset.im, targetAccroche.dataset.im, rayon]); // Utilisez push pour ajouter un nouvel élément
    }
    let coor = randomPointOnCircle(rayon, x2, y2);
    accroche.style.top = coor.y + 'px';
    accroche.style.left = coor.x + 'px';
}

function mvtdouble(accroche, accroches) {
    const accin = accroche.dataset.im == 0 ? accroche.dataset.out.split(",")[2] : accroche.dataset.in;
    const accout = accroche.dataset.out.split(",")[1];
    const accrochein = accroches[accin];
    const accrocheout = accroches[accout];
    const x = (parseInt(accrochein.style.left) + parseInt(accrocheout.style.left)) / 2;
    const y = (parseInt(accrochein.style.top) + parseInt(accrocheout.style.top)) / 2;
    const distAccAccin = Math.sqrt(Math.pow(accrochein.style.left - accroche.style.left, 2) + Math.pow(accrochein.style.top - accroche.style.top, 2));
    const distAccAccout = Math.sqrt(Math.pow(accrocheout.style.left - accroche.style.left, 2) + Math.pow(accrocheout.style.top - accroche.style.top, 2));
    //déplacer accroche vers le milieu
    accroche.style.top = y + 'px';
    accroche.style.left = x + 'px';
    //déplacer accrochein dans un rayon de distAccAccin autour de accroche
    const coorin = randomPointOnCircle(distAccAccin, x, y);
    accrochein.style.top = coorin.y + 'px';
    accrochein.style.left = coorin.x + 'px';
    //déplacer accrocheout dans un rayon de distAccAccout autour de accroche
    const coorout = randomPointOnCircle(distAccAccout, x, y);
    accrocheout.style.top = coorout.y + 'px';
    accrocheout.style.left = coorout.x + 'px';
}

// Fonction pour générer une valeur aléatoire entre 0 et 1
function random() {
    return Math.random();
}

// Fonction pour choisir un angle aléatoire en radians (entre 0 et 2π)
function randomAngle() {
    return 2 * Math.PI * random();
}

// Fonction pour choisir un point aléatoire sur un cercle
function randomPointOnCircle(radius, centerX, centerY) {
    // Génère un angle aléatoire en radians
    const angle = randomAngle();

    // Calcule les coordonnées du point sur le cercle
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Retourne les coordonnées du point
    return { x, y };
}

function formulaire() {
    //demande à l'utilisateur si il veut un nombre aléatoire de boules ou un nombre précis
    //si nombre précis, demande le nombre de boules
    //demander option tumeur ou option monster
    let params = {
        nb: 0,
        type: "monster"
    };
    //choix aléatoire ou précis
    var choix = prompt("Voulez-vous un nombre aléatoire de boules ? (oui/non)");
    if (choix == "oui") {
        params.nb = 'aleatoire'
    } else {
        params.nb = prompt("Combien de boules voulez-vous ?");
        while (isNaN(params.nb)) {
            params.nb = prompt("Veuillez entrer un nombre");
        }
    }
    //choix tumeur ou monster
    var choix = prompt("Voulez-vous une tumeur ou un monstre ? (tumeur/monstre)");
    while (choix != "tumeur" && choix != "monstre") {
        choix = prompt("Veuillez entrer tumeur ou monstre");
    }
    params.type = choix;
    return params;
}