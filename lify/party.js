const startParty = function (cell) {
    let multiplier;
    
    if (cell.value < 0.1) {
        multiplier = 2.5;
    } else if (cell.value < 0.2) {
        multiplier = 2.4;
    } else if (cell.value < 0.3) {
        multiplier = 2.3;
    } else if (cell.value < 0.4) {
        multiplier = 2.2;
    } else if (cell.value < 0.5) {
        multiplier = 2.1;
    } else if (cell.value < 0.6) {
        multiplier = 0.08;
    } else if (cell.value < 0.7) {
        multiplier = 0.07;
    } else if (cell.value < 0.8) {
        multiplier = 0.06;
    } else if (cell.value < 0.9) {
        multiplier = 0.05;
    } else {
        multiplier = 0.04;
    }
    
    return cell.value * multiplier;
}