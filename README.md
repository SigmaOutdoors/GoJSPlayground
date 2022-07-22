
# Samples 

Many samples demonstrate what you are asking for, such as:
https://gojs.net/latest/samples/flowchart.html 53
https://gojs.net/latest/samples/flowgrammer.html 3
https://gojs.net/latest/samples/grafcet.html 5
https://gojs.net/latest/samples/logicCircuit.html 4
https://gojs.net/latest/samples/network.html 6
https://gojs.net/latest/samples/pageFlow.html 2
https://gojs.net/latest/samples/processFlow.html 6
https://gojs.net/latest/samples/seatingChart.html 4
https://gojs.net/latest/samples/sequentialFunction.html 3
https://gojs.net/latest/samples/stateChart.html 4
https://gojs.net/latest/samples/systemDynamics.html 6


https://github.com/NorthwoodsSoftware/GoJS/blob/master/samples/flowchart.html


# Issues
Was getting peer jasmine-core@">=3.8" from karma-jasmine-html-reporter@1.7.0 error on update
had to bump package-json jasmine to 3.8.0

# gojs-angular-basic

### By Northwoods Software for [GoJS 2.1](https://gojs.net)

This project provides a basic example of using GoJS in an Angular app.
Check out the [Intro page on using GoJS with Angular](https://gojs.net/latest/intro/angular.html) for more information.

It makes use of the [gojs-angular](https://github.com/NorthwoodsSoftware/gojs-angular) package to handle setting up Diagram, Palette and Overview components.

When running the sample, try moving / adding / deleting nodes, editing text in the inspector, relinking nodes via ports, undoing (Ctrl-Z), and re-doing (Ctrl-Y) within the diagram. You'll notice the changes are reflected in app-level data. You'll also notice that changes
made in the inspector are reflected in the diagram. 

## Installation

Start by running npm install to install all necessary dependencies. 

If you do not have Angular already globally installed, you may do so by running:

### `npm i -g @angular/cli`

## Running the project

In the project directory, run:

### `ng serve`

Alternatively, if you do not have Angular installed globally, you may run:

### `npm run start`

Runs the app in the development mode.<br>
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.

The page will reload if you make edits.<br>

## Learn More

To learn Angular, check out [Angular's official site](https://angular.io/).
To learn GoJS, check out [gojs.net](https://gojs.net).
