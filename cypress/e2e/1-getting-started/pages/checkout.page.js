class CheckoutPage {
  revisarEConfirmarPedido() {
    cy.get(':nth-child(7) > .btn').click();
  }

  preencherPagamento(cartao) {
    cy.get('[data-qa="name-on-card"]').type(cartao.nome);
    cy.get('[data-qa="card-number"]').type(cartao.numero);
    cy.get('[data-qa="cvc"]').type(cartao.cvc);
    cy.get('[data-qa="expiry-month"]').type(cartao.mes);
    cy.get('[data-qa="expiry-year"]').type(cartao.ano);
    cy.get('[data-qa="pay-button"]').click();
  }
}

export default new CheckoutPage();