const math = require('mathjs');
const nerdamer = require('nerdamer');
require('nerdamer/Algebra');
require('nerdamer/Solve');

module.exports = {
    basic: (expression) => {
        if (!expression) throw new Error('Please provide a math expression, e.g., `2+2`.');
        return math.evaluate(expression);
    },

    solve: (equation) => {
        if (!equation) throw new Error('Please provide an equation, e.g., `x^2 - 4 = 0`.');
        if (!equation.includes('=')) throw new Error('Equation must contain `=` (e.g., `x^2 - 4 = 0`).');
        let solutions = nerdamer.solve(equation, 'x');
        let solutionArray = [];
        if (solutions.symbol && solutions.symbol.elements) {
            solutionArray = solutions.symbol.elements.map(s => nerdamer(s).evaluate().toString());
        } else {
            solutionArray = [nerdamer(solutions).evaluate().toString()];
        }
        if (solutionArray.length === 0) throw new Error('No solutions found.');
        return solutionArray.map(s => s.replace(/[\[\]]/g, '')).join(', ');
    },

    derive: (expression) => {
        if (!expression) throw new Error('Please provide an expression, e.g., `x^2`.');
        return math.derivative(expression, 'x').toString();
    },

    integrate: (expression) => {
        if (!expression) throw new Error('Please provide an expression, e.g., `x^2`.');
        return nerdamer.integrate(expression, 'x').toString();
    },

    matrix: (operation, matrixStr) => {
        if (!operation || !matrixStr) throw new Error('Please provide an operation and matrix, e.g., `det [[1,2],[3,4]]`.');
        const matrix = math.evaluate(matrixStr);
        if (operation === 'det') {
            return math.det(matrix);
        } else if (operation === 'inv') {
            // Convert matrix to plain array and format as string
            const invMatrix = math.inv(matrix);
            return JSON.stringify(math.matrix(invMatrix).toArray());
        } else {
            throw new Error('Supported matrix operations: `det`, `inv`.');
        }
    },

    convert: (value, fromUnit, toUnit) => {
        if (isNaN(value) || !fromUnit || !toUnit) {
            throw new Error('Please provide a valid conversion, e.g., `10 km to miles`.');
        }
        return math.unit(value, fromUnit).to(toUnit).toString();
    },
    percent: (operation, value, percentage) => {
        if (!operation || isNaN(value) || isNaN(percentage)) {
            throw new Error('Please provide a valid operation (increase/decrease), value, and percentage, e.g., `increase 100 by 20`.');
        }
        if (operation.toLowerCase() === 'increase') {
            return value * (1 + percentage / 100);
        } else if (operation.toLowerCase() === 'decrease') {
            return value * (1 - percentage / 100);
        } else {
            throw new Error('Operation must be `increase` or `decrease`.');
        }
    }
};