const commands = require('../utils/commands');

describe('MathBot Commands', () => {
    // Basic Command
    describe('basic', () => {
        test('evaluates simple arithmetic', () => {
            expect(commands.basic('2 + 2')).toBe(4);
        });

        test('evaluates trigonometric functions', () => {
            expect(commands.basic('sin(0)')).toBe(0);
        });

        test('throws error for empty expression', () => {
            expect(() => commands.basic('')).toThrow('Please provide a math expression');
        });
    });

    // Solve Command
    describe('solve', () => {
        test('solves quadratic equation x^2 - 4 = 0', () => {
            expect(commands.solve('x^2 - 4 = 0')).toBe('2, -2');
        });

        test('solves linear equation 2x + 3 = 7', () => {
            expect(commands.solve('2x + 3 = 7')).toBe('2');
        });

        test('throws error for missing equals sign', () => {
            expect(() => commands.solve('x^2 - 4')).toThrow('Equation must contain `=`');
        });

        test('throws error for empty equation', () => {
            expect(() => commands.solve('')).toThrow('Please provide an equation');
        });
    });

    // Derive Command
    describe('derive', () => {
        test('computes derivative of x^2', () => {
            expect(commands.derive('x^2')).toBe('2 * x');
        });

        test('computes derivative of cos(x)', () => {
            expect(commands.derive('cos(x)')).toBe('-sin(x)');
        });

        test('throws error for empty expression', () => {
            expect(() => commands.derive('')).toThrow('Please provide an expression');
        });
    });

    // Integrate Command
    describe('integrate', () => {
        test('computes integral of x^2', () => {
            expect(commands.integrate('x^2')).toBe('(1/3)*x^3');
        });

        test('computes integral of cos(x)', () => {
            expect(commands.integrate('cos(x)')).toBe('sin(x)');
        });

        test('throws error for empty expression', () => {
            expect(() => commands.integrate('')).toThrow('Please provide an expression');
        });
    });

    // Matrix Command
    describe('matrix', () => {
        test('computes determinant of 2x2 matrix', () => {
            expect(commands.matrix('det', '[[1,2],[3,4]]')).toBe(-2);
        });

        test('computes inverse of 2x2 matrix', () => {
            expect(commands.matrix('inv', '[[4,7],[2,6]]')).toBe('[[0.6,-0.7],[-0.2,0.4]]');
        });

        test('throws error for invalid operation', () => {
            expect(() => commands.matrix('transpose', '[[1,2],[3,4]]')).toThrow('Supported matrix operations: `det`, `inv`');
        });

        test('throws error for empty matrix', () => {
            expect(() => commands.matrix('det', '')).toThrow('Please provide an operation and matrix');
        });
    });

    // Convert Command
    describe('convert', () => {
        test('converts 10 km to miles', () => {
            expect(commands.convert(10, 'km', 'miles')).toMatch(/6.21371.*miles/);
        });
        test('converts 100 cm to inches', () => {
            expect(commands.convert(100, 'cm', 'inches')).toMatch(/39.37007.*inches/);
        });
        test('throws error for invalid input', () => {
            expect(() => commands.convert(NaN, 'km', 'miles')).toThrow('Please provide a valid conversion');
        });
    });
    describe('percent', () => {
        test('increases 100 by 20%', () => {
            expect(commands.percent('increase', 100, 20)).toBe(120);
        });
        test('decreases 100 by 20%', () => {
            expect(commands.percent('decrease', 100, 20)).toBe(80);
        });
        test('throws error for invalid operation', () => {
            expect(() => commands.percent('invalid', 100, 20)).toThrow('Operation must be `increase` or `decrease`');
        });
        test('throws error for invalid value', () => {
            expect(() => commands.percent('increase', NaN, 20)).toThrow('Please provide a valid operation');
        });
        test('throws error for invalid percentage', () => {
            expect(() => commands.percent('increase', 100, NaN)).toThrow('Please provide a valid operation');
        });
    });
});