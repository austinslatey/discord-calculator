# discord-calculator
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description
This is a simple discord calculator bot that preforms math equations and returns the solution back to it's user

Connect this bot to your Discord server [here](https://discord.com/oauth2/authorize?client_id=1365359291716079838&permissions=3072&integration_type=0&scope=bot)

## Table of Contents
* [Screenshots](#screenshots)

* [Features](#features)

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Features
- `Basic Calculation`: Solves addition, subtraction, multiplication, and division. (e.g., 2 + 3 = 5 or 2 - 4 = -2).

- `Equation Solving`: Solves algebraic equations (e.g., 2x + 3 = 7 or x^2 - 4 = 0).

- `Derivatives`: Computes derivatives of functions (e.g., cos(x) → -sin(x)).

- `Integrals`: Computes indefinite integrals (e.g., x^2 → x^3/3 + C).

- `Matrix Operations`: Supports determinant (det) and inverse (inv) for matrices.

- `Unit Conversions`: Converts between units (e.g., 10 km to miles or 100 cm to inches).

- `Help`: !calc help (shows the help menu)

## Screenshots
![Application](./application.png)

## Installation

To install necessary dependencies, run the following command:

```
npm i
```

To run the program run the following command (assuming you have nodeJs installed):

`node index.js`

## Usage

- Basic Calculation: `!calc 5 * sin(3)` or `!calc basic 2 + 2`

- Solve Equation: `!calc solve 2x + 3 = 7` (returns x = 2) (not functioning)

- Derivative: `!calc derive x^2` (returns 2x)

- Integral: `!calc integrate x^2` (returns x^3/3 + C) (not functioning)

- Matrix Determinant: `!calc matrix det [[1,2],[3,4]]` (returns -2)

- Unit Conversion: `!calc convert 10 km to miles` (returns 6.21371 miles)

- Help: `!calc help` (shows the help menu)

## License

This project is licensed under the MIT license.
  
## Contributing
...


## Tests
...

## Notes
- May not handle all edge cases, thorough testing needed

- For matrix operations, users must input matrices in valid mathjs format (e.g., [[1,2],[3,4]]).

- Unit conversions require valid mathjs units (e.g., km, miles, cm, inches).



## Questions

If you have any questions about the repo, open an issue or contact me directly at ... You can find more of my work at [austinslatey](https://github.com/austinslatey/).

