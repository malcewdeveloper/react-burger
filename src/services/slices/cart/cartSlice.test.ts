import { ItemTypeWithId } from "../../../types";
import reducer, {
    initialState,
    addItem,
    removeItem,
    moveItem,
    clearCart,
} from "./cartSlice";

describe("Check cartSlice reducers", () => {
    const mockItem: ItemTypeWithId = {
        _id: "id",
        name: "name",
        type: "bun",
        proteins: 10,
        fat: 20,
        carbohydrates: 5,
        calories: 25,
        price: 1000,
        image: "src/image/",
        image_mobile: "src/image/mobile",
        image_large: "src/image/large",
        __v: 1,
        id: "id",
    };

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "" })).toEqual(initialState);
    });

    it(`should return correct state after ${addItem.type} action type with bun payload`, () => {
        expect(
            reducer(undefined, { type: addItem.type, payload: mockItem }),
        ).toEqual({
            ...initialState,
            data: [mockItem, mockItem],
        });
    });

    it(`should return correct state after ${addItem.type} action type without bun payload`, () => {
        const payload = { ...mockItem, type: "souce" };

        expect(reducer(undefined, { type: addItem.type, payload })).toEqual({
            ...initialState,
            data: [payload],
        });
    });

    it(`should return correct state after ${addItem.type} action type with bun when state has only buns`, () => {
        expect(
            reducer(
                {
                    data: [
                        { ...mockItem, id: "bun1" },
                        { ...mockItem, id: "bun2" },
                    ],
                },
                { type: addItem.type, payload: mockItem },
            ),
        ).toEqual({
            ...initialState,
            data: [mockItem, mockItem],
        });
    });

    it(`should return correct state after ${addItem.type} action type without bun when state has buns`, () => {
        expect(
            reducer(
                { data: [mockItem, mockItem] },
                { type: addItem.type, payload: { ...mockItem, type: "souce" } },
            ),
        ).toEqual({
            ...initialState,
            data: [mockItem, { ...mockItem, type: "souce" }, mockItem],
        });
    });

    it(`should return correct state after ${removeItem.type} action type`, () => {
        expect(
            reducer(
                { data: [mockItem] },
                { type: removeItem.type, payload: mockItem.id },
            ),
        ).toEqual(initialState);
    });

    it(`should return correct state after ${moveItem.type} action type`, () => {
        const payload = { fromId: "id", toId: "id3" };

        expect(
            reducer(
                {
                    data: [
                        mockItem,
                        { ...mockItem, id: "id2" },
                        { ...mockItem, id: "id3" },
                    ],
                },
                {
                    type: moveItem.type,
                    payload,
                },
            ),
        ).toEqual({
            ...initialState,
            data: [
                { ...mockItem, id: "id3" },
                { ...mockItem, id: "id2" },
                mockItem,
            ],
        });
    });

    it(`should return correct state after ${clearCart.type} action type`, () => {
        expect(reducer({ data: [mockItem] }, { type: clearCart.type })).toEqual(
            initialState,
        );
    });
});
