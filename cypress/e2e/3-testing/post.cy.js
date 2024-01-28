describe("Publish a post", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(500);
  });
  it("Login and publish a new Post", () => {
    cy.fixture("user").then((user) => {
      cy.get("#registerForm").find("button[data-auth=login]").click();
      cy.get("#loginForm").should("be.visible");
      cy.wait(500);
      cy.get("#loginForm").find("input[name=email]").type(user.email);
      cy.get("#loginForm").find("input[name=password]").type(user.password);
      cy.get("#loginForm").find("button[type=submit]").click();
      cy.wait(500);
      cy.visit("/?view=post");
      cy.fixture("post").then((post) => {
        cy.get("input[name=title]").type(post.title);
        cy.wait(200);
        cy.get("input[name=tags]").type(post.tag);
        cy.wait(200);
        cy.get("input[name=media]").type(post.media);
        cy.wait(200);
        cy.get("textarea[name=body]").type(post.body);
        cy.wait(500);
      });
      cy.get("button[type=submit]").find("span").contains("Publish").click();
    });
  });
});
