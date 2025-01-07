import { createAction, props } from "@ngrx/store"
import { RegisterRequestInterface } from "./registerRequer.interface"

export const registerAction = createAction('[Auth] Register Start')
export const registerSuccessAction = createAction('[Auth] Register Success',
    props<{request:RegisterRequestInterface }>())
export const registerFailureAction = createAction('[Auth] Register Failuer ',
    props<{request:RegisterRequestInterface }>())
