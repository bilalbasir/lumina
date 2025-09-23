import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ModalDetail from "./slice/ModalSlice";
import {
    persistReducer,
    persistStore,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

function createNoopStorage() {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
}

// ✅ Use localStorage only in client, noop in server
const isServer = typeof window === "undefined";
const storageEngine = isServer ? createNoopStorage() : createWebStorage("local");

// ROOT REDUCER
const rootReducer = combineReducers({
    ModalDetail,
});

export type RootState = ReturnType<typeof rootReducer>;

// PERSIST CONFIG
const persistConfig = {
    key: "root",
    storage: storageEngine,
    whitelist: ["ModalDetail"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// STORE
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/REGISTER",
                    "persist/PAUSE",
                    "persist/PURGE",
                    "persist/FLUSH",
                ],
            },
        }),
});

export const persistor = persistStore(store);

// Types
export type AppDispatch = typeof store.dispatch;
