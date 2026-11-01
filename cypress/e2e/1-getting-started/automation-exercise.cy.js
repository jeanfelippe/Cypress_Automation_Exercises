import homePage from './pages/home.page';
import loginPage from './pages/login.page';
import signupPage from './pages/signup.page';
import productsPage from './pages/products.page';
import cartPage from './pages/cart.page';
import checkoutPage from './pages/checkout.page';

const dadosUsuario = {
  senha: '12345',
  dia: '1',
  mes: 'September',
  ano: '1990',
  primeiroNome: 'PGATS',
  sobrenome: 'Aut',
  endereco: 'Rua Teste, 123',
  pais: 'Canada',
  estado: 'Ontario',
  cidade: 'Toronto',
  cep: '12345',
  celular: '1234567890'
};

describe('Automation Web Exercises - POS GRADUACAO', () => {

  it('TC1: Register User', () => {
    homePage.visitar();
    homePage.clicarLoginSignup();
    loginPage.preencherSignup('PGATS Aut', `jeanfelippe${Date.now()}@gmail.com`);
    signupPage.preencherFormularioRegistro(dadosUsuario);
    cy.contains('Account Created!').should('be.visible');
  });

  it('TC2: Login com email correto e senha correta', () => {
    homePage.visitar();
    homePage.clicarLoginSignup();
    loginPage.preencherLogin('jeanfelippe500@gmail.com', '12345');
    cy.wait(3000);
    cy.contains('PGATS Aut').should('be.visible');
  });

  it('TC3: Login User with incorrect email and password', () => {
    homePage.visitar();
    homePage.clicarLoginSignup();
    loginPage.preencherLogin('jeanfelippe1000000@gmail.com', '12345');
    cy.contains('Your email or password is incorrect!').should('be.visible');
  });

  it('TC4: Logout User', () => {
    homePage.visitar();
    homePage.clicarLoginSignup();
    loginPage.preencherLogin('pgats-aut-test100@mail.com', '12345');
    cy.wait(1000);
    cy.contains('PGATS Aut').should('be.visible');
    homePage.fazerLogout();
    cy.contains('Login to your account').should('be.visible');
  });

  it('TC5: Register User with existing email', () => {
    homePage.visitar();
    homePage.clicarLoginSignup();
    loginPage.preencherSignup('PGATS Aut', 'pgats-aut-test100@mail.com');
    cy.contains('Email Address already exist!').should('be.visible');
  });

  it('TC8: Verify All Products and product detail page', () => {
    homePage.visitar();
    cy.contains('AutomationExercise').should('be.visible');
    homePage.irParaProdutos();
    cy.get('.title').should('be.visible');
    cy.get('.features_items').should('be.visible');
    productsPage.verDetalhesPrimeiroProduto();
    cy.get('.product-information > :nth-child(3)').should('be.visible');
  });

  it('TC9: Search Product', () => {
    homePage.visitar();
    cy.contains('AutomationExercise').should('be.visible');
    homePage.irParaProdutos();
    cy.get('.title').should('be.visible');
    productsPage.pesquisarProduto('Blue');
    cy.contains('Blue Top').should('be.visible');
    cy.contains('Sleeves Top').should('be.visible');
    cy.contains('Blue Cotton').should('be.visible');
  });

  it('TC10: Verify Subscription in home page', () => {
    homePage.visitar();
    cy.contains('AutomationExercise').should('be.visible');
    homePage.assinarNewsletter(`jeanfelippe${Date.now()}@gmail.com`);
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it('TC15: Place Order: Register before Checkout', () => {
    homePage.visitar();
    homePage.clicarLoginSignup();
    loginPage.preencherSignup('PGATS Aut', `jeanfelippe${Date.now()}@gmail.com`);
    signupPage.preencherFormularioRegistro(dadosUsuario);
    cy.contains('Account Created!').should('be.visible');
    signupPage.clicarContinuar();
    cy.contains('PGATS Aut').should('be.visible');
    
    productsPage.adicionarProdutoAoCarrinho();
    cy.contains('Added!').should('be.visible');
    cy.get('u').click();
    
    cartPage.prosseguirParaCheckout();
    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');
    
    checkoutPage.revisarEConfirmarPedido();
    checkoutPage.preencherPagamento({
      nome: 'Jean PGATS',
      numero: '1234567890123456',
      cvc: '123',
      mes: '12',
      ano: '2025'
    });
    
    //cy.contains('Your order has been placed successfully!').should('be.visible');
    cy.contains('Your order has been confirmed!').should('be.visible');
    homePage.deletarConta();
    cy.contains('Account Deleted!').should('be.visible');
  });


it('TC16: Place Order: Login before Checkout', () => {
    const emailDinamico = `jeanfelippe_${Date.now()}@gmail.com`;

    homePage.visitar();
    homePage.clicarLoginSignup();

    // 1. Cadastrar uma conta nova
    loginPage.preencherSignup('PGATS Aut', emailDinamico);
    signupPage.preencherFormularioRegistro(dadosUsuario);
    cy.contains('Account Created!').should('be.visible');
    
    signupPage.clicarContinuar();
    cy.wait(1000);

    // 2. Fazer logout da conta recém-criada
    homePage.fazerLogout();
    cy.wait(1000);
    cy.contains('Login to your account').should('be.visible');

    // 3. Logar na conta nova recém-criada
    loginPage.preencherLogin(emailDinamico, dadosUsuario.senha);
    cy.contains('PGATS Aut').should('be.visible');

    // 4. Adicionar produtos ao carrinho e prosseguir
    productsPage.adicionarProdutoAoCarrinho();
    cy.contains('Added!').should('be.visible');
    cy.get('u').click();
    cy.contains('Shopping Cart').should('be.visible');

    cartPage.prosseguirParaCheckout();
    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');

    // 5. Pagamento e Confirmação do Pedido
    checkoutPage.revisarEConfirmarPedido();
    checkoutPage.preencherPagamento({
      nome: 'Jean PGATS',
      numero: '1234567890123456',
      cvc: '123',
      mes: '12',
      ano: '2025'
    });

    cy.contains('Your order has been confirmed!').should('be.visible');

    // 6. Deletar conta ao final
    homePage.deletarConta();
    cy.contains('Account Deleted!').should('be.visible');
  });

});