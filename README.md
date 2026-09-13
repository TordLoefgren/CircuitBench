# CircuitBench

An interactive full-stack web application for building and simulating simple series circuits.

![CircuitBench showing a series circuit and its simulation results](snapshot.png)

## About

CircuitBench is a small electronics workbench for experimenting with simple series circuits in the browser.

I am building the project primarily to develop my full-stack web development skills through a concrete technical domain. I have also recently started exploring embedded programming and basic electronics, so modelling and simulating circuits gives me a practical way to strengthen that understanding alongside the software development.

The current version has a working frontend-to-backend simulation flow: a circuit configuration can be submitted to the backend, and circuit- and component-level results are displayed in the frontend.

The next step is to replace the current hardcoded circuit with dynamic component editing and introduce a [functional core / imperative shell](https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell) structure for frontend state and UI behavior.

The project is intended to become a complete small full-stack circuit simulator, with a practical set of supported components and a frontend for adding, removing, configuring, and simulating them.

## Development setup

The frontend and backend currently run locally as separate applications and communicate through Cross-Origin Resource Sharing (CORS).

For now, this keeps the development setup simple. A later deployment may host the static frontend separately, for example through GitHub Pages, with the backend deployed to its own server.
