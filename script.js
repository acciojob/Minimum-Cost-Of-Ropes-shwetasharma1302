function calculateMinCost() {
    const ropeLengthsInput = document.getElementById("ropeLengths").value;
    const ropeLengthsArray = ropeLengthsInput.split(",").map(length => parseInt(length.trim(), 10));

    const minCost = calculateMinimumCost(ropeLengthsArray);
    const resultDiv = document.getElementById("result");
    resultDiv.innerText = "Minimum cost of ropes: " + minCost;
}

function calculateMinimumCost(ropeLengths) {
    // Implementing the minimum cost calculation logic
    ropeLengths.sort((a, b) => a - b);
    let totalCost = 0;

    while (ropeLengths.length > 1) {
        const newRope = ropeLengths.shift() + ropeLengths.shift();
        totalCost += newRope;
        ropeLengths.push(newRope);
        ropeLengths.sort((a, b) => a - b);
    }

    return totalCost;
}

