function numMagicSquaresInside(grid: number[][]) {
    let counter = 0;

    if(!grid.length) return counter;

    const rows = grid.length;
    const cols = grid[0].length;

    if(cols <= 10) {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                if((i + 2) < rows && (j + 2) < cols) {
                    const isMagic = checkMagicSquare(i, j, grid);
                    if(isMagic) counter++;
                }
            }
        }
    }

    return counter;
};

function checkSubSquareValues(grid: number[][]) {
    const flatArray = grid.flat();
    const sortedArray = flatArray.sort((a, b) => a - b);
    return sortedArray.every((item, index) => item === (index + 1));
}

function checkMagicSquare(rowIdx: number, colIdx: number, grid: number[][]) {
    let subgrid: number[][] = [];
    for(let i = 0; i < 3; i++) {
        subgrid[i] = [];
        for(let j = 0; j < 3; j++) {
            subgrid[i][j] = grid[rowIdx + i][colIdx + j];
        }
    }

    if(!checkSubSquareValues(subgrid)) return false;
    
    let rowSum = [0, 0, 0];
    let colSum = [0, 0, 0];
    let diagSum = [0, 0];

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            rowSum[i] += subgrid[i][j];
            colSum[j] += subgrid[i][j];

            if(i === j) {
                diagSum[0] += subgrid[i][j];
            } 
            
            if((i + j) === 2) {
                diagSum[1] += subgrid[i][j];
            }
        }
    }

    const fusion = [...rowSum, ...colSum, ...diagSum];
    return fusion.every(item => item === rowSum[0]);
}

console.log(numMagicSquaresInside([[4,3,8,4],[9,5,1,9],[2,7,6,2]]));