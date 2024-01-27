const startLife = function (cell) {
    let neighbors = neighborsOfLife(cell);
    return calcLife(neighbors, cell.value);
}

const neighborsOfLife = function (cell) {
    let neighbors = [];
    let index = cells.indexOf(cell);
    let row = Math.floor(index / cellCountWidth);
    let column = index % cellCountWidth;

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = column - 1; j <= column + 1; j++) {
            if (i >= 0 && i < cellCountHeight && j >= 0 && j < cellCountWidth) {
                const neighborIndex = i * cellCountWidth + j;
                if (neighborIndex !== index) neighbors.push(cells[neighborIndex]);
            }
        }
    }

    return neighbors;
}

const calcLife = function (neighbors, value) {
    let neighborCount = 0;
    neighbors.forEach(neighbor => {
        if (neighbor.value > 0) neighborCount++;
    });
    if (neighborCount === 3) return 1;
    if (neighborCount === 2) return value;
    return 0;
}