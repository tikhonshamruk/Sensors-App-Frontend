
import { createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "./authState.interface";
import { registerAction } from "./app.action";

export const initialState: AuthStateInterface= {
    isSubmitting: false
}

export const reducers = createReducer(
    initialState, 
    on(registerAction, (state)=>({...state, isSubmitting : true}))
);