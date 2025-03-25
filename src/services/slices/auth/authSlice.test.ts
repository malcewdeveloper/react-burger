import reducer, {
    initialState,
    connect,
    disconnect,
    sendMessage,
    onConnected,
    onDisconnected,
    onMessageReceived,
    onError,
} from "./authSlice";
import {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getUser,
    updateUser,
} from "../../thunks/authThunks";

describe("Check authSlice reducers", () => {
    const actions = [
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
        getUser,
        updateUser,
    ];

    it("should return the initial state", () => {
        expect(reducer(undefined, { type: "" })).toEqual(initialState);
    });

    actions.forEach((action) => {
        it(`should return correct state after ${action.pending.type} action type`, () => {
            expect(reducer(undefined, { type: action.pending.type })).toEqual({
                ...initialState,
                isError: false,
            });
        });

        it(`should return correct state after ${action.rejected.type} action type`, () => {
            const errorMessage = "Что-то пошло не так, попробуйте еще раз.";

            expect(
                reducer(undefined, {
                    type: action.rejected.type,
                    error: { message: null },
                }),
            ).toEqual({
                ...initialState,
                isError: true,
                isLoading: false,
                errorMessage,
            });
        });

        switch (action.fulfilled.type) {
            case register.fulfilled.type:
            case login.fulfilled.type:
            case getUser.fulfilled.type:
            case updateUser.fulfilled.type:
                it(`should return correct state after ${action.fulfilled.type} action type`, () => {
                    const payload = {
                        user: {
                            email: "test@email.ru",
                            name: "testname",
                        },
                    };

                    expect(
                        reducer(undefined, {
                            type: action.fulfilled.type,
                            payload,
                        }),
                    ).toEqual({
                        ...initialState,
                        isError: false,
                        isLoading: false,
                        user: payload.user,
                    });
                });

                break;
            case logout.fulfilled.type:
                it(`should return correct state after ${action.fulfilled.type} action type`, () => {
                    expect(
                        reducer(undefined, {
                            type: action.fulfilled.type,
                        }),
                    ).toEqual({
                        ...initialState,
                        isError: false,
                        isLoading: false,
                        user: null,
                    });
                });

                break;
            case forgotPassword.fulfilled.type:
            case resetPassword.fulfilled.type:
                it(`should return correct state after ${action.fulfilled.type} action type`, () => {
                    expect(
                        reducer(undefined, {
                            type: action.fulfilled.type,
                        }),
                    ).toEqual({
                        ...initialState,
                        isError: false,
                        isLoading: false,
                    });
                });

                break;
        }
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
