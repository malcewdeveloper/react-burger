import { API_URL } from "../../src/constants";

describe("Constructor pages tests", () => {
    const testUrl = "localhost:3000";
    const itemClass = "[class^='BurgerIngredients_item'";
    const modalClass = "[class^='Modal_overlay']";
    const modalButtonClass = "[class^='Modal_button']";
    const mockOrder = {
        name: "Краторный бургер",
        order: {
            _id: "67e0258d6fce7d001db5bc62",
            status: "done",
            number: 71946,
        },
    };

    beforeEach(() => {
        cy.visit(testUrl);
        cy.intercept("POST", `${API_URL}/orders`, {
            statusCode: 200,
            body: mockOrder,
        });

        cy.get("[id='bun']").find(itemClass).first().as("bunIngredient");
        cy.get("[id='sauce']").find(itemClass).first().as("sauceIngredient");
        cy.get("[id='main']").find(itemClass).first().as("mainIngredient");
    });

    it("Should an ingredient drag in to a cart and create order successfully", () => {
        cy.get("[class^='BurgerConstructor_aside']").as("cart");

        cy.get("@bunIngredient").trigger("dragstart");
        cy.get("@cart").trigger("drop");

        cy.get("@sauceIngredient").trigger("dragstart");
        cy.get("@cart").trigger("drop");

        cy.get("@mainIngredient").trigger("dragstart");
        cy.get("@cart").trigger("drop");

        cy.get("button").contains("Оформить заказ").click();

        cy.get(modalClass).as("modal");
        cy.get("@modal").should("be.visible");
        cy.get("h2").contains(mockOrder.order.number);

        cy.get(modalButtonClass).click();
        cy.get("@modal").should("not.exist");
    });

    it("Should open a modal and close after click button", () => {
        cy.get("@bunIngredient").click();
        cy.get(modalClass).as("modal");
        cy.get(modalButtonClass).click();
        cy.get("@modal").should("not.exist");
    });
});
