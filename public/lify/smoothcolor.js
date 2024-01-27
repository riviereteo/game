const startSmooth = function (cell) {
    let neighbors = neighborsOfSmooth(cell);
    cell.value = calcSmooth(neighbors);
    setColor(cell);
}

const neighborsOfSmooth = function (cell) {
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

const calcSmooth = function (neighbors) {
    let sum = 0;
    neighbors.forEach(neighbor => {
        sum += neighbor.value;
    });
    return sum / neighbors.length;
}