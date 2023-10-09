let grid = [];
let probabilityGrid = [];
let gridSize;
let shipSizes = [];

function setupGrid() {
    const gridDiv = document.getElementById('grid');
    gridDiv.innerHTML = ''; // Reset the grid

    gridSize = parseInt(document.getElementById('gridSize').value);
    const numShips = parseInt(document.getElementById('numShips').value);
    const sizes = document.getElementById('shipSizes').value.split(',').map(Number);

    if (sizes.length !== numShips) {
        alert('Mismatch between number of ships and provided sizes!');
        return;
    }

    shipSizes = sizes;

    // Initialize the grid arrays
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        probabilityGrid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = ''; // can be '', 'hit', 'miss'
            probabilityGrid[i][j] = 0;
        }
    }

    calculateProbability();
    renderGrid();
}

function calculateProbability() {
    // Reset probability
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            probabilityGrid[i][j] = 0;
        }
    }

    for (const size of shipSizes) {
        for (let i = 0; i <= gridSize - size; i++) {
            for (let j = 0; j < gridSize; j++) {
                let valid = true;
                for (let k = 0; k < size; k++) {
                    if (grid[i + k][j] === 'miss' || grid[i + k][j] === 'hit') {
                        valid = false;
                        break;
                    }
                }
                if (valid) {
                    for (let k = 0; k < size; k++) {
                        probabilityGrid[i + k][j]++;
                    }
                }
            }
        }

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j <= gridSize - size; j++) {
                let valid = true;
                for (let k = 0; k < size; k++) {
                    if (grid[i][j + k] === 'miss' || grid[i][j + k] === 'hit') {
                        valid = false;
                        break;
                    }
                }
                if (valid) {
                    for (let k = 0; k < size; k++) {
                        probabilityGrid[i][j + k]++;
                    }
                }
            }
        }
    }
}

function renderGrid() {
    const gridDiv = document.getElementById('grid');
    gridDiv.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell ' + grid[i][j];
            cell.textContent = probabilityGrid[i][j];
            cell.addEventListener('click', () => handleCellClick(i, j));
            gridDiv.appendChild(cell);
        }
    }
}

function handleCellClick(i, j) {
    const choice = prompt('Is it a hit or a miss? (hit/miss)', 'miss');

    if (choice === 'hit' || choice === 'miss') {
        grid[i][j] = choice;

        if (choice === 'hit') {
            markAdjacentCells(i, j);
        }
        calculateProbability();
        renderGrid();
    }
}

function markAdjacentCells(i, j) {
    if (i > 0 && grid[i - 1][j] !== 'miss') grid[i - 1][j] = 'hit';
    if (i < gridSize - 1 && grid[i + 1][j] !== 'miss') grid[i + 1][j] = 'hit';
    if (j > 0 && grid[i][j - 1] !== 'miss') grid[i][j - 1] = 'hit';
    if (j < gridSize - 1 && grid[i][j + 1] !== 'miss') grid[i][j + 1] = 'hit';
}

