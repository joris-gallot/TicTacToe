describe("playing a game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have grid initialized", () => {
    cy.get(".app").children().should("have.length", 9);
    cy.get(".square").should("have.length", 9);
  });

  it("should play a win horizontally for P1", () => {
    // P1
    cy.get(".square").eq(0).click(); // top left
    cy.get(".square").eq(0).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(3).click(); // left middle
    cy.get(".square").eq(3).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(1).click(); // top middle
    cy.get(".square").eq(1).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(4).click(); // middle
    cy.get(".square").eq(4).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(2).click(); // top right
    cy.get(".square").eq(2).should("have.data", "value", "X");

    cy.get("#winner").should("exist");
    cy.get("#winner").should("have.text", "Player 1 wins!");
  });

  it("should play a win horizontally for P2", () => {
    // P1
    cy.get(".square").eq(0).click(); // top left
    cy.get(".square").eq(0).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(3).click(); // left middle
    cy.get(".square").eq(3).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(1).click(); // top middle
    cy.get(".square").eq(1).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(4).click(); // middle
    cy.get(".square").eq(4).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(6).click(); // bottom left
    cy.get(".square").eq(6).should("have.data", "value", "X");
    // P2
    cy.get(".square").eq(5).click(); // right middle
    cy.get(".square").eq(5).should("have.data", "value", "O");

    cy.get("#winner").should("exist");
    cy.get("#winner").should("have.text", "Player 2 wins!");
  });

  it("should play a win vertically for P1", () => {
    // P1
    cy.get(".square").eq(0).click(); // top left
    cy.get(".square").eq(0).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(1).click(); // top middle
    cy.get(".square").eq(1).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(3).click(); // left middle
    cy.get(".square").eq(3).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(2).click(); // right middle
    cy.get(".square").eq(2).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(6).click(); // middle left
    cy.get(".square").eq(6).should("have.data", "value", "X");

    cy.get("#winner").should("exist");
    cy.get("#winner").should("have.text", "Player 1 wins!");
  });

  it("should play a win vertically for P2", () => {
    // P1
    cy.get(".square").eq(0).click(); // top left
    cy.get(".square").eq(0).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(1).click(); // top middle
    cy.get(".square").eq(1).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(3).click(); // left middle
    cy.get(".square").eq(3).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(4).click(); // middle
    cy.get(".square").eq(4).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(8).click(); // middle left
    cy.get(".square").eq(8).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(7).click(); // bottom middle
    cy.get(".square").eq(7).should("have.data", "value", "O");

    cy.get("#winner").should("exist");
    cy.get("#winner").should("have.text", "Player 2 wins!");
  });

  it("should play a win diagonally for P1", () => {
    // P1
    cy.get(".square").eq(0).click(); // top left
    cy.get(".square").eq(0).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(1).click(); // top middle
    cy.get(".square").eq(1).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(4).click(); // middle
    cy.get(".square").eq(4).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(2).click(); // top right
    cy.get(".square").eq(2).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(8).click(); // bottom right
    cy.get(".square").eq(8).should("have.data", "value", "X");

    cy.get("#winner").should("exist");
    cy.get("#winner").should("have.text", "Player 1 wins!");
  });

  it("should play a win diagonally for P2", () => {
    // P1
    cy.get(".square").eq(1).click(); // top middle
    cy.get(".square").eq(1).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(0).click(); // top left
    cy.get(".square").eq(0).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(2).click(); // top right
    cy.get(".square").eq(2).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(4).click(); // middle
    cy.get(".square").eq(4).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(6).click(); // bottom left
    cy.get(".square").eq(6).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(8).click(); // bottom right
    cy.get(".square").eq(8).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(3).click(); // middle left
    cy.get(".square").eq(3).should("not.have.data", "value", "X");

    cy.get("#winner").should("exist");
    cy.get("#winner").should("have.text", "Player 2 wins!");
  });

  it("should play a draw", () => {
    // P1
    cy.get(".square").eq(0).click(); // top left
    cy.get(".square").eq(0).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(4).click(); // middle
    cy.get(".square").eq(4).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(1).click(); // top middle
    cy.get(".square").eq(1).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(2).click(); // top right
    cy.get(".square").eq(2).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(6).click(); // bottom left
    cy.get(".square").eq(6).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(3).click(); // middle left
    cy.get(".square").eq(3).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(5).click(); // right middle
    cy.get(".square").eq(5).should("have.data", "value", "X");

    // P2
    cy.get(".square").eq(8).click(); // bottom right
    cy.get(".square").eq(8).should("have.data", "value", "O");

    // P1
    cy.get(".square").eq(7).click(); // bottom middle
    cy.get(".square").eq(7).should("have.data", "value", "X");
  });
});
