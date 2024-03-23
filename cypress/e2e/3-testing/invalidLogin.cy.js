describe("Invalid User", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(500);
  });

  it("Shows a login form when login button is pressed", () => {
    cy.get("#registerForm").find("button[data-auth=login]").click();
    cy.get("#loginForm").should("be.visible");
    cy.wait(500);
  });
  it("User cannot login with invalid credentials and it shows a message", () => {
    cy.fixture("invalidUser").then((user) => {
      cy.get("#registerForm").find("button[data-auth=login]").click();
      cy.get("#loginForm").should("be.visible");
      cy.wait(500);
      cy.get("#loginForm").find("input[name=email]").type(user.email);
      cy.get("#loginForm").find("input[name=password]").type(user.password);
      cy.get("#loginForm").find("button[type=submit]").click();
      cy.on("window:alert", (str) => {
        expect(str).to.equal(
          "Either your username was not found or your password is incorrect",
        );
      });
    });
  });
});
