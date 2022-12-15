describe("Test signing in", () => {
	it("successfully routes to your dashboard page", () => {
		cy.visit("http://localhost:3000");
		cy.get('[data-test="username-input"]').type("cb");
		cy.get('[data-test="password-input"]').type("password1@");
		cy.get('[data-test="signin-form-button"]').click();
		cy.url().should("contain", "/u");
	});
});

describe("Test signing out", () => {
	const userTestAccount = {
		username: "cb",
		password: "password1@",
	};
	it("successfully routes back to the homepage", () => {
		cy.userSignIn(userTestAccount);
		cy.get('[data-test="account-button"]').click();
		cy.get('[data-test="accountButton-dropdownMenu"]').should("be.visible");
		cy.get('[data-test="account-logout-button"]').click();
		cy.url().should("equal", "http://localhost:3000/");
	});
});

// impact - impact on your customers, clients
// culture - BRG (Business Resource Groups) - Adelante
// development - assigned skills trainings (never stop learning)
