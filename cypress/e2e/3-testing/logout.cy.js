describe("Ensures User logout", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(500);
  });
  it("Ensure user logout", () => {
    cy.fixture("user").then((user) => {
      cy.get("#registerForm").find("button[data-auth=login]").click();
      cy.get("#loginForm").should("be.visible");
      cy.wait(500);
      cy.get("#loginForm").find("input[name=email]").type(user.email);
      cy.get("#loginForm").find("input[name=password]").type(user.password);
      cy.get("#loginForm").find("button[type=submit]").click();
      cy.get("button[data-auth=logout]").click();
      cy.window().then((win) => {
        expect(win.localStorage.getItem("token")).to.be.null;
      });
    });
  });
});
