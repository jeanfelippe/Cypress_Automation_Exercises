class CartPage {
  prosseguirParaCheckout() {
    cy.get('.col-sm-6 > .btn').click();
  }
}

export default new CartPage();