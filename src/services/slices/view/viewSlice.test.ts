import { OrderType } from "../../../types";
import reducer, {
    initialState,
    addProduct,
    removeProduct,
    addOrder,
    removeOrder,
} from "./viewSlice";

describe("Check viewSlice reducers", () => {
    const mockItem = {
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
    };

    const mockOrder: OrderType = {
        name: "name",
        ingredients: ["ingredient"],
        _id: "id",
        status: "done",
        number: 1,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    };

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "" })).toEqual(initialState);
    });

    it(`should return correct state ${addProduct.type} action type`, () => {
        expect(
            reducer(undefined, { type: addProduct.type, payload: mockItem }),
        ).toEqual({
            ...initialState,
            selectProduct: mockItem,
        });
    });

    it(`should return correct state ${removeProduct.type} action type`, () => {
        expect(
            reducer(
                { ...initialState, selectProduct: mockItem },
                { type: removeProduct.type },
            ),
        ).toEqual({
            ...initialState,
            selectProduct: null,
        });
    });

    it(`should return correct state ${addOrder.type} action type`, () => {
        expect(
            reducer(undefined, { type: addOrder.type, payload: mockOrder }),
        ).toEqual({
            ...initialState,
            selectOrder: mockOrder,
        });
    });

    it(`should return correct state ${removeOrder.type} action type`, () => {
        expect(
            reducer(
                { ...initialState, selectOrder: mockOrder },
                { type: removeOrder.type },
            ),
        ).toEqual({
            ...initialState,
            selectOrder: null,
        });
    });
});
