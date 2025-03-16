import reducer, {
    initialState,
    connect,
    disconnect,
    sendMessage,
    onConnected,
    onDisconnected,
    onMessageReceived,
    onError,
} from "./orderSlice";
import { postOrder } from "../../thunks/orderThunks";

describe("Check orderSlice reducers", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "" })).toEqual(initialState);
    });

    it(`should return current state ${postOrder.pending.type} action type`, () => {
        expect(reducer(undefined, { type: postOrder.pending.type })).toEqual({
            ...initialState,
            isError: false,
            isLoading: true,
        });
    });

    it(`should return current state ${postOrder.rejected.type} action type`, () => {
        expect(reducer(undefined, { type: postOrder.rejected.type })).toEqual({
            ...initialState,
            isError: true,
            isLoading: false,
        });
    });

    it(`should return current state ${postOrder.fulfilled.type} action type`, () => {
        expect(
            reducer(undefined, {
                type: postOrder.fulfilled.type,
                payload: { order: { number: 1000 } },
            }),
        ).toEqual({
            ...initialState,
            isError: false,
            isLoading: false,
            number: 1000,
        });
    });

    it(`should return correct state after ${connect.type} action type`, () => {
        expect(reducer(undefined, { type: connect.type })).toEqual({
            ...initialState,
            status: "connecting",
        });
    });

    it(`should return correct state after ${disconnect.type} action type`, () => {
        expect(reducer(undefined, { type: disconnect.type })).toEqual({
            ...initialState,
            status: "disconnecting",
        });
    });

    it(`should return correct state after ${sendMessage.type} action type`, () => {
        expect(reducer(undefined, { type: sendMessage.type })).toEqual({
            ...initialState,
        });
    });

    it(`should return correct state after ${onConnected.type} action type`, () => {
        expect(reducer(undefined, { type: onConnected.type })).toEqual({
            ...initialState,
            status: "connected",
        });
    });

    it(`should return correct state after ${onDisconnected.type} action type`, () => {
        expect(reducer(undefined, { type: onDisconnected.type })).toEqual({
            ...initialState,
            status: "disconnected",
        });
    });

    it(`should return correct state after ${onMessageReceived.type} action type`, () => {
        const data = {
            orders: [
                {
                    name: "name",
                    ingredients: ["ingredient"],
                    _id: "id",
                    status: "done",
                    number: 1,
                    createdAt: "createdAt",
                    updatedAt: "updatedAt",
                },
            ],
            success: true,
            total: 10,
            totalToday: 10,
        };

        expect(
            reducer(undefined, { type: onMessageReceived.type, payload: data }),
        ).toEqual({
            ...initialState,
            data,
        });
    });

    it(`should return correct state after ${onError.type} action type`, () => {
        expect(
            reducer(undefined, { type: onError.type, payload: null }),
        ).toEqual({
            ...initialState,
            status: "error",
        });
    });
});
