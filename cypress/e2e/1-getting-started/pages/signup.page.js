class SignupPage {
  preencherFormularioRegistro(usuario) {
    cy.get('#id_gender2').check();
    cy.get('[data-qa="password"]').type(usuario.senha);
    cy.get('[data-qa="days"]').select(usuario.dia);
    cy.get('[data-qa="months"]').select(usuario.mes);
    cy.get('[data-qa="years"]').select(usuario.ano);
    cy.get('[data-qa="first_name"]').type(usuario.primeiroNome);
    cy.get('[data-qa="last_name"]').type(usuario.sobrenome);
    cy.get('[data-qa="address"]').type(usuario.endereco);
    cy.get('[data-qa="country"]').select(usuario.pais);
    cy.get('[data-qa="state"]').type(usuario.estado);
    cy.get('[data-qa="city"]').type(usuario.cidade);
    cy.get('[data-qa="zipcode"]').type(usuario.cep);
    cy.get('[data-qa="mobile_number"]').type(usuario.celular);
    cy.get('[data-qa="create-account"]').click();
  }

  clicarContinuar() {
    cy.get('[data-qa="continue-button"]').click();
  }
}

export default new SignupPage();