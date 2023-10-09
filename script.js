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

    // Set grid columns
    gridDiv.style.gridTemplateColumns = `repeat(${gridSize}, 30px)`;

    // Initialize the grid arrays
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        probabilityGrid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = ''; // can be '', 'hit', 'miss'
            probabilityGrid[i][j] = 0;
        }
    }

