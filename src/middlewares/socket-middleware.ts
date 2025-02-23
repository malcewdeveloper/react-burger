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
    let reconnectTimer: number | null = null;
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
                isConnected = false;

                socket.onopen = (event) => {
                    store.dispatch(onConnected(event));
                    isConnected = true;

                    if (reconnectTimer) {
                        clearTimeout(reconnectTimer);
                        reconnectTimer = null;
                    }
                };

                socket.onclose = (event) => {
                    store.dispatch(onDisconnected(event));
                    socket = null;
                    isConnected = false;

                    if (!isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            store.dispatch(connect(url));
                        }, 3000);
                    }
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    store.dispatch(onMessageReceived(data));

                    if (withTokenRefresh) {
                        authApi.getToken().then((refreshData) => {
                            const wssUrl = new URL(url);
                            wssUrl.searchParams.set(
                                "token",
                                refreshData.accessToken.replace("Bearer ", ""),
                            );

                            if (socket !== null) {
                                socket.close();
                            }

                            store.dispatch(connect(wssUrl.toString()));
                        });

                        store.dispatch(disconnect());
                    }
                };

                socket.onerror = (event) => {
                    store.dispatch(onError(event));

                    if (!isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            store.dispatch(connect(url));
                        }, 5000);
                    }
                };
            }

            if (disconnect.match(action)) {
                if (socket !== null) {
                    socket.close();
                }

                if (reconnectTimer !== null) {
                    clearTimeout(reconnectTimer);
                    reconnectTimer = null;
                }

                isConnected = false;
                reconnectTimer = null;
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
