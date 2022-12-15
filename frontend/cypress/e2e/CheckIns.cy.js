describe("Create a new check-in", () => {
	context("720p resolution", () => {
		beforeEach(() => {
			// run these tests as if in a desktop
			// browser with a 720p monitor
			cy.viewport(1280, 720);
		});
		const userTestAccount = {
			username: "cb",
			password: "password1@",
		};
		it("adds a new entry to the table", () => {
			cy.userSignIn(userTestAccount);
			cy.get('[data-test="permanent-side-nav"]')
				.find('a[href*="u/checkins"]')
				.click();
			cy.get('[data-test="new-checkin-button"]').click();
			cy.get('[data-test="new-checkin-form"]').should("be.visible");
			cy.get('[data-test="checkin-form-weight-field"]').type(100);
			cy.get('[data-test="checkin-form-review-field"]').type(
				"Weekly review Cypress test input."
			);
			cy.get('[data-test="checkin-form-submit-button"]').click();
			cy.wait(1000);
			cy.get('[data-test="checkin-table-body"]')
				.find("tr")
				.first()
				.contains("100")
				.parent("tr")
				.within(() => {
					const today = new Date().toLocaleDateString();
					cy.get("td").eq(0).contains(today);
					cy.get("td").eq(2).contains("Weekly review Cypress test input.");
				});
		});
	});
});
