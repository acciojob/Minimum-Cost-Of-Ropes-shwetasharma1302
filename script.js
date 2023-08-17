function calculateMinCost() {
    const ropeLengthsInput = document.getElementById("ropeLengths").value;
    const ropeLengthsArray = ropeLengthsInput.split(",").map(length => parseInt(length.trim(), 10));

    const minCost = calculateMinimumCost(ropeLengthsArray);
    const resultDiv = document.getElementById("result");
    resultDiv.innerText = "Minimum cost of ropes: " + minCost;
}

function calculateMinimumCost(ropeLengths) {
    if (ropeLengths.length === 0) {
        return 0;
    }

    // Using a priority queue (min heap) to efficiently retrieve the smallest rope lengths
    const priorityQueue = new MinHeap();
    for (const length of ropeLengths) {
        priorityQueue.insert(length);
    }

    let totalCost = 0;

    while (priorityQueue.size() > 1) {
        const smallestRope1 = priorityQueue.extractMin();
        const smallestRope2 = priorityQueue.extractMin();

        const newRope = smallestRope1 + smallestRope2;
        totalCost += newRope;

        priorityQueue.insert(newRope);
    }

    return totalCost;
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    extractMin() {
        const minValue = this.heap[0];
        const lastValue = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = lastValue;
            this.bubbleDown(0);
        }

        return minValue;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) {
                break;
            }

            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallestIndex = index;

        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
            smallestIndex = leftChildIndex;
        }

        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
            smallestIndex = rightChildIndex;
        }

        if (smallestIndex !== index) {
            [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
            this.bubbleDown(smallestIndex);
        }
    }
}

window.calculateMinCost = calculateMinCost;
