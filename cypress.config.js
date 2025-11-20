const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // This tells Cypress where your React app is running
    baseUrl: 'http://localhost:5173', 
    
    // This tells Cypress where to find the tests
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});