const startThermalGradient = function (cell) {
    let neighbors = neighborsOfThermalGradient(cell);
    return calcThermalGradient(neighbors);
}

const neighborsOfThermalGradient = function (cell) {
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

const calcThermalGradient = function (neighbors) {
    const sum = neighbors.reduce((acc, cur) => acc + cur.value, 0);
    const average = sum / neighbors.length;
    const max = Math.max(...neighbors.map(n => n.value));
    return (average + max) / 2;
}