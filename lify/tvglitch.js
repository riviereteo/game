const startGlitchTV = function (cell) {
    return calcGlitchTV(neighborsOfGlitchTV(cell));
}

const neighborsOfGlitchTV = function (cell) {
    let neighbors = [];
    let index = cells.indexOf(cell);
    let row = Math.floor(index / cellCountWidth);
    let column = index % cellCountWidth;

    for (let i = row - 2; i <= row + 2; i++) {
        for (let j = column - 2; j <= column + 2; j++) {
            if (i >= 0 && i < cellCountHeight && j >= 0 && j < cellCountWidth) {
                const neighborIndex = i * cellCountWidth + j;
                if (neighborIndex !== index) {
                    neighbors.push(cells[neighborIndex]);
                    if (i == row - 2 || i == row + 2 || j == column - 2 || j == column + 2) {
                        neighbors[neighbors.length - 1].value = neighbors[neighbors.length - 1].value * 0.901;
                    }
                    else {
                        if ((neighbors[neighbors.length - 1].value * 5) < 1) neighbors[neighbors.length - 1].value = neighbors[neighbors.length - 1].value * 5;
                    }
                }
            }
        }
    }

    return neighbors;
}

const calcGlitchTV = function (neighbors) {
    let total = 0;
    neighbors.forEach(neighbor => {
        total += neighbor.value;
    });
    return total / neighbors.length;
}