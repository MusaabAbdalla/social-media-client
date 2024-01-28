describe("User login Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(500);
  });

  it("Show a Register form", () => {
    cy.get("#registerForm").should("be.visible");
    cy.wait(500);
  });
  it("Shows a login form when login button is pressed", () => {
    cy.get("#registerForm").find("button[data-auth=login]").click();
    cy.get("#loginForm").should("be.visible");
    cy.wait(500);
  });
  it("Login with registered user", () => {
    cy.fixture("user").then((user) => {
      cy.get("#registerForm").find("button[data-auth=login]").click();
      cy.get("#loginForm").should("be.visible");
      cy.wait(500);
      cy.get("#loginForm").find("input[name=email]").type(user.email);
      cy.get("#loginForm").find("input[name=password]").type(user.password);
      cy.get("#loginForm").find("button[type=submit]").click();
    });
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
