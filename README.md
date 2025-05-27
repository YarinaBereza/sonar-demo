# Playwright Test Demo

This project contains Playwright test examples for demo purposes. The tests are written for the Sauce Demo website (https://www.saucedemo.com/).

## Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

- Run all tests in headless mode:
  ```bash
  npm test
  ```

- Run tests in UI mode (interactive):
  ```bash
  npm run test:ui
  ```

- Run tests in headed mode (visible browser):
  ```bash
  npm run test:headed
  ```

- Debug tests:
  ```bash
  npm run test:debug
  ```

- View test report:
  ```bash
  npm run test:report
  ```

## Test Cases

1. **Login Tests**
   - Successful login with valid credentials
   - Error message with invalid credentials

2. **Shopping Cart**
   - Add item to cart

3. **Product Sorting**
   - Sort products by price (low to high)

## Project Structure

- `tests/` - Contains all test files
  - `example.spec.js` - Example test file with various test cases

## Dependencies

- @playwright/test: ^1.52.0

## License

ISC
