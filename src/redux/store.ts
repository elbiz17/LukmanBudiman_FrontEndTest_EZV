import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./todoApi/todoApi";

const store = configureStore({
    reducer:{
        [todoApi.reducerPath]:todoApi.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    }).concat(todoApi.middleware)
})

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
