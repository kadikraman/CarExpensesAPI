# Car expenses API
API for storing and fetching car expenses data. Built with node, express and mongoDB.

[![Code Climate](https://codeclimate.com/github/kadikraman/CarExpensesAPI/badges/gpa.svg)](https://codeclimate.com/github/kadikraman/CarExpensesAPI)
[![Build Status](https://travis-ci.org/kadikraman/CarExpensesAPI.svg?branch=master)](https://travis-ci.org/kadikraman/CarExpensesAPI)

### Usage (public)
- **GET** ---- **host**/api/expense_types ---- *returns all expense types registred with the system*
- **GET** ---- **host**/api/expense_types/**expense_id** ----- *returns the specified expense type*
- **GET** ---- **host**/api/expenses ---- *returns all expenses matching the search params*
- **GET** ---- **host**/api/expenses/**expense_id** ---- *returns the specified expense*

### Usage (Auth required)
- **POST** ---- **host**/api/expense_types ---- *adds a new expense type, name must be unique*
- **DELETE** ---- **host**/api/expense_types/**expense_id** ---- *deletes the expense type specified*
- **POST** ---- **host**/api/expenses ---- *adds a new expense*
- **PATCH** ----- **host**/api/expenses/**expense_id** ---- *replaces the selected expense with the new values*
- **PUT** ---- **host**/api/expenses/**expense_id** ---- *updates the selected expense partially (only the values included in the request body)*
- **DELETE** ---- **host**/api/expenses/**expense_id** ---- *deletes the specified expense*

### Dev instructions
- install node
- install mongoDB

In project directory:
- run: node install (installs dependencies)
- run: sudo npm install gulp (to access gulp from the command line)
- run: gulp (to start the server)

To run the tests, run: gulp test

**dev note:** when doing requests, must put Content-Type application/json in the header
