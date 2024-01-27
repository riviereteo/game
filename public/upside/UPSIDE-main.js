const ancienneFonction3 = window.onload;
window.onload = main();

function main() {
    if (ancienneFonction3) {
        ancienneFonction3();
    }
    const divDepart = setupDépart();
    const divpanneauscore = setupPanneauScore();
    startDépart(divDepart, divpanneauscore);
}

function setupDépart(){
    var divDepart = document.createElement('div');
    divDepart.setAttribute('id', 'divDepart');
    divDepart.innerHTML = '3';
    document.body.appendChild(divDepart);
    document.body.style.pointerEvents = 'none';
    return divDepart;
}

function setupPanneauScore(){
    let divpanneauscore = document.createElement('div');
    divpanneauscore.setAttribute('id', 'divpanneauscore');
    let lengthdivpanneauscore = document.createElement('p');
    divpanneauscore.appendChild(lengthdivpanneauscore);
    let nbpiècedivpanneauscore = document.createElement('p');
    divpanneauscore.appendChild(nbpiècedivpanneauscore);
    nbpiècedivpanneauscore.innerHTML = 'Pièces sauvées : 0';
    let divbuttonspanneauscore = document.createElement('div');
    divbuttonspanneauscore.setAttribute('id', 'divbuttonspanneauscore');
    divpanneauscore.appendChild(divbuttonspanneauscore);
    divpanneauscore.style.display = 'none';
    document.body.appendChild(divpanneauscore);
    return divpanneauscore;
}

function startDépart(divDepart, divpanneauscore){
    setTimeout(function () {
        divDepart.innerHTML = '2';
        setTimeout(function () {
            divDepart.innerHTML = '1';
            setTimeout(function () {
                divDepart.innerHTML = ' GO!';
                divDepart.style.color = 'rgb(248, 21, 21)';
                document.body.style.pointerEvents = 'auto';
                divpanneauscore.style.display = 'flex';
                setTimeout(function () {
                    divDepart.remove();
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}