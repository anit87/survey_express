import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersSlice from "../features/auth/usersSlice";
import { userDashboard } from "../features/auth/userDasbord";
import { comercial } from "../features/auth/commercial";

export const store = configureStore({
    reducer: {
        [userDashboard.reducerPath]: userDashboard.reducer,
        [comercial.reducerPath]: comercial.reducer,
        auth: authReducer,
        users: usersSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userDashboard.middleware)
            .concat(comercial.middleware),
})

// setupListeners(store.dispatch);
export default store;