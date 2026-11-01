const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // Obrigatório para registrar o plugin do reporter
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});