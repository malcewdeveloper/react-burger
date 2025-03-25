import reducer, {
    initialState,
    incrementCount,
    decrementCount,
    incrementBun,
    decrementAll,
} from "./ingredientsSlice";
import { getIngredients } from "../../thunks/ingredientsThunks";

describe("Check ingredientsSlice reducers", () => {
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

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "" })).toEqual(initialState);
    });

    it(`should return correct state after ${getIngredients.pending.type} action type`, () => {
        expect(
            reducer(undefined, { type: getIngredients.pending.type }),
        ).toEqual({
            ...initialState,
            isError: false,
        });
    });

    it(`should return correct state after ${getIngredients.rejected.type} action type`, () => {
        expect(
            reducer(undefined, { type: getIngredients.rejected.type }),
        ).toEqual({
            ...initialState,
            isLoading: false,
            isError: true,
        });
    });

    it(`should return correct state after ${getIngredients.fulfilled.type} action type`, () => {
        const payload = {
            data: [mockItem],
        };

        expect(
            reducer(undefined, {
                type: getIngredients.fulfilled.type,
                payload,
            }),
        ).toEqual({
            ...initialState,
            isLoading: false,
            isError: false,
            data: payload.data,
        });
    });

    it(`should return correct state after ${incrementCount.type} action type`, () => {
        expect(
            reducer(
                { ...initialState, data: [mockItem] },
                { type: incrementCount.type, payload: mockItem._id },
            ),
        ).toEqual({
            ...initialState,
            data: [{ ...mockItem, __v: mockItem.__v + 1 }],
        });
    });

    it(`should return correct state after ${decrementCount.type} action type`, () => {
        expect(
            reducer(
                { ...initialState, data: [mockItem] },
                { type: decrementCount.type, payload: mockItem._id },
            ),
        ).toEqual({
            ...initialState,
            data: [{ ...mockItem, __v: mockItem.__v - 1 }],
        });
    });

    it(`should return correct state after ${incrementBun.type} action type`, () => {
        expect(
            reducer(
                { ...initialState, data: [mockItem] },
                { type: incrementBun.type, payload: mockItem._id },
            ),
        ).toEqual({
            ...initialState,
            data: [{ ...mockItem, __v: 2 }],
        });
    });

    it(`should return correct state after ${decrementAll.type} action type`, () => {
        expect(
            reducer(
                { ...initialState, data: [mockItem] },
                { type: decrementAll.type },
            ),
        ).toEqual({
            ...initialState,
            data: [{ ...mockItem, __v: 0 }],
        });
    });
});
