const startMake = function (cell) {
    return calcMake(neighborsOfMake(cell));
}

const neighborsOfMake = function (cell) {
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
                        neighbors[neighbors.length - 1].value = neighbors[neighbors.length - 1].value * 1.007;
                    }
                    else {
                        if ((neighbors[neighbors.length - 1].value * 10) < 1) neighbors[neighbors.length - 1].value = neighbors[neighbors.length - 1].value /10;
                    }
                }
            }
        }
    }

    return neighbors;
}

const calcMake = function (neighbors) {
    let total = 0;
    neighbors.forEach(neighbor => {
        total += neighbor.value;
    });
    return total / neighbors.length;
}