class HomePage {
  visitar() {
    cy.visit('https://automationexercise.com/');
  }

  clicarLoginSignup() {
    cy.get('a[href*=login]').click();
  }

  irParaProdutos() {
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
  }

  fazerLogout() {
    cy.contains('a', 'Logout').click({ force: true });
  }

  deletarConta() {
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
  }

  assinarNewsletter(email) {
    cy.scrollTo('bottom');
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe > .fa').click();
  }
}

export default new HomePage();