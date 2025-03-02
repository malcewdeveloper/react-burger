import {
    type ActionCreatorWithoutPayload,
    type ActionCreatorWithPayload,
    type Dispatch,
    type Middleware,
    type MiddlewareAPI,
    type UnknownAction,
} from "@reduxjs/toolkit";
import { RootState } from "../services/store";
import authApi from "../api/auth";
import { getCookie } from "../utils";

type WebSocketActions<TMessage> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage: ActionCreatorWithPayload<TMessage>;
    onConnected: ActionCreatorWithPayload<Event>;
    onDisconnected: ActionCreatorWithPayload<CloseEvent>;
    onMessageReceived: ActionCreatorWithPayload<TMessage>;
    onError: ActionCreatorWithPayload<Event>;
};

type WebSocketOptions = {
    withTokenRefresh: boolean;
};

export function createWebSocketMiddleware<TMessage>(
    {
        connect,
        disconnect,
        sendMessage,
        onConnected,
        onDisconnected,
        onMessageReceived,
        onError,
    }: WebSocketActions<TMessage>,
    { withTokenRefresh }: WebSocketOptions,
): Middleware<unknown, RootState, Dispatch<UnknownAction>> {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url: string;

    return ((store: MiddlewareAPI<Dispatch<UnknownAction>, RootState>) =>
        (next: Dispatch<UnknownAction>) =>
        (action: UnknownAction) => {
            if (connect.match(action)) {
                if (socket !== null) {
                    console.warn("WebSocket is already connected.");
                    return;
                }

                url = action.payload;
                socket = new WebSocket(url);
                isConnected = true;

                socket.onopen = (event) => {
                    store.dispatch(onConnected(event));
                };

                socket.onclose = (event) => {
                    store.dispatch(onDisconnected(event));
                    socket = null;
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    store.dispatch(onMessageReceived(data));

                    if (
                        withTokenRefresh &&
                        data.message === "Invalid or missing token"
                    ) {
                        const token = getCookie("token");
                        const wssUrl = new URL(url);

                        const updateSocketConnection = (newToken: string) => {
                            wssUrl.searchParams.set("token", newToken);

                            store.dispatch(disconnect());

                            store.dispatch(connect(wssUrl.toString()));
                        };

                        if (token) {
                            updateSocketConnection(token);
                        } else {
                            authApi.getToken().then((data) => {
                                const newToken = data.accessToken.replace(
                                    "Bearer ",
                                    "",
                                );
                                updateSocketConnection(newToken);
                            });
                        }
                    }
                };

                socket.onerror = (event) => {
                    store.dispatch(onError(event));
                };
            }

            if (disconnect.match(action)) {
                if (socket !== null) {
                    socket.close();
                }

                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket = null;
            }

            if (sendMessage.match(action)) {
                if (socket !== null && socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(action.payload));
                } else {
                    console.warn("WebSocket is not open. Cannot send message.");
                }
            }

            return next(action);
        }) as Middleware;
}
