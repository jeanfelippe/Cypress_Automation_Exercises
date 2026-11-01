class ProductsPage {
  pesquisarProduto(produto) {
    cy.get('#search_product').type(produto);
    cy.get('#submit_search').click();
  }

  adicionarProdutoAoCarrinho() {
    cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
  }

  verDetalhesPrimeiroProduto() {
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
  }
  
}

export default new ProductsPage();